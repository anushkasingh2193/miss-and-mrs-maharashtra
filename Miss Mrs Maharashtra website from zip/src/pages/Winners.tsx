import { useState } from "react";
import { X } from "lucide-react";
import { imageRoles, winnerSeasonGroups, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { cn } from "@/lib/utils";

export function Winners(_: { navigate: (page: PageKey) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState(0);
  const selectedSeason = winnerSeasonGroups[activeSeason] ?? winnerSeasonGroups[0];

  return (
    <>
      <section data-winners-hero="split" className="overflow-hidden border-b gold-divider bg-[#061122] text-white">
        <div className="grid min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative flex min-h-[500px] items-end overflow-hidden px-[clamp(24px,6vw,96px)] py-[clamp(56px,8vw,112px)] lg:min-h-0">
            <img
              src={imageRoles.galleryHero}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[52%_38%] opacity-30"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[#061122]/64" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/88 via-[#061122]/72 to-[#061122]/44" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020817]/82 to-transparent" />

            <div className="relative z-10 max-w-3xl">
              <div className="eyebrow mb-7 text-blush-accent">Hall of fame</div>
              <h1 className="font-display text-[clamp(4.6rem,10vw,9.5rem)] leading-[.78] text-blush-ink">
                Winners<br />gallery.
              </h1>
              <p className="mt-8 max-w-2xl text-base font-light leading-8 text-blush-body sm:text-lg">
                M&amp;M crown portraits, finale lineups and sash moments from the Miss &amp; Mrs. Maharashtra archive.
              </p>
            </div>
          </div>

          <figure className="relative min-h-[72svh] overflow-hidden border-t gold-divider lg:min-h-0 lg:border-l lg:border-t-0">
            <img
              src={imageRoles.titleholderSpotlight}
              alt="Miss Maharashtra Season 3 titleholder wearing her crown and blue gown"
              className="absolute inset-0 h-full w-full object-cover object-[50%_6%]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020817]/88 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 z-10 px-[clamp(24px,4vw,58px)] pb-[clamp(30px,5vw,58px)]">
              <span className="block text-[10px] uppercase tracking-[.24em] text-blush-accent">Featured M&amp;M frame</span>
              <strong className="mt-3 block font-display text-[clamp(2.5rem,4vw,4.8rem)] font-normal leading-none text-white">
                Crowned on stage.
              </strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <Section className="cinematic-band">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Season portraits"
            title="Crowns by season."
            body="Choose a season to view one clean portrait of each winner and runner-up."
          />
          <div
            role="tablist"
            aria-label="Winner seasons"
            className="flex max-w-full gap-2 overflow-x-auto pb-2 lg:max-w-xl lg:justify-end"
          >
            {winnerSeasonGroups.map((season, idx) => (
              <button
                key={`${season.eyebrow}-${season.title}`}
                id={`winner-season-tab-${idx}`}
                type="button"
                role="tab"
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
          className="mt-10 border-t gold-divider pt-8"
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
