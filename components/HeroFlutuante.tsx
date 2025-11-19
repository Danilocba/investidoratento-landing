"use client";

import { motion } from "framer-motion";

// Tickers fixos e suas posições definidas por você
const TICKERS = [
  { ticker: "PETR4", price: "32,99", dy: "15.7%", top: "39%", left: "6%" },
  { ticker: "VALE3", price: "65,02", dy: "7,1%", top: "57%", left: "14%" },
  { ticker: "ITUB4", price: "40,10", dy: "6.9%", top: "28%", left: "82%" },
  { ticker: "BBAS3", price: "21,88", dy: "7.6%", top: "47%", left: "79%" },
  { ticker: "CXSE3", price: "15,78", dy: "8.0%", top: "60%", left: "72%" },
];

export default function HeroFlutuante() {
  return (
    <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">

      {TICKERS.map((card, i) => {
        // amplitude fixa (sem random → sem hydration mismatch)
        const offsetX = 6;  // ~0.5 cm horizontal
        const offsetY = 6;  // ~0.5 cm vertical

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: card.top,
              left: card.left,
            }}
            animate={{
              x: [0, offsetX, -offsetX, 0],
              y: [0, -offsetY, offsetY, 0],
            }}
            transition={{
              duration: 6 + i * 0.8, // levemente diferente, mas previsível
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0 blur-xl bg-emerald-400/10 rounded-3xl scale-110" />

            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-emerald-400/25 shadow-lg shadow-emerald-500/10 w-[170px] rounded-2xl px-4 py-3">
              <p className="font-semibold text-white/90 text-sm tracking-wide">
                {card.ticker}
              </p>

              <p className="text-[11px] text-slate-300 mt-1">
                Preço: <span className="font-medium">R$ {card.price}</span>
              </p>

              <p className="text-[11px] text-emerald-400 font-bold mt-1">
                Dividend Yield: {card.dy}
              </p>
            </div>
          </motion.div>
        );
      })}

    </div>
  );
}