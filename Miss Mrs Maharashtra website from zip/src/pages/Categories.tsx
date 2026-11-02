import { ArrowRight } from "lucide-react";
import { imageRoles, scoring, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";

const categoryDetails = [
  {
    key: "miss",
    title: "Miss Maharashtra",
    label: "Title 01",
    description: "For single and unmarried women and girls of Maharashtra.",
    metaLabel: "National pathway",
    meta: "Miss Supraglobal / Miss Summit International",
    image: imageRoles.titleMiss,
    position: "50% 8%",
    target: "register",
    cta: "Apply for Miss Maharashtra",
  },
  {
    key: "mrs",
    title: "Mrs. Maharashtra",
    label: "Title 02",
    description: "For married, divorced or widowed women, and single mothers.",
    metaLabel: "National pathway",
    meta: "Mrs. India Supranational / Women of the Universe",
    image: imageRoles.titleMrs,
    position: "50% 8%",
    target: "register",
    cta: "Apply for Mrs. Maharashtra",
  },
  {
    key: "junior-india",
    title: "Junior India",
    label: "Youth category",
    description: "A dedicated runway experience for young talent to shine with confidence and creativity.",
    metaLabel: "Event date",
    meta: "22 November 2026",
    image: imageRoles.juniorIndiaCategory,
    position: "50% 50%",
    target: "junior-india",
    cta: "Explore Junior India",
  },
] as const satisfies ReadonlyArray<{
  key: string;
  title: string;
  label: string;
  description: string;
  metaLabel: string;
  meta: string;
  image: string;
  position: string;
  target: PageKey;
  cta: string;
}>;

const comparisonRows = [
  ["Eligibility", "Unmarried women and girls", "Married, divorced, widowed women and single mothers"],
  ["Pathway", "Miss Supraglobal, Miss Summit International", "Mrs. India Supranational, Women of the Universe"],
  ["Judging", "Separate category scoring", "Separate category scoring"],
  ["Finale", "Shared national-standard runway", "Shared national-standard runway"],
  ["Not required", "No height, weight or complexion criterion", "No height, weight or complexion criterion"],
];

export function Categories({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <div className="home-cinema">
      <section className="relative overflow-hidden border-b gold-divider bg-[#031026] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(74,169,255,.15),transparent_30%),radial-gradient(circle_at_18%_74%,rgba(74,169,255,.08),transparent_32%),linear-gradient(180deg,#031026,#061122_54%,#031026)]" />
        <div className="content-wrap relative z-10 flex min-h-[clamp(460px,62svh,680px)] items-center px-[clamp(20px,4vw,42px)] py-[clamp(64px,8vw,112px)]">
          <div className="reveal max-w-5xl">
            <div className="eyebrow mb-5">Categories</div>
            <h1 className="hero-title max-w-5xl">Three stages. One place to find yours.</h1>
            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/72 sm:text-lg">
              Compare each category at a glance, then explore the pathway designed for your journey.
            </p>
            <div className="category-hero-proof mt-8 grid gap-3 sm:grid-cols-3">
              {["3 distinct categories", "Separate pathways", "One confident stage"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#choose-category" className="gold-cta inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Choose your category <ArrowRight size={15} />
              </a>
              <a href="#compare-categories" className="border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover">
                Compare adult titles
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section id="choose-category" className="cinematic-band gold-lift">
        <SectionHeader eyebrow="Choose your category" title="Every stage, clearly presented." body="See the purpose and pathway of each category before choosing where to continue." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryDetails.map((item) => (
            <article
              key={item.key}
              data-category-card="true"
              className="luxury-hover-card reveal flex h-full min-w-0 flex-col overflow-hidden border gold-divider bg-[#020817]/82"
            >
              <div className="luxury-hover-media relative aspect-[4/5] overflow-hidden bg-[#061122]">
                <img
                  src={item.image}
                  alt={`${item.title} category`}
                  className="luxury-hover-image h-full w-full object-cover transition duration-700"
                  style={{ objectPosition: item.position }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="luxury-hover-overlay absolute inset-0 bg-gradient-to-t from-[#020817]/70 via-transparent to-[#020817]/10" />
                <span className="absolute left-5 top-5 border gold-divider bg-[#031026]/90 px-4 py-3 text-[10px] uppercase tracking-[.26em] text-blush-accent backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
              <div className="luxury-hover-content flex flex-1 flex-col p-[clamp(24px,3vw,36px)]">
                <h2 className="luxury-hover-title text-balance font-display text-[clamp(2.3rem,3.5vw,3.9rem)] leading-[.98] text-blush-ink">
                  {item.title}
                </h2>
                <p className="mt-5 min-h-[4.5rem] text-sm font-light leading-7 text-blush-body sm:text-base">
                  {item.description}
                </p>
                <div className="mt-6 border-y gold-divider py-4">
                  <p className="text-[9px] uppercase tracking-[.26em] text-blush-accent">{item.metaLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-blush-ink">{item.meta}</p>
                </div>
                <button
                  onClick={() => navigate(item.target)}
                  className="gold-cta mt-7 inline-flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[10px] uppercase tracking-[.2em] focus:outline-none focus:ring-2 focus:ring-blush-accent focus:ring-offset-2 focus:ring-offset-[#020817]"
                >
                  {item.cta} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="compare-categories" className="cinematic-band gold-lift">
        <SectionHeader eyebrow="Adult title comparison" title="Different eligibility. Same stage standard." />
        <div className="category-compare-table overflow-hidden border gold-divider bg-[#020817]/78">
          <div className="category-compare-row category-compare-head border-b gold-divider px-5 py-4 text-[10px] uppercase tracking-[.24em] text-blush-accent">
            <span>Criteria</span>
            <span>Miss Maharashtra</span>
            <span>Mrs. Maharashtra</span>
          </div>
          {comparisonRows.map(([label, miss, mrs]) => (
            <div key={label} className="category-compare-row reveal gap-4 border-b gold-divider px-5 py-5 text-sm leading-7 text-blush-body">
              <strong className="font-display text-2xl font-normal text-blush-ink">{label}</strong>
              <span>{miss}</span>
              <span>{mrs}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Miss & Mrs. title scoring" title="Transparent criteria for every adult finalist." />
        <div className="grid gap-4 md:grid-cols-5">
          {scoring.map((s) => (
            <article key={s.no} className="category-score-card reveal border gold-divider bg-[#020817]/78 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[.26em] text-blush-accent">{s.no}</span>
                <strong className="font-display text-4xl font-normal leading-none text-blush-ink">{s.weight}</strong>
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight text-blush-ink">{s.round}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section className="category-final-cta">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="reveal max-w-3xl">
            <div className="eyebrow mb-5">Ready to choose?</div>
            <h2 className="display-title">Apply in the category that reflects your current life stage.</h2>
          </div>
          <div className="reveal flex flex-wrap gap-4">
            <button onClick={() => navigate("register")} className="gold-cta inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
              Start application <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate("contact")} className="inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
              Ask a question <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
