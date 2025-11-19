import { prisma } from "@/lib/prisma";

export default async function Confirmar({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // No Next 15/16, searchParams vem como objeto assíncrono => precisamos fazer await
  const params = await searchParams;
  const tokenParam = params.token;

  // token pode vir como string ou array
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  if (!token || typeof token !== "string") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Token inválido.</p>
      </main>
    );
  }

  // Busca no banco
  const lead = await prisma.lead.findUnique({
    where: { token },
  });

  if (!lead) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Token não encontrado.</p>
      </main>
    );
  }

  if (lead.confirmed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>E-mail já confirmado!</p>
      </main>
    );
  }

  if (lead.tokenExp < new Date()) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Link expirado.</p>
      </main>
    );
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: { confirmed: true },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-3xl font-bold mb-4">
          🎉 Seus dividendos vão aumentar!
        </h1>
        <p>Sua vaga no beta está confirmada.</p>
        <p>Agora você será avisado antes de todo mundo.</p>
      </div>
    </main>
  );
}