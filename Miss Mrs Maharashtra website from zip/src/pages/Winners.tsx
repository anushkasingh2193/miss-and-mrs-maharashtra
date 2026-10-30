import { useState } from "react";
import { X } from "lucide-react";
import { winnerSeasonGroups, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { cn } from "@/lib/utils";

const winnerCategories = ["Miss Maharashtra", "Mrs. Maharashtra"] as const;
type WinnerCategory = (typeof winnerCategories)[number];

export function Winners(_: { navigate: (page: PageKey) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<WinnerCategory>("Miss Maharashtra");
  const [activeSeason, setActiveSeason] = useState(0);
  const categorySeasons = winnerSeasonGroups.filter((season) => season.eyebrow === activeCategory);
  const selectedSeason = categorySeasons[activeSeason] ?? categorySeasons[0] ?? winnerSeasonGroups[0];

  const selectCategory = (category: WinnerCategory) => {
    setActiveCategory(category);
    setActiveSeason(0);
    setLightbox(null);
  };

  return (
    <>
      <section
        data-winners-hero="editorial-split"
        className="section-pad relative overflow-hidden border-b gold-divider bg-[#020817] text-white"
      >
        <div className="content-wrap grid min-h-[clamp(500px,70svh,720px)] items-center gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-xl py-2 lg:py-10">
            <p className="eyebrow">Hall of Fame</p>
            <h1 className="mt-5 max-w-[9ch] font-display text-[clamp(3.5rem,7vw,6rem)] leading-[.9] text-white">
              Winners Gallery
            </h1>
            <div className="mt-8 h-px w-20 bg-blush-accent" aria-hidden="true" />
            <p className="mt-6 max-w-md text-base font-light leading-8 text-blush-muted sm:text-lg">
              Meet the titleholders from every Miss &amp; Mrs. Maharashtra season.
            </p>
          </div>

          <figure className="w-full">
            <div className="aspect-[3/2] overflow-hidden border gold-divider bg-[#061122]">
              <img
                src="/missmrs-assets/featured/winners-hero-lineup.jpg"
                alt="Six Miss and Mrs. Maharashtra titleholders together on the finale runway"
                className="h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-[10px] uppercase tracking-[.22em] text-blush-muted">
              Finale runway · Miss &amp; Mrs. Maharashtra
            </figcaption>
          </figure>
        </div>
      </section>

      <Section className="cinematic-band">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Titleholder archive"
            title="Choose your crown."
            body="Explore Miss Maharashtra and Mrs. Maharashtra independently, then choose a season."
          />
          <div
            role="tablist"
            aria-label="Winner categories"
            className="grid w-full grid-cols-2 border gold-divider bg-[#061122]/72 lg:w-auto lg:min-w-[470px]"
          >
            {winnerCategories.map((category, idx) => (
              <button
                key={category}
                id={`winner-category-tab-${idx}`}
                type="button"
                role="tab"
                data-winner-category-tab="true"
                aria-selected={activeCategory === category}
                aria-controls="winner-category-panel"
                onClick={() => selectCategory(category)}
                className={cn(
                  "min-h-14 px-5 py-4 text-[10px] uppercase tracking-[.18em] transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blush-accent sm:text-[11px]",
                  idx > 0 && "border-l gold-divider",
                  activeCategory === category
                    ? "bg-blush-accent text-[#020817]"
                    : "text-blush-muted hover:bg-[#0a1b33] hover:text-blush-accent",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div id="winner-category-panel" role="tabpanel" aria-labelledby={`winner-category-tab-${winnerCategories.indexOf(activeCategory)}`}>
          <div className="mt-2 flex flex-col gap-4 border-y gold-divider py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[.22em] text-blush-muted">{activeCategory} seasons</p>
            <div role="tablist" aria-label={`${activeCategory} seasons`} className="flex max-w-full gap-2 overflow-x-auto">
              {categorySeasons.map((season, idx) => (
                <button
                  key={`${season.eyebrow}-${season.title}`}
                  id={`winner-season-tab-${idx}`}
                  type="button"
                  role="tab"
                  data-winner-season-tab="true"
                  aria-selected={activeSeason === idx}
                  aria-controls="winner-season-panel"
                  onClick={() => setActiveSeason(idx)}
                  className={cn(
                    "shrink-0 border gold-divider px-4 py-3 text-[10px] uppercase tracking-[.2em] transition focus:outline-none focus:ring-2 focus:ring-blush-accent",
                    activeSeason === idx
                      ? "border-blush-accent bg-blush-accent text-[#020817]"
                      : "bg-[#061122]/70 text-blush-muted hover:border-blush-accent/55 hover:text-blush-accent",
                  )}
                >
                  {season.title.replace(" Winners", "")}
                </button>
              ))}
            </div>
          </div>

          <div
            id="winner-season-panel"
            role="tabpanel"
            aria-labelledby={`winner-season-tab-${activeSeason}`}
            className="pt-8"
          >
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">{selectedSeason.eyebrow}</p>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,5.2rem)] leading-none text-blush-ink">{selectedSeason.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-blush-body">{selectedSeason.note}</p>
              </div>
              <p className="text-xs uppercase tracking-[.22em] text-blush-accent">
                {selectedSeason.images.length} portraits
              </p>
            </div>

            <div className="winner-season-portrait-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedSeason.images.map((image, idx) => (
                <button
                  key={image}
                  type="button"
                  data-winner-portrait="true"
                  onClick={() => setLightbox(image)}
                  className="group luxury-hover-card relative aspect-[3/4] overflow-hidden border gold-divider bg-blush-wash text-left focus:outline-none focus:ring-2 focus:ring-blush-accent"
                >
                  <img
                    src={image}
                    alt={`${selectedSeason.title} portrait ${idx + 1}`}
                    className="luxury-hover-image h-full w-full object-cover object-[50%_6%] transition duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#020817]/82 via-transparent to-transparent" />
                  <span className="luxury-hover-content absolute bottom-4 left-4 text-[10px] uppercase tracking-[.24em] text-blush-accent">
                    Portrait {String(idx + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-[#061122]/95 p-5 animate-[fade_.25s_ease_both]"
          role="dialog"
          aria-modal="true"
          aria-label="Winner portrait preview"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 text-white focus:outline-none focus:ring-2 focus:ring-blush-accent"
            aria-label="Close gallery"
            onClick={() => setLightbox(null)}
          >
            <X />
          </button>
          <img src={lightbox} alt="Selected winner portrait" className="max-h-full max-w-full object-contain" decoding="async" />
        </div>
      ) : null}
    </>
  );
}
