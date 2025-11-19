"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const HeroFlutuante = dynamic(() => import("@/components/HeroFlutuante"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body?.error || "Erro ao enviar. Tente novamente.");
      setSending(false);
      return;
    }

    // animação rápida + redirecionamento
    setTimeout(() => setStep1(true), 200);
    setTimeout(() => setStep2(true), 1200);
    setTimeout(() => {
      router.push("/sucesso");
    }, 2300);
  }

  return (
    <main className="min-h-screen w-full bg-[#06080D] text-white relative overflow-hidden">
      {/* Ativos flutuantes */}
      <HeroFlutuante />

      {/* Fundo animado */}
      <div className="absolute inset-0">
        <div className="absolute w-[900px] h-[900px] bg-blue-600/20 blur-[180px] rounded-full -top-52 -left-56 animate-pulse" />
        <div className="absolute w-[800px] h-[800px] bg-cyan-500/10 blur-[200px] rounded-full top-20 right-0 animate-pulse" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('/grid.svg')] bg-repeat" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-12">
        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <img
            src="/LogoOficial-SF-Dark2.png"
            alt="Investidor Atento"
            className="w-56 opacity-95"
          />
        </div>

        {/* Texto principal */}
        {!sending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-5xl font-bold leading-tight mb-4">
              O painel de investimentos mais completo
              <br />
              <span className="text-blue-400">
                para quem quer investir com clareza.
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Organize, analise e acompanhe seus ativos com ferramentas
              inteligentes, roadmap transparente e recursos exclusivos para
              investidores que querem dominar o próprio dinheiro.
            </p>
          </motion.div>
        )}

        {/* BADGE */}
        {!sending && !step1 && (
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm tracking-wide">
              🚀 Beta exclusivo — vagas limitadas
            </span>
          </div>
        )}

        {/* FORMULÁRIO */}
        {!sending && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl max-w-md mx-auto"
          >
            {/* Honeypot anti-bot */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none text-lg border border-white/20 focus:border-blue-500 mb-4"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition font-semibold py-3 rounded-lg text-lg shadow-lg shadow-blue-600/20"
            >
              Garantir meu acesso antecipado
            </button>

            <p className="text-gray-400 text-sm text-center mt-2">
              🔒 Seus dados estão seguros. Sem spam.
            </p>

            {error && (
              <p className="text-red-400 text-sm text-center mt-2">{error}</p>
            )}
          </motion.form>
        )}

        {/* Animação 1 */}
        {step1 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-green-300 text-center mt-16 drop-shadow-xl"
          >
            ✨ Pronto! Sua inscrição foi registrada com sucesso!
          </motion.p>
        )}

        {/* Animação 2 */}
        {step2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-2xl text-pink-300 font-semibold text-center mt-6"
          >
            🎉 Você está a um passo de aumentar seus dividendos.
          </motion.p>
        )}

        {/* Confetes */}
        {step2 && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 300 + Math.random() * 200],
                  x: [0, (Math.random() - 0.5) * 300],
                }}
                transition={{ duration: 2 + Math.random() }}
                className="absolute top-20 left-1/2 w-2 h-2 rounded-full bg-pink-400"
              />
            ))}
          </motion.div>
        )}

        {/* SEÇÃO: MVP */}
        {!sending && !step1 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              O que você já recebe no acesso Beta
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Acompanhamento Inteligente",
                  desc: "Veja cotações, carteira e análises de forma simples e clara.",
                },
                {
                  title: "Calendário Econômico",
                  desc: "Entenda o impacto de cada evento no mercado brasileiro.",
                },
                {
                  title: "Dashboard Moderno",
                  desc: "Interface pensada para investidores iniciantes e avançados.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Rodapé */}
        <footer className="text-center mt-20 text-gray-500 text-sm">
          © {new Date().getFullYear()} Investidor Atento — Você de olho em tudo.
        </footer>
      </div>
    </main>
  );
}