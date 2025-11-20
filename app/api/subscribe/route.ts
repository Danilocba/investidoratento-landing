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

export async function POST(req: Request) {
  try {
    // Proteção 1 - tamanho máximo do body
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 5_000) {
      return NextResponse.json({ error: "Payload muito grande." }, { status: 413 });
    }

    // Proteção 2 - user-agent suspeito
    const ua = req.headers.get("user-agent") || "";
    if (/curl|wget|python|scrapy|bot|spider/i.test(ua)) {
      return NextResponse.json({ error: "Acesso não permitido." }, { status: 403 });
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições, tente novamente em instantes." },
        { status: 429 }
      );
    }

    const data = await req.formData();

    // Honeypot anti-bot
    const trap = data.get("website");
    if (trap) {
      console.warn("Bot detectado pelo honeypot.");
      return NextResponse.json({ error: "Bot detectado" }, { status: 400 });
    }

    const rawEmail = data.get("email")?.toString().trim() || "";
    const email = rawEmail.toLowerCase();

    // Log de tentativa suspeita
    if (!email.includes("@")) {
      console.warn("Tentativa suspeita:", { ip, ua, email: rawEmail });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_URL || new URL(req.url).origin;

    const token = crypto.randomBytes(24).toString("hex");
    const tokenExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const lead = await prisma.lead.upsert({
      where: { email },
      update: { token, tokenExp },
      create: { email, token, tokenExp },
    });

    console.log("Lead salvo:", lead.email);

    await resend.emails.send({
      from: "Investidor Atento <no-reply@landing.investidoratento.com>",
      to: email,
      subject: "Confirme sua vaga no Beta do Investidor Atento 🚀",
      html: `
        <h2>Obrigado por se inscrever, investidor!</h2>
        <p>Clique abaixo para confirmar sua vaga no beta:</p>
        <p><a href="${baseUrl}/confirmar?token=${lead.token}">Confirmar minha vaga</a></p>
        <p>Se você não fez essa inscrição, ignore este e-mail.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}