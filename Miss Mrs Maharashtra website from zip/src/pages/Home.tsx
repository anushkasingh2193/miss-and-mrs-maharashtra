import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, imageRoles, interestCities, pillars, stats, type PageKey } from "@/data/site";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { Section, SectionHeader } from "@/components/Section";
import ImageGallery from "@/components/ui/image-gallery";
import { TestimonialsSection } from "@/components/ui/testimonials-6";

const homepageJourney = [
  { step: "Apply", title: "Share your interest", body: "Choose your crown and send the essentials for an eligibility review." },
  { step: "Prepare", title: "Train for the stage", body: "Build runway, camera, voice, styling and interview confidence." },
  { step: "Compete", title: "Enter the finale pathway", body: "Meet the jury and move through media, runway and finale rounds." },
  { step: "Represent", title: "Carry the crown forward", body: "Continue into appearances, press and national opportunities." },
];

export function Home({ navigate }: { navigate: (page: PageKey) => void }) {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const juniorIndiaVideoRef = useRef<HTMLVideoElement | null>(null);
  useHomeMotion();

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.18 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = juniorIndiaVideoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-cinema">
      <section data-home-section id="shot1" className="relative bg-blush-page">
        <div className="relative h-[calc(100vh-var(--header-height))] min-h-[640px] overflow-hidden bg-[#020817]">
          <video
            data-hero-video
            ref={heroVideoRef}
            id="hero-img"
            className="absolute inset-0 h-full w-full object-cover object-center contrast-[1.08] saturate-[1.08] will-change-transform"
            poster={imageRoles.homeHeroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/missmrs-assets/videos/contestants-runway-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(2,8,23,.08),rgba(2,8,23,.48)_52%,rgba(2,8,23,.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#061122]/62 to-transparent" />
          <div id="hero-copy" className="content-wrap relative z-10 flex h-full items-center justify-center px-[clamp(20px,4vw,42px)] text-center will-change-transform">
            <div className="max-w-2xl translate-y-10 text-white sm:translate-y-14">
              <div className="eyebrow mb-3 text-blush-accent">Miss &amp; Mrs. Maharashtra</div>
              <h1 className="hero-title text-white drop-shadow-[0_18px_50px_rgba(0,0,0,.5)]" aria-label="Own the stage.">
                {["Own", "the", "stage."].map((word, index) => (
                  <span key={`${word}-${index}`} className="hero-word-reveal" style={{ animationDelay: `${220 + index * 95}ms` }}>{word}</span>
                ))}
              </h1>
              <div className="hero-actions mt-7 flex flex-wrap justify-center gap-5">
                <button onClick={() => navigate("register")} className="gold-cta px-7 py-3.5 text-xs uppercase tracking-[.2em]">Register interest for the next season.</button>
                <button onClick={() => navigate("categories")} className="inline-flex items-center border-b border-white/45 pb-2 text-xs uppercase tracking-[.2em] text-white transition hover:border-blush-accent hover:text-blush-accent">View categories</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="stats-film" className="cinematic-band !py-0">
        <div data-home-section>
          <div className="stat-strip grid md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item reveal px-8 py-8 text-center md:py-10" aria-label={`${stat.n} ${stat.label}`}>
                <div className="stat-value font-display text-[clamp(2.5rem,3.8vw,4.4rem)] leading-none"><span aria-hidden="true"><CountUpValue value={stat.n} delay={index * 140} /></span></div>
                <div className="stat-label mt-4 text-[10px] uppercase tracking-[.28em]">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-12 px-[clamp(0px,4vw,56px)] py-[clamp(48px,7vw,96px)] lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div className="reveal relative mx-auto aspect-[5/4] w-full max-w-[700px] overflow-hidden bg-[#061122] shadow-[0_34px_110px_rgba(0,0,0,.3)]">
              <img src={imageRoles.brandProof} alt="Miss and Mrs Maharashtra crowned contestants on stage" className="h-full w-full object-cover object-[50%_20%]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/82 via-[#020817]/10 to-transparent" />
              <h2 className="absolute bottom-6 left-6 font-display text-[clamp(2rem,3vw,4rem)] leading-none text-white">Two seasons crowned.</h2>
            </div>
            <div className="reveal max-w-xl">
              <h2 className="display-title mb-7">A state stage with a serious preparation standard.</h2>
              <p className="text-lg font-light leading-8 text-blush-body">More than 120 women trained across two seasons and three Maharashtra cities.</p>
              <button onClick={() => navigate("about")} className="mt-8 inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.2em] text-blush-accent">Discover the pageant <ArrowRight size={15} /></button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="homepage-message-section">
        <div data-home-section>
          <div className="reveal max-w-3xl">
            <h2 className="display-title">From first interest to titleholder year.</h2>
            <p className="mt-6 max-w-2xl text-[17px] font-light leading-8 text-blush-body">Four clear stages turn ambition into prepared stage presence.</p>
          </div>
          <div className="journey-track mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {homepageJourney.map((item, index) => (
              <article key={item.step} className="journey-card reveal">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[.24em] text-blush-accent">{item.step}</span>
                  <span className="font-display text-4xl leading-none text-blush-ink/35">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight text-blush-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-blush-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="category-cinema">
        <div data-home-section>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Choose your crown" title="Find the category that matches your life stage." body="Separate crowns for single and married applicants, with the same preparation standard and no minimum height." />
            <button onClick={() => navigate("categories")} className="reveal inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.2em] text-blush-accent">Compare categories <ArrowRight size={15} /></button>
          </div>
          <div className="category-cinema-grid grid gap-5 md:grid-cols-2">
            {categories.map((category, index) => (
              <button key={category.key} onClick={() => navigate("categories")} className="group category-panel luxury-hover-card reveal relative aspect-[4/5] overflow-hidden text-left text-white focus:outline-none focus:ring-2 focus:ring-blush-accent">
                <img src={index === 0 ? imageRoles.titleMiss : imageRoles.titleMrs} alt={category.title} className="luxury-hover-image h-full w-full object-cover object-[50%_8%] transition duration-700" loading="lazy" />
                <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/38 to-transparent" />
                <div className="absolute left-0 top-0 bg-[#061122]/85 px-5 py-4 text-[10px] uppercase tracking-[.24em] text-blush-accent">{index === 0 ? "Single applicants" : "Married applicants"}</div>
                <div className="luxury-hover-content absolute inset-x-0 bottom-0 p-[clamp(22px,3vw,34px)]">
                  <h3 className="luxury-hover-title font-display text-[clamp(2.6rem,4vw,5rem)] leading-none">{category.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/76">{category.who}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-white/14 py-4 text-[10px] uppercase tracking-[.14em] text-white/72">
                    {(index === 0 ? [["Status", "Single"], ["Height", "No minimum"], ["Home", "Maharashtra"]] : [["Status", "Married*"], ["Height", "No minimum"], ["Home", "Maharashtra"]]).map(([label, value]) => (
                      <div key={label}><dt className="text-blush-accent">{label}</dt><dd className="mt-1 text-white">{value}</dd></div>
                    ))}
                  </dl>
                  <span className="luxury-hover-arrow mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-blush-accent">Explore {category.title} <ArrowRight size={15} aria-hidden="true" /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <section data-home-section className="relative overflow-hidden border-y gold-divider bg-[#020817] text-white">
        <div className="content-wrap grid min-h-[clamp(620px,78svh,820px)] lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
          <div className="reveal relative z-10 flex flex-col justify-center px-[clamp(22px,5vw,76px)] py-[clamp(64px,8vw,112px)]">
            <h2 className="max-w-xl font-display text-[clamp(4rem,8vw,6rem)] leading-[.84] text-blush-ink">
              Junior<br />India.
            </h2>
            <p className="mt-7 max-w-lg text-base font-light leading-8 text-blush-body sm:text-lg">
              Discover the Junior India title and meet the contestants as official profiles are announced.
            </p>
            <button
              type="button"
              onClick={() => navigate("junior-india")}
              className="mt-9 inline-flex w-fit items-center gap-3 border-b border-blush-accent pb-2 text-[11px] uppercase tracking-[.22em] text-blush-accent transition hover:text-blush-hover"
            >
              Explore Junior India <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="reveal relative flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-10 lg:min-h-0 lg:px-10 lg:py-12">
            <img
              src="/missmrs-assets/videos/junior-india-home-poster.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-20 brightness-[.55] saturate-[.8]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,.92),rgba(2,8,23,.2)_40%,rgba(2,8,23,.5))]" />
            <div className="relative aspect-[9/16] h-[min(68svh,680px)] max-h-[680px] overflow-hidden border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,.52)]">
              <video
                ref={juniorIndiaVideoRef}
                data-junior-india-video
                className="h-full w-full object-cover"
                poster="/missmrs-assets/videos/junior-india-home-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Junior India runway highlights"
              >
                <source src="/missmrs-assets/videos/junior-india-home.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <Section className="cinematic-band !py-[clamp(44px,6vw,82px)] text-white">
        <div data-home-section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_.82fr] lg:items-center">
          <div className="reveal">
            <h2 className="font-display text-[clamp(3rem,5vw,5.9rem)] leading-[.92] text-blush-ink">The next season starts with your interest.</h2>
            <p className="mt-6 max-w-xl text-base font-light leading-8 text-blush-body">Season 3 auditions are complete. Tell us your preferred city and the team will contact you when new dates are announced.</p>
            <div className="mt-8 flex flex-wrap gap-3" aria-label="Preferred city options">
              {interestCities.map((city) => <span key={city} className="category-chip">{city}</span>)}
            </div>
            <button onClick={() => navigate("register")} className="gold-cta mt-9 inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.2em]">Register interest for the next season. <ArrowRight size={15} /></button>
          </div>
          <div className="luxury-hover-card reveal relative mx-auto aspect-[4/5] w-full max-w-[390px] overflow-hidden border gold-divider bg-[#061122]">
            <img src={imageRoles.titleMrs} alt="Mrs Maharashtra titleholder" className="luxury-hover-image h-full w-full object-cover object-[50%_10%]" loading="lazy" />
            <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#061122]/86 via-transparent to-transparent" />
            <p className="absolute bottom-7 left-7 right-7 font-display text-3xl leading-tight text-white">Be first to hear when applications reopen.</p>
          </div>
        </div>
      </Section>

      <Section className="finalist-benefits-section cinematic-band gold-lift">
        <div data-home-section>
          <SectionHeader eyebrow="The crown pathway" title="What finalists actually receive." body="Focused preparation for the runway, camera, interviews and titleholder responsibilities." />
          <div className="finalist-benefits-grid reveal grid overflow-hidden md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="finalist-benefit-card group flex min-w-0 flex-col bg-[#061122]">
                <div className="finalist-benefit-media relative aspect-[4/3] overflow-hidden">
                  <img src={encodeURI(pillar.bg)} alt={pillar.title} className="finalist-benefit-image h-full w-full object-cover transition duration-700" style={{ objectPosition: pillar.position }} loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061122]/72 via-transparent to-[#020817]/10" />
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-5 text-[10px] uppercase tracking-[.22em] text-white/78">{pillar.caption}</div>
                </div>
                <div className="finalist-benefit-content flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="font-display text-[clamp(2rem,2.5vw,2.8rem)] leading-[1.02] text-blush-ink">{pillar.title}</h3>
                  <div className="mt-5 h-px w-10 bg-blush-accent/80 transition-all duration-500 group-hover:w-20" aria-hidden="true" />
                  <p className="mt-5 text-sm leading-7 text-blush-body">{pillar.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <section data-home-section id="founder-reveal" className="founder-reveal-section cinematic-band px-[clamp(20px,4vw,42px)] py-[clamp(52px,7vw,104px)]">
        <div className="content-wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_.92fr] lg:items-center">
            <div className="relative z-10">
              <div className="founder-line-mask mb-3"><div className="founder-reveal-line eyebrow" data-founder-line style={{ transitionDelay: "0ms" }}>Founder</div></div>
              <h2 className="font-display text-[clamp(3rem,5.4vw,7rem)] leading-[.9] text-blush-ink">
                <span className="founder-line-mask"><span className="founder-reveal-line block" data-founder-line style={{ transitionDelay: "90ms" }}>Zoya Siraj</span></span>
                <span className="founder-line-mask"><span className="founder-reveal-line block" data-founder-line style={{ transitionDelay: "170ms" }}>Sheikh.</span></span>
              </h2>
              <p className="mt-4 text-xs uppercase tracking-[.24em] text-blush-accent">Mrs. Maharashtra 2022 / 3rd Runner-up, Mrs. Universe</p>
              <p className="mt-5 max-w-xl text-base font-light leading-8 text-blush-body">Zoya founded the platform to give women in Maharashtra structured grooming, credible stage preparation and a visible path beyond coronation night.</p>
              <p className="founder-quote mt-6 max-w-md font-display text-[clamp(1.55rem,2.4vw,2.9rem)] leading-tight text-blush-ink" aria-label="A platform where confidence becomes preparation, and preparation becomes representation.">
                {["A", "platform", "where", "confidence", "becomes", "preparation,", "and", "preparation", "becomes", "representation."].map((word, index) => (
                  <span key={`${word}-${index}`} className="founder-quote-word" data-founder-word style={{ transitionDelay: `${260 + index * 46}ms` }}>{index === 0 ? '"' : ""}{word}{index === 9 ? '"' : ""}</span>
                ))}
              </p>
              <button onClick={() => navigate("about")} className="mt-8 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">Meet the founder</button>
            </div>
            <div className="founder-photo-column">
              <div className="beam-frame beam-frame-soft relative mx-auto h-[clamp(330px,36vw,450px)] max-w-[460px] overflow-hidden border gold-divider bg-[#061122] shadow-[0_34px_110px_rgba(0,0,0,.38)]">
                <img id="founder-photo-img" src={imageRoles.founderPortrait} alt="Zoya Siraj Sheikh" className="h-full w-full object-cover object-[50%_12%] will-change-transform" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/16 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6"><p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Founder &amp; Chairman / Nagpur</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="!py-0">
        <div data-home-section><ImageGallery onViewGallery={() => navigate("winners")} /></div>
      </Section>

      <div data-home-section><TestimonialsSection /></div>
    </div>
  );
}

function CountUpValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const parsed = parseStatValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 1800;
    const start = performance.now() + delay;
    let frame = 0;
    const tick = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      setShown(Math.round(parsed.number * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [delay, hasStarted, parsed.number]);

  return <span ref={ref} className="tabular-nums" aria-label={value}>{parsed.prefix}{shown.toLocaleString("en-IN")}{parsed.suffix}</span>;
}

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return { prefix: match[1], number: Number(match[2].replace(/,/g, "")), suffix: match[3] };
}
