import { mAndMWinnerPortfolio } from "@/data/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const portfolioItems = mAndMWinnerPortfolio;

export default function Example({ onViewGallery }: { onViewGallery?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="winner-reel-scene" className="winner-reel-scene w-full">
      <div className="winner-reel-sticky">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="eyebrow mb-4">Winner portfolio</div>
          <h2 className="font-display text-[clamp(2.8rem,5vw,5.8rem)] leading-none text-blush-ink">Crowned in frame.</h2>
          <p className="mt-4 text-sm leading-7 text-blush-body">
            A portrait-led edit from the M&M winner archive, framed for crowns,
            sash details and finale-stage presence.
          </p>
        </div>

        <div className="winner-reel-viewport mt-10">
          <div id="winner-reel-track" className="winner-reel-track">
            {portfolioItems.map((winner, idx) => (
              <button
                type="button"
                key={`${winner.name}-${winner.image}-${idx}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                className={cn(
                  "group luxury-hover-card winner-reel-card relative overflow-hidden border gold-divider bg-blush-wash text-left transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blush-accent",
                  activeIndex === idx && "is-active",
                )}
              >
                <img
                  className="luxury-hover-image h-full w-full object-cover object-[50%_18%] transition duration-700"
                  src={winner.image}
                  alt={`${winner.name} portfolio portrait`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122]/88 via-[#061122]/10 to-transparent opacity-86 transition" />
                <div className="luxury-hover-content absolute inset-x-0 bottom-0 translate-y-0 p-5 text-white opacity-100 transition duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="text-[10px] uppercase tracking-[.24em] text-white/70">
                    {winner.eyebrow}
                  </div>
                  <h3 className="luxury-hover-title mt-2 font-display text-2xl leading-tight">
                    {winner.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[.18em] text-white/75">
                    {winner.title}
                  </p>
                  <span className="luxury-hover-arrow mt-4 text-blush-accent" aria-hidden="true">
                    <ArrowRight size={15} />
                  </span>
                </div>
                <div className="absolute left-4 top-4 hidden text-[10px] uppercase tracking-[.24em] text-white [writing-mode:vertical-rl] md:block md:group-hover:hidden">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </button>
            ))}
            <div className="winner-reel-end">
              <div className="eyebrow mb-4">Archive</div>
              <h3 className="font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-none text-blush-ink">Every frame holds the finale.</h3>
              <p className="mt-5 text-sm leading-7 text-blush-body">Continue to the winners gallery for seasons, portraits and coronation coverage.</p>
              <button
                type="button"
                onClick={onViewGallery}
                className="mt-7 inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent"
              >
                View gallery <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 h-px max-w-5xl overflow-hidden bg-blush-accent/15">
          <div id="winner-reel-progress" className="h-full w-0 bg-blush-accent" />
        </div>
      </div>
    </section>
  );
}
