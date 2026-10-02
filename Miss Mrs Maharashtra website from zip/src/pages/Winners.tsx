import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { imageRoles, mAndMWinnerImages, titleholders, winnerSeasonGroups, type PageKey } from "@/data/site";
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

      return [...mAndMWinnerImages, ...titleholders.map((winner) => winner.bg), ...seasonHighlights].filter(
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
      <section className="relative overflow-hidden border-b gold-divider bg-[#061122] pt-[clamp(82px,9vw,132px)] text-white">
        <img
          src={imageRoles.galleryHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-45"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061122] via-[#061122]/72 to-[#061122]/88" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061122] to-transparent" />
        <div className="content-wrap relative z-10 grid gap-9 px-[clamp(20px,4vw,42px)] lg:grid-cols-[.86fr_.74fr] lg:items-end">
          <div className="max-w-4xl pb-4">
            <div className="eyebrow mb-5 text-blush-accent">Hall of fame</div>
            <h1 className="font-display text-[clamp(4.4rem,10vw,9rem)] leading-[.86] text-blush-ink">Winners gallery.</h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              M&M crown portraits, finale lineups and sash moments from the Miss & Mrs. Maharashtra stage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLightbox(mAndMWinnerImages[0])}
            className="group luxury-hover-card hidden overflow-hidden border gold-divider bg-[#061122]/84 p-3 text-left shadow-2xl shadow-black/30 transition hover:border-blush-accent/60 focus:outline-none focus:ring-2 focus:ring-blush-accent lg:block"
          >
            <div className="luxury-hover-media relative aspect-[4/5] overflow-hidden bg-blush-wash">
              <img
                src={mAndMWinnerImages[0]}
                alt="M&M crowned winner portrait"
                className="luxury-hover-image h-full w-full object-cover object-[50%_14%] transition duration-700"
                loading="eager"
                decoding="async"
              />
              <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122]/86 via-transparent to-transparent" />
              <div className="luxury-hover-content absolute bottom-5 left-5 right-5">
                <p className="text-[10px] uppercase tracking-[.28em] text-blush-accent">Featured M&M frame</p>
                <h2 className="luxury-hover-title mt-2 font-display text-4xl leading-none text-white">Crowned on stage.</h2>
                <span className="luxury-hover-arrow mt-4 text-blush-accent" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="relative z-10 mt-10">
          <ThreeDPhotoCarousel images={carouselImages} />
        </div>
      </section>

      <Section className="cinematic-band gold-lift !py-[clamp(42px,5vw,72px)]">
        <div className="grid gap-4 md:grid-cols-3">
          {mAndMWinnerImages.slice(9, 12).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setLightbox(image)}
              className="group luxury-hover-card reveal relative aspect-[16/10] overflow-hidden border gold-divider bg-[#061122] focus:outline-none focus:ring-2 focus:ring-blush-accent"
            >
              <img
                src={image}
                alt={`M&M winner gallery group frame ${index + 1}`}
                className="luxury-hover-image h-full w-full object-cover transition duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122]/80 via-transparent to-transparent" />
              <span className="luxury-hover-content absolute bottom-4 left-4 text-[10px] uppercase tracking-[.24em] text-blush-accent">
                M&M gallery / 0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeader eyebrow="Featured titleholders" title="Recent crowns, carefully framed." body="A curated edit of winners, sash moments and titleholder portraits before the full season archive." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {titleholders.map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => setLightbox(w.bg)}
              className="group luxury-hover-card reveal overflow-hidden border gold-divider bg-blush-page text-left transition duration-300 hover:border-blush-accent/55 focus:outline-none focus:ring-2 focus:ring-blush-accent"
            >
              <div className="luxury-hover-media relative aspect-[4/5] overflow-hidden bg-blush-wash">
                <img src={w.bg} alt={w.name} className="luxury-hover-image absolute inset-0 h-full w-full object-cover object-[50%_18%] transition duration-700" loading="lazy" decoding="async" />
                <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#020817]/86 via-transparent to-transparent" />
                <div className="absolute left-0 top-0 bg-blush-page px-4 py-3 text-[10px] uppercase tracking-[.26em] text-blush-accent">{w.plate}</div>
                <div className="luxury-hover-content absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] uppercase tracking-[.24em] text-blush-accent">{w.title}</p>
                  <h3 className="luxury-hover-title mt-3 font-display text-3xl">{w.name}</h3>
                  <span className="luxury-hover-arrow mt-4 text-blush-accent" aria-hidden="true">
                    <ArrowRight size={15} />
                  </span>
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
                    ? "border-blush-accent bg-blush-accent text-[#020817]"
                    : "bg-[#061122]/70 text-blush-muted hover:border-blush-accent/55 hover:text-blush-accent",
                )}
              >
                {season.title.replace(" Winners", "")}
              </button>
            ))}
          </div>
        </div>

        <article className="border gold-divider bg-[#061122]/70">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <button
              type="button"
              onClick={() => setLightbox(featuredImage)}
              className="group luxury-hover-card relative min-h-[460px] overflow-hidden bg-[#020817] text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blush-accent"
            >
              <img
                src={featuredImage}
                alt={`${selectedSeason.title} featured portrait`}
                className="luxury-hover-image absolute inset-0 h-full w-full object-cover object-[50%_18%] transition duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#020817]/92 via-[#020817]/12 to-transparent" />
              <div className="luxury-hover-content absolute bottom-0 left-0 p-7">
                <div className="eyebrow mb-3">Featured frame</div>
                <h3 className="luxury-hover-title font-display text-[clamp(2rem,4vw,4.6rem)] leading-none text-white">{selectedSeason.title}</h3>
                <span className="luxury-hover-arrow mt-4 text-blush-accent" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
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
                    className="group luxury-hover-card relative aspect-[3/4] overflow-hidden border border-blush-accent/15 bg-blush-wash focus:outline-none focus:ring-2 focus:ring-blush-accent"
                  >
                    <img
                      src={image}
                      alt={`${selectedSeason.title} archive portrait ${idx + 1}`}
                      className="luxury-hover-image h-full w-full object-cover object-[50%_18%] transition duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute left-2 top-2 bg-[#020817]/80 px-2 py-1 text-[9px] uppercase tracking-[.18em] text-blush-accent">
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
        <div className="fixed inset-0 z-[90] grid place-items-center bg-[#061122]/95 p-5 animate-[fade_.25s_ease_both]" onClick={() => setLightbox(null)}>
          <button className="absolute right-5 top-5 text-white" aria-label="Close gallery"><X /></button>
          <img src={lightbox} alt="Selected gallery" className="max-h-full max-w-full object-contain" decoding="async" />
        </div>
      ) : null}
    </>
  );
}
