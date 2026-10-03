import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { auditionCities, categories, gallery, imageRoles, latestNews, pillars, stats, tickets, type PageKey } from "@/data/site";
import { useCountdown } from "@/hooks/useCountdown";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { Section, SectionHeader } from "@/components/Section";
import ImageGallery from "@/components/ui/image-gallery";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { TestimonialsSection } from "@/components/ui/testimonials-6";
import { YouTubePreview } from "@/components/VideoBento";

export function Home({ navigate }: { navigate: (page: PageKey) => void }) {
  const countdown = useCountdown();
  useHomeMotion();

  return (
    <div className="home-cinema">
      <section id="shot1" className="relative bg-blush-page">
        <div className="relative h-[calc(100vh-var(--header-height))] min-h-[640px] overflow-hidden">
          <video
            id="hero-img"
            className="absolute inset-[-8%_0] h-[116%] w-full object-cover object-center will-change-transform"
            src="/missmrs-assets/videos/contestants-runway-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(213,168,75,.08),rgba(7,6,7,.2)_42%,rgba(7,6,7,.76)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061122]/78 via-[#061122]/24 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#061122]/72 to-transparent" />
          <div id="hero-copy" className="content-wrap relative z-10 flex h-full flex-col justify-end px-[clamp(20px,4vw,42px)] pb-20 will-change-transform">
            <div className="max-w-3xl text-white">
              <div className="eyebrow mb-5 text-blush-accent">Miss & Mrs. Maharashtra Season 3</div>
              <h1 className="hero-title text-white drop-shadow-[0_18px_50px_rgba(0,0,0,.32)]">The crown begins before the stage.</h1>
              <p className="mt-7 max-w-xl text-lg font-light leading-8 text-blush-body">
                A guided pageant season for grooming, visibility, national pathways and a titleholder year with purpose.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[.26em] text-blush-accent">Nagpur / Pune / Mumbai</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button onClick={() => navigate("register")} className="gold-cta px-8 py-4 text-xs uppercase tracking-[.24em]">Start application</button>
                <button onClick={() => navigate("categories")} className="inline-flex items-center border-b border-white/45 pb-2 text-xs uppercase tracking-[.24em] text-white transition hover:border-blush-accent hover:text-blush-accent">Choose category</button>
              </div>
            </div>
            <span className="shimmer absolute bottom-8 right-[clamp(20px,4vw,42px)] text-[10px] uppercase tracking-[.3em] text-white/55">Scroll</span>
          </div>
        </div>
      </section>

      <Section className="cinematic-band !py-0">
        <div className="stat-strip grid border-b gold-divider md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item reveal px-8 py-8 text-center md:py-9">
              <div className="font-display text-[clamp(2.4rem,3.8vw,4.3rem)] leading-none text-blush-ink">
                <CountUpValue value={s.n} />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[.28em] text-blush-accent">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band gold-lift">
        <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div className="reveal relative mx-auto aspect-[5/4] w-full max-w-[700px] overflow-hidden bg-[#061122] shadow-[0_34px_110px_rgba(0,0,0,.3)]">
            <img
              src={imageRoles.brandProof}
              alt="Miss and Mrs Maharashtra crowned contestants on stage"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 20%" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/82 via-[#020817]/10 to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Nagpur, Maharashtra</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,3vw,4rem)] leading-none text-white">Two seasons crowned.</h3>
            </div>
          </div>
          <div className="reveal max-w-xl">
            <div className="eyebrow mb-5">The pageant</div>
            <h2 className="display-title mb-7">More than a pageant night.</h2>
            <p className="text-lg font-light leading-8 text-blush-body">
              The season is designed around preparation: grooming, runway discipline, interview readiness, media visibility and a titleholder year that continues after the crown is placed.
            </p>
            <button onClick={() => navigate("about")} className="mt-8 inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
              See the platform <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Section>

      <Section className="cinematic-band">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Choose your crown"
            title="Two titles. One serious season."
            body="Miss Maharashtra and Mrs. Maharashtra are separate crowns with shared grooming, shared production standards and distinct national pathways."
          />
          <button onClick={() => navigate("categories")} className="reveal inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
            Compare categories <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((cat, idx) => (
            <button
              key={cat.key}
              onClick={() => navigate("categories")}
              className="group luxury-hover-card reveal relative aspect-[4/5] overflow-hidden text-left text-white focus:outline-none focus:ring-2 focus:ring-blush-accent"
            >
              <img
                src={idx === 0 ? imageRoles.titleMiss : imageRoles.titleMrs}
                alt={cat.title}
                className="luxury-hover-image h-full w-full object-cover transition duration-700"
                style={{ objectPosition: idx === 0 ? "50% 34%" : "50% 22%" }}
                loading="lazy"
              />
              <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/38 to-transparent" />
              <div className="absolute left-0 top-0 bg-[#061122]/85 px-5 py-4 text-[10px] uppercase tracking-[.28em] text-blush-accent">
                {idx === 0 ? "Single applicants" : "Married applicants"}
              </div>
              <div className="luxury-hover-content absolute inset-x-0 bottom-0 p-[clamp(22px,3vw,34px)]">
                <p className="eyebrow mb-3 max-w-xl text-blush-accent">{cat.pathway}</p>
                <h3 className="luxury-hover-title font-display text-[clamp(2.6rem,4vw,5rem)] leading-none">{cat.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/76">{cat.who}</p>
                <span className="luxury-hover-arrow mt-5 text-blush-accent" aria-hidden="true"><ArrowRight size={15} /></span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band !py-[clamp(36px,5vw,68px)] text-white">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_.78fr] lg:items-stretch">
          <div className="reveal flex flex-col justify-between border gold-divider bg-[#061122]/72 p-[clamp(24px,3vw,42px)]">
            <div>
              <div className="eyebrow mb-5">Season 3 auditions</div>
              <h2 className="font-display text-[clamp(3rem,5vw,5.9rem)] leading-[.92] text-blush-ink">Audition interest is being reviewed.</h2>
              <p className="mt-5 max-w-md text-base font-light leading-7 text-blush-body">
                Submit your details for Miss or Mrs. Maharashtra and the season office will guide eligible applicants through the next available city step.
              </p>
            </div>
            <div className="mt-8">
              <div className="grid gap-3 text-sm text-blush-body sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {auditionCities.map((city) => (
                  <div key={city.city} className="border-b gold-divider pb-4">
                    <span className="block text-[10px] uppercase tracking-[.24em] text-blush-accent">{city.date}</span>
                    <span className="mt-2 block font-display text-2xl text-blush-ink">{city.city}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("register")} className="gold-cta mt-9 inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Submit interest <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="luxury-hover-card reveal relative h-[clamp(390px,41vw,520px)] w-full max-w-[360px] justify-self-center overflow-hidden border gold-divider bg-[#061122] lg:justify-self-end">
            <video
              className="luxury-hover-image absolute inset-0 h-full w-full object-cover"
              src="/missmrs-assets/videos/hero-expansion-01.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              poster={imageRoles.titleMrs}
              style={{ objectPosition: "50% 32%" }}
            />
            <div className="luxury-hover-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,7,.42),transparent_46%,rgba(7,6,7,.2)),linear-gradient(180deg,transparent_46%,rgba(7,6,7,.82))]" />
            <div className="luxury-hover-content absolute bottom-7 left-7 right-7 flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Nagpur finale pathway</p>
                <h3 className="luxury-hover-title mt-3 font-display text-[clamp(2rem,3.6vw,4.8rem)] leading-none text-white">Step into the season.</h3>
              </div>
              <span className="hidden border-b border-blush-accent pb-2 text-[10px] uppercase tracking-[.24em] text-blush-accent sm:block">Slots under review</span>
            </div>
          </div>
        </div>

        <div className="reveal mx-auto mt-5 grid max-w-6xl border gold-divider bg-[#061122]/72 sm:grid-cols-4">
          {countdown.map((item) => (
            <div key={item.l} className="border-r gold-divider px-6 py-5">
              <div className="font-display text-[clamp(2.3rem,3.3vw,4rem)] leading-none text-blush-ink">{item.v}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[.28em] text-blush-accent">{item.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band gold-lift">
        <SectionHeader eyebrow="The crown pathway" title="A complete season, not one night." body="Every finalist receives structure, practice and visibility before the finale lights come on." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p) => (
            <article key={p.title} className="luxury-hover-card reveal group overflow-hidden border gold-divider bg-[#020817]/72 transition duration-300 hover:border-blush-accent/55">
              <div className="luxury-hover-media relative aspect-[3/4] overflow-hidden bg-blush-wash">
                <img
                  src={encodeURI(p.bg)}
                  alt={p.title}
                  className="luxury-hover-image h-full w-full object-cover transition duration-700"
                  style={{ objectPosition: p.position }}
                  loading="lazy"
                />
                <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122]/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 bg-blush-page px-4 py-2 font-display text-sm tracking-[.1em] text-blush-accent">{p.num}</div>
              </div>
              <div className="luxury-hover-content p-6">
                <div className="text-[10px] uppercase tracking-[.24em] text-blush-muted">{p.caption}</div>
                <h3 className="luxury-hover-title mt-4 font-display text-3xl leading-tight text-blush-ink">{p.title}</h3>
                <p className="mt-4 text-sm leading-7 text-blush-body">{p.body}</p>
                <span className="luxury-hover-arrow mt-5 text-blush-accent" aria-hidden="true"><ArrowRight size={15} /></span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section id="founder-reveal" className="founder-reveal-section cinematic-band px-[clamp(20px,4vw,42px)] py-[clamp(52px,7vw,104px)]">
        <div className="content-wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_.92fr] lg:items-center">
            <div className="relative z-10">
              <div className="founder-line-mask mb-3">
                <div className="founder-reveal-line eyebrow" data-founder-line style={{ transitionDelay: "0ms" }}>Founder</div>
              </div>
              <h2 className="font-display text-[clamp(3rem,5.4vw,7rem)] leading-[.9] text-blush-ink">
                <span className="founder-line-mask">
                  <span className="founder-reveal-line block" data-founder-line style={{ transitionDelay: "90ms" }}>Zoya Siraj</span>
                </span>
                <span className="founder-line-mask">
                  <span className="founder-reveal-line block" data-founder-line style={{ transitionDelay: "170ms" }}>Sheikh.</span>
                </span>
              </h2>
              <p className="mt-4 text-xs uppercase tracking-[.24em] text-blush-accent">Mrs. Maharashtra 2022 / 3rd Runner-up, Mrs. Universe</p>
              <p className="founder-quote mt-6 max-w-md font-display text-[clamp(1.55rem,2.4vw,2.9rem)] leading-tight text-blush-ink" aria-label="Built for women with presence, purpose and national ambition.">
                {["Built", "for", "women", "with", "presence,", "purpose", "and", "national", "ambition."].map((word, index) => (
                  <span key={`${word}-${index}`} className="founder-quote-word" data-founder-word style={{ transitionDelay: `${260 + index * 46}ms` }}>
                    {index === 0 ? '"' : ""}
                    {word}
                    {index === 8 ? '"' : ""}
                  </span>
                ))}
              </p>
              <button onClick={() => navigate("about")} className="mt-8 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">Founder story</button>
            </div>
            <div className="founder-photo-column">
              <div className="beam-frame beam-frame-soft relative mx-auto h-[clamp(330px,36vw,450px)] max-w-[460px] overflow-hidden border gold-divider bg-[#061122] shadow-[0_34px_110px_rgba(0,0,0,.38)]">
                <img
                  id="founder-photo-img"
                  src={imageRoles.founderPortrait}
                  alt="Zoya Siraj Sheikh"
                  className="h-full w-full object-cover object-[50%_12%] will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/16 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Founder & Chairman</p>
                  <h3 className="mt-2 font-display text-4xl leading-none text-white">Mrs. Zoya Siraj Sheikh</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shot6" className="cinematic-band px-[clamp(20px,4vw,42px)] py-[clamp(44px,6vw,76px)]">
        <div className="content-wrap grid gap-8 lg:grid-cols-[.8fr_1.05fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[500px] overflow-hidden border gold-divider bg-[#061122]/72 p-3 shadow-[0_28px_80px_rgba(0,0,0,.28)]">
            <div className="overflow-hidden bg-blush-wash">
              <img
                id="shot6img"
                src={imageRoles.titleholderSpotlight}
                alt="Mrs. Maharashtra titleholder on stage"
                className="aspect-[4/5] h-auto w-full object-cover will-change-transform"
                style={{ objectPosition: "50% 20%" }}
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-3 left-3 bg-blush-page px-5 py-3 text-[10px] uppercase tracking-[.24em] text-blush-accent">Mrs. Maharashtra</div>
          </div>
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">Titleholder spotlight</div>
            <h2 className="display-title max-w-2xl">The crown continues beyond the night.</h2>
            <p data-beat="1" className="mt-7 max-w-2xl font-display text-2xl leading-snug text-blush-ink transition duration-700">"A title year shaped by confidence, service, visibility and presence."</p>
            <p data-beat="2" className="mt-6 max-w-xl font-light leading-8 text-blush-body transition duration-700">From the runway to public appearances, each titleholder carries the platform into schools, shoots, designer showcases, media moments and national pathways.</p>
            <div data-beat="3" className="mt-8 grid gap-1 border gold-divider bg-[#061122]/72 transition duration-700 sm:grid-cols-3">
              {[["Media", "Coverage"], ["Public", "Appearances"], ["National", "Pathway"]].map(([n, label]) => (
                <div key={label} className="border-r hairline p-6"><div className="font-display text-4xl text-blush-ink">{n}</div><div className="mt-2 text-[10px] uppercase tracking-[.24em] text-blush-accent">{label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScrollExpandMedia
        mediaSrc="/missmrs-assets/videos/hero-expansion-02.mp4"
        posterSrc={gallery[6]}
        bgImageSrc={imageRoles.titleholderSpotlight}
        eyebrow="Season showreel"
        title="Runway Crown Applause"
        scrollToExpand="Crown"
        portrait
        clips={[
          { src: "/missmrs-assets/videos/hero-expansion-01.mp4", label: "Runway", objectPosition: "50% 32%", poster: imageRoles.titleMrs },
          { src: "/missmrs-assets/videos/hero-expansion-03.mp4", label: "Finale", objectPosition: "50% 26%", poster: gallery[10] },
        ]}
      >
        <p className="mt-7 max-w-xl text-lg font-light leading-8 text-blush-body">
          Watch the stage, lights and titleholder moments that show what contestants prepare for across the season.
        </p>
        <button onClick={() => navigate("press")} className="mt-8 w-fit border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">View season coverage</button>
      </ScrollExpandMedia>

      <Section className="cinematic-band gold-lift !py-0">
        <ImageGallery />
      </Section>

      <TestimonialsSection />

      <Section className="cinematic-band border-b gold-divider">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Latest news"
            title="Official updates from the crown pathway."
            body="Season announcements, contestant stories, backstage coverage and titleholder moments from the Miss & Mrs. Maharashtra media desk."
          />
          <button onClick={() => navigate("press")} className="reveal inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
            View all news <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <button
            type="button"
            onClick={() => navigate("press")}
            className="reveal group overflow-hidden border gold-divider bg-[#061122]/76 text-left transition hover:border-blush-accent/55 focus:outline-none focus:ring-2 focus:ring-blush-accent"
          >
            <YouTubePreview src={latestNews[0].src} title={latestNews[0].title} feature={latestNews[0].feature} className="aspect-video" />
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                <span>Featured</span>
                <span>{latestNews[0].date}</span>
              </div>
              <h3 className="font-display text-[clamp(2.2rem,4vw,4.8rem)] leading-none text-blush-ink transition group-hover:text-blush-accent">{latestNews[0].title}</h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-blush-body">{latestNews[0].summary}</p>
            </div>
          </button>
          <div className="grid gap-4">
            {latestNews.slice(1, 3).map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate("press")}
                className="reveal group grid overflow-hidden border gold-divider bg-[#061122]/76 text-left transition hover:border-blush-accent/55 focus:outline-none focus:ring-2 focus:ring-blush-accent sm:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]"
              >
                <YouTubePreview src={item.src} title={item.title} feature={item.feature} className="aspect-video h-full" />
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                    <span>{item.date}</span>
                    <span>{item.feature}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-blush-ink transition group-hover:text-blush-accent">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-blush-body">{item.summary}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section className="cinematic-band gold-lift">
        <div className="grid gap-10 border gold-divider bg-[#020817]/76 p-[clamp(28px,5vw,64px)] lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="reveal">
            <div className="eyebrow mb-5">Become a sponsor</div>
            <h2 className="display-title max-w-3xl">Put your brand beside the crown journey.</h2>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Connect your brand with contestants, families, finale guests, media coverage and year-long titleholder appearances across Maharashtra.
            </p>
          </div>
          <div className="reveal flex flex-col gap-5 lg:items-end">
            <div className="grid w-full grid-cols-2 border gold-divider bg-[#020817]/84">
              {[["1,000", "Finale guests"], ["120+", "Contestants"], ["3", "Audition cities"], ["40+", "Guests & jury"]].map(([n, label]) => (
                <div key={label} className="border-r border-t gold-divider p-5">
                  <div className="font-display text-4xl text-blush-ink">{n}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[.24em] text-blush-accent">{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("sponsors")} className="gold-cta inline-flex w-fit items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
              Explore partnership <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Section>

      <Section className="cinematic-band scroll-mt-28">
        <div id="tickets" />
        <SectionHeader eyebrow="The Grand Finale" title="Choose your finale night experience." body="Reserve your place in the room for the coronation, designer runway and titleholder crowning." />
        <div className="grid gap-5 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div key={ticket.name} className="reveal border gold-divider bg-[#061122]/76 p-7">
              <div className="text-[10px] uppercase tracking-[.26em] text-blush-accent">Finale pass</div>
              <h3 className="mt-5 font-display text-4xl leading-none text-blush-ink">{ticket.name}</h3>
              <p className="mt-5 min-h-14 text-sm leading-7 text-blush-body">{ticket.perk}</p>
              <strong className="mt-7 block font-display text-3xl font-normal text-blush-accent">{ticket.price}</strong>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const parsed = parseStatValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(Math.round(parsed.number * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasStarted, parsed.number]);

  return (
    <span ref={ref}>
      {parsed.prefix}
      {shown.toLocaleString("en-IN")}
      {parsed.suffix}
    </span>
  );
}

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}
