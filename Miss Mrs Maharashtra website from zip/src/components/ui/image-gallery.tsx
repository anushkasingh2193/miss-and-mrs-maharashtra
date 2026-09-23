import { mAndMWinnerPortfolio } from "@/data/site";
import { cn } from "@/lib/utils";
import { useState } from "react";

const portfolioItems = mAndMWinnerPortfolio;

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-[clamp(48px,6vw,86px)]">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="eyebrow mb-4">Winner portfolio</div>
        <h2 className="font-display text-[clamp(2.8rem,5vw,5.8rem)] leading-none text-blush-ink">Crowned in frame.</h2>
        <p className="mt-4 text-sm leading-7 text-blush-body">
          A portrait-led edit from the M&M winner archive, framed for crowns,
          sash details and finale-stage presence.
        </p>
      </div>

      <div className="mx-auto mt-10 flex h-[430px] w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-2 md:overflow-visible">
        {portfolioItems.map((winner, idx) => (
          <button
            type="button"
            key={`${winner.name}-${winner.image}-${idx}`}
            onMouseEnter={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
            className={cn(
              "group relative h-[420px] min-w-24 overflow-hidden border gold-divider bg-blush-wash text-left transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blush-accent md:min-w-0 md:flex-grow",
              activeIndex === idx ? "w-[min(70vw,440px)] md:w-full" : "w-24 md:w-44",
            )}
          >
            <img
              className="h-full w-full object-cover object-[50%_18%] transition duration-700 group-hover:scale-105"
              src={winner.image}
              alt={`${winner.name} portfolio portrait`}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070607]/88 via-[#070607]/10 to-transparent opacity-80 transition group-hover:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="text-[10px] uppercase tracking-[.24em] text-white/70">
                {winner.eyebrow}
              </div>
              <h3 className="mt-2 font-display text-2xl leading-tight">
                {winner.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[.18em] text-white/75">
                {winner.title}
              </p>
            </div>
            <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[.24em] text-white [writing-mode:vertical-rl] group-hover:hidden">
              {String(idx + 1).padStart(2, "0")}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
