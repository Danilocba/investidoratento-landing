//app/page.tsx
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
  const [stepEmail, setStepEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Evento GA — lead enviado
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead_submit", {
        event_category: "lead",
        event_label: "landing_form",
        });
      }
      
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
    setTimeout(() => setStepEmail(true), 2400);
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
                para quem quer investir com clareza
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Organize, analise e acompanhe seus ativos com ferramentas
              inteligentes, um roadmap transparente e recursos exclusivos pensados para
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

          {stepEmail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-center mt-12"
            >
              <h2 className="text-3xl font-bold mb-3">Verifique seu e-mail 📩</h2>

              <p className="text-gray-300 max-w-xl mx-auto">
                Enviamos um link para você confirmar sua vaga no beta do <b>Investidor Atento</b>.
              </p>

              <p className="text-gray-500 mt-2">
                Se o e-mail não aparecer em alguns minutos, confira também a caixa de spam ou promoções.
              </p>
            </motion.div>
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
                    title: "Busca Inteligente de Ativos",
                    desc: "Encontre qualquer ticker rapidamente, com sugestões em tempo real e navegação extremamente fluida.",
                  },
                  {
                    title: "Páginas de Ativos e Índices",
                    desc: "Veja preço, variação, gráficos simples e a composição dos principais índices — tudo de forma clara e objetiva.",
                  },
                  {
                    title: "Interface Moderna",
                    desc: "Experiência minimalista, rápida e pensada para investidores iniciantes e avançados.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      relative rounded-2xl p-6 
                      bg-white/5 backdrop-blur-md border border-white/10
                      overflow-hidden
                      before:absolute before:inset-0 before:rounded-2xl 
                      before:p-px before:bg-linear-to-br before:from-[#00ffa3]/40 before:to-[#00c6ff]/40
                      before:opacity-0 hover:before:opacity-100 
                      before:transition-opacity before:duration-300
                      before:-z-10
                    "
                  >
                    <h3 className="font-semibold text-lg mb-2 text-center">{item.title}</h3>
                    <p className="text-gray-400 text-center">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        {/* Rodapé */}
        <footer className="text-center mt-20 text-gray-500 text-sm">
          © {new Date().getFullYear()} Investidor Atento — Você de olho em tudo.
          
          <div className="mt-2">
            <a 
              href="/privacidade" 
              className="text-gray-400 hover:text-gray-200 underline transition"
            >
              Política de Privacidade
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}