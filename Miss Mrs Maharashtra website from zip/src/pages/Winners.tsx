import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { titleholders, winnerSeasonGroups, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { cn } from "@/lib/utils";

export function Winners(_: { navigate: (page: PageKey) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState(0);
  const [showFullArchive, setShowFullArchive] = useState(false);

  const carouselImages = useMemo(
    () => {
      const seasonHighlights = winnerSeasonGroups.flatMap((season) => {
        const middleIndex = Math.floor(season.images.length / 2);
        return [season.images[0], season.images[middleIndex], season.images[season.images.length - 1]];
      });

      return [...titleholders.map((winner) => winner.bg), ...seasonHighlights].filter(
        (image, index, images): image is string => Boolean(image) && images.indexOf(image) === index,
      );
    },
    [],
  );
  const selectedSeason = winnerSeasonGroups[activeSeason] ?? winnerSeasonGroups[0];
  const visibleSeasonImages = selectedSeason.images.slice(0, showFullArchive ? 18 : 8);
  const featuredImage = selectedSeason.images[0] ?? titleholders[0]?.bg;

  return (
    <>
      <section className="overflow-hidden bg-blush-page pt-[clamp(68px,8vw,118px)]">
        <div className="content-wrap px-[clamp(20px,4vw,42px)]">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow mb-5">Hall of fame</div>
            <h1 className="hero-title text-blush-ink">Past winners in orbit.</h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Drag the carousel to explore titleholder portraits, season winners and sash moments from the Miss & Mrs. Maharashtra stage.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <ThreeDPhotoCarousel images={carouselImages} />
        </div>
      </section>

      <Section tone="tint">
        <SectionHeader eyebrow="Featured titleholders" title="Recent crowns, carefully framed." body="A curated edit of winners, sash moments and titleholder portraits before the full season archive." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {titleholders.map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => setLightbox(w.bg)}
              className="group reveal overflow-hidden border gold-divider bg-blush-page text-left transition duration-300 hover:border-blush-accent/55 focus:outline-none focus:ring-2 focus:ring-blush-accent"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-blush-wash">
                <img src={w.bg} alt={w.name} className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/86 via-transparent to-transparent" />
                <div className="absolute left-0 top-0 bg-blush-page px-4 py-3 text-[10px] uppercase tracking-[.26em] text-blush-accent">{w.plate}</div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] uppercase tracking-[.24em] text-blush-accent">{w.title}</p>
                  <h3 className="mt-3 font-display text-3xl">{w.name}</h3>
                </div>
              </div>
              <p className="p-6 text-sm leading-7 text-blush-body">{w.quote}</p>
            </button>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Season archive"
            title="Crowns by season."
            body="A cleaner portrait archive: choose one season, view the featured frame, then open the curated edit."
          />
          <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
            {winnerSeasonGroups.map((season, idx) => (
              <button
                key={`${season.eyebrow}-${season.title}`}
                type="button"
                onClick={() => {
                  setActiveSeason(idx);
                  setShowFullArchive(false);
                }}
                className={cn(
                  "border gold-divider px-4 py-3 text-[10px] uppercase tracking-[.2em] transition focus:outline-none focus:ring-2 focus:ring-blush-accent",
                  activeSeason === idx
                    ? "border-blush-accent bg-blush-accent text-[#040404]"
                    : "bg-[#070607]/70 text-blush-muted hover:border-blush-accent/55 hover:text-blush-accent",
                )}
              >
                {season.title.replace(" Winners", "")}
              </button>
            ))}
          </div>
        </div>

        <article className="border gold-divider bg-[#070607]/70">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <button
              type="button"
              onClick={() => setLightbox(featuredImage)}
              className="group relative min-h-[460px] overflow-hidden bg-[#040404] text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blush-accent"
            >
              <img
                src={featuredImage}
                alt={`${selectedSeason.title} featured portrait`}
                className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/92 via-[#040404]/12 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <div className="eyebrow mb-3">Featured frame</div>
                <h3 className="font-display text-[clamp(2rem,4vw,4.6rem)] leading-none text-white">{selectedSeason.title}</h3>
              </div>
            </button>

            <div className="p-6 md:p-9">
              <div className="flex flex-col gap-5 border-b gold-divider pb-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">{selectedSeason.eyebrow}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.1rem,4vw,4.8rem)] leading-none text-blush-ink">{selectedSeason.title}</h3>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-blush-body">{selectedSeason.note}</p>
                </div>
                <p className="text-xs uppercase tracking-[.22em] text-blush-accent">{selectedSeason.images.length} images</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {visibleSeasonImages.map((image, idx) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setLightbox(image)}
                    className="group relative aspect-[3/4] overflow-hidden border border-blush-accent/15 bg-blush-wash focus:outline-none focus:ring-2 focus:ring-blush-accent"
                  >
                    <img
                      src={image}
                      alt={`${selectedSeason.title} archive portrait ${idx + 1}`}
                      className="h-full w-full object-cover object-[50%_18%] transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute left-2 top-2 bg-[#040404]/80 px-2 py-1 text-[9px] uppercase tracking-[.18em] text-blush-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>

              {selectedSeason.images.length > 8 ? (
                <button
                  type="button"
                  onClick={() => setShowFullArchive((current) => !current)}
                  className="mt-8 inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover focus:outline-none focus:ring-2 focus:ring-blush-accent"
                >
                  {showFullArchive ? "Show curated edit" : "View full season"} <ArrowRight size={15} />
                </button>
              ) : null}
            </div>
          </div>
        </article>
      </Section>

      {lightbox ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-[#070607]/95 p-5 animate-[fade_.25s_ease_both]" onClick={() => setLightbox(null)}>
          <button className="absolute right-5 top-5 text-white" aria-label="Close gallery"><X /></button>
          <img src={lightbox} alt="Selected gallery" className="max-h-full max-w-full object-contain" decoding="async" />
        </div>
      ) : null}
    </>
  );
}
