import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limit simples em memória (ok para MVP)
const requests = new Map<string, { count: number; first: number }>();

function isRateLimited(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry) {
    requests.set(ip, { count: 1, first: now });
    return false;
  }

  if (now - entry.first > windowMs) {
    // janela expirou, reset
    requests.set(ip, { count: 1, first: now });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  requests.set(ip, entry);
  return false;
}

function isValidEmail(email: string) {
  if (!email || email.length > 255) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições, tente novamente em instantes." },
        { status: 429 },
      );
    }

    const data = await req.formData();

    // Honeypot anti-bot
    const trap = data.get("website");
    if (trap) {
      console.warn("Bot detectado pelo honeypot.");
      return NextResponse.json({ error: "Bot detectado" }, { status: 400 });
    }

    const email = data.get("email")?.toString().trim() || "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_URL || new URL(req.url).origin;

    // Gera token de confirmação e expiração (+7 dias)
    const token = crypto.randomBytes(24).toString("hex");
    const tokenExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        token,
        tokenExp,
      },
      create: {
        email,
        token,
        tokenExp,
      },
    });

    console.log("Lead salvo:", lead.email);

    // Envia e-mail de confirmação
    await resend.emails.send({
      from: "Investidor Atento <no-reply@landing.investidoratento.com>",
      to: email,
      subject: "Confirme sua vaga no Beta do Investidor Atento 🚀",
      html: `
        <h2>Obrigado por se inscrever, investidor!</h2>
        <p>Para confirmar sua vaga no beta do <b>Investidor Atento</b>, clique no link abaixo:</p>
        <p>
          <a href="${baseUrl}/confirmar?token=${lead.token}">
            Confirmar minha vaga
          </a>
        </p>
        <p>Se você não fez essa inscrição, pode ignorar este e-mail.</p>
        <br />
        <p>Atenciosamente,<br/>Equipe Investidor Atento</p>
      `,
    });

    // Resposta para o front
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erro ao enviar e-mail:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}