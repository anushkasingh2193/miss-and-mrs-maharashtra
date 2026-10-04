import { mAndMWinnerPortfolio } from "@/data/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const portfolioItems = mAndMWinnerPortfolio;

export default function Example({ onViewGallery }: { onViewGallery?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWinner = portfolioItems[activeIndex] ?? portfolioItems[0];

  return (
    <section id="winner-reel-scene" className="winner-reel-scene w-full">
      <div className="winner-reel-sticky">
        <div className="winner-portfolio-intro mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="eyebrow mb-4">Winner portfolio</div>
            <h2 className="font-display text-[clamp(3rem,6vw,6.8rem)] leading-[.88] text-blush-ink">
              Crowned stories, edited like a campaign.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-blush-body">
              A refined winner portfolio from the M&M archive, curated around crown detail,
              sash language, stage poise and finale presence.
            </p>
          </div>
          <div className="winner-feature-panel">
            <div className="flex items-center justify-between gap-4 border-b border-blush-accent/15 pb-4">
              <span className="text-[10px] uppercase tracking-[.24em] text-blush-accent">Featured frame</span>
              <span className="font-display text-3xl text-blush-ink">{String(activeIndex + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 font-display text-4xl leading-none text-blush-ink">{activeWinner.name}</h3>
            <p className="mt-3 text-xs uppercase tracking-[.22em] text-blush-accent">{activeWinner.eyebrow}</p>
            <p className="mt-4 text-sm leading-7 text-blush-body">
              {activeWinner.title} with a portfolio treatment built for sponsor decks,
              press coverage and titleholder storytelling.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {["Portrait", "Sash", "Stage"].map((label) => (
                <span key={label} className="winner-feature-chip">{label}</span>
              ))}
            </div>
          </div>
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
                <div className="winner-card-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="winner-card-tag">
                  Portfolio study
                </div>
                <div className="luxury-hover-overlay winner-card-overlay absolute inset-0 transition" />
                <div className="luxury-hover-content winner-card-content absolute inset-x-0 bottom-0 translate-y-0 p-5 text-white opacity-100 transition duration-500 md:translate-y-2 md:group-hover:translate-y-0">
                  <div className="text-[10px] uppercase tracking-[.24em] text-white/70">
                    {winner.eyebrow}
                  </div>
                  <h3 className="luxury-hover-title mt-2 font-display text-2xl leading-tight">
                    {winner.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[.18em] text-white/75">
                    {winner.title}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-5 border-t border-white/14 pt-4">
                    <span className="text-[10px] uppercase tracking-[.2em] text-white/64">View frame</span>
                    <span className="luxury-hover-arrow text-blush-accent" aria-hidden="true">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
            <div className="winner-reel-end">
              <div className="eyebrow mb-4">Archive</div>
              <h3 className="font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-none text-blush-ink">Explore the complete titleholder edit.</h3>
              <p className="mt-5 text-sm leading-7 text-blush-body">
                Continue into the full winners gallery for season-wise portraits,
                coronation moments and stage coverage.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {["Season archive", "Finale coverage"].map((label) => (
                  <span key={label} className="winner-archive-chip">{label}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={onViewGallery}
                className="mt-7 inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:gap-5 focus:outline-none focus:ring-2 focus:ring-blush-accent"
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
