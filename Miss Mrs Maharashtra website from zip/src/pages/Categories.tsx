import { ArrowRight } from "lucide-react";
import { categories, imageRoles, scoring, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";

const categoryDetails = [
  {
    key: "miss",
    label: "Title 01",
    promise: "For unmarried women ready for a national stage.",
    eligibility: "Single and unmarried women and girls of Maharashtra.",
    pathway: "Miss Supraglobal / Miss Summit International",
    image: imageRoles.titleMiss,
    position: "50% 18%",
    facts: ["Shared grooming", "Finale runway", "Portfolio shoot", "National pathway"],
  },
  {
    key: "mrs",
    label: "Title 02",
    promise: "For women carrying confidence, purpose and presence.",
    eligibility: "Married, divorced, widowed women, and single mothers.",
    pathway: "Mrs. India Supranational / Women of the Universe",
    image: imageRoles.titleMrs,
    position: "50% 20%",
    facts: ["Shared grooming", "Finale runway", "Portfolio shoot", "Titleholder year"],
  },
] as const;

const comparisonRows = [
  ["Eligibility", "Unmarried women and girls", "Married, divorced, widowed women and single mothers"],
  ["Pathway", "Miss Supraglobal, Miss Summit International", "Mrs. India Supranational, Women of the Universe"],
  ["Judging", "Separate category scoring", "Separate category scoring"],
  ["Finale", "Shared national-standard runway", "Shared national-standard runway"],
];

export function Categories({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <div className="home-cinema">
      <section className="relative overflow-hidden border-b gold-divider bg-[#031026] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(214,174,79,.15),transparent_30%),radial-gradient(circle_at_18%_74%,rgba(214,174,79,.08),transparent_32%),linear-gradient(180deg,#031026,#0b0907_54%,#031026)]" />
        <div className="content-wrap relative z-10 grid min-h-[calc(82vh-var(--header-height))] gap-10 px-[clamp(20px,4vw,42px)] py-[clamp(56px,7vw,96px)] lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div className="reveal max-w-4xl">
            <div className="eyebrow mb-5">Categories</div>
            <h1 className="hero-title max-w-4xl">Two crowns. One national-standard season.</h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Miss Maharashtra and Mrs. Maharashtra are judged separately, with shared grooming, shared production standards and distinct national pathways.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button onClick={() => navigate("register")} className="gold-cta inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Apply now <ArrowRight size={15} />
              </button>
              <a href="#compare-categories" className="border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover">
                Compare categories
              </a>
            </div>
          </div>

          <div className="reveal grid gap-3 sm:grid-cols-2">
            {categoryDetails.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate("register")}
                className="group relative aspect-[4/5] overflow-hidden border gold-divider bg-[#061122] text-left text-white shadow-[0_24px_90px_rgba(0,0,0,.34)] transition hover:-translate-y-1 hover:border-blush-accent focus:outline-none focus:ring-2 focus:ring-blush-accent"
              >
                <img
                  src={item.image}
                  alt={`${item.key === "miss" ? "Miss" : "Mrs."} Maharashtra category`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: item.position }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031026] via-[#031026]/30 to-transparent" />
                <div className="absolute left-0 top-0 bg-[#031026]/88 px-5 py-4 text-[10px] uppercase tracking-[.28em] text-blush-accent">{item.label}</div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] uppercase tracking-[.26em] text-blush-accent">{item.pathway}</p>
                  <h2 className="mt-3 font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-none">{item.key === "miss" ? "Miss" : "Mrs."} Maharashtra</h2>
                  <p className="mt-4 text-sm leading-6 text-white/78">{item.promise}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section className="cinematic-band !py-0">
        <div className="grid border-y gold-divider bg-[#020817]/72 md:grid-cols-4">
          {["No height requirement", "No weight requirement", "No complexion criterion", "Separate title scoring"].map((item) => (
            <div key={item} className="border-r gold-divider px-6 py-6 text-[10px] uppercase tracking-[.24em] text-blush-accent">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Choose your crown" title="The right category, clearly defined." body="Both categories share the same stage quality, grooming season and finale discipline. Eligibility and onward pathways stay distinct." />
        <div className="grid gap-5 lg:grid-cols-2">
          {categories.map((cat, idx) => {
            const detail = categoryDetails[idx];

            return (
              <article key={cat.key} className="reveal grid overflow-hidden border gold-divider bg-[#020817]/76 lg:grid-cols-[.82fr_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#061122] lg:aspect-auto">
                  <img
                    src={detail.image}
                    alt={`${cat.title} applicant pathway`}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    style={{ objectPosition: detail.position }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/86 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.28em] text-blush-accent">{detail.label}</div>
                </div>
                <div className="p-[clamp(24px,3.5vw,44px)]">
                  <div className="eyebrow mb-5">{cat.pathway}</div>
                  <h2 className="font-display text-[clamp(2.8rem,4.8vw,5.8rem)] leading-none text-blush-ink">{cat.title}</h2>
                  <p className="mt-6 text-lg font-light leading-8 text-blush-body">{detail.eligibility}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {detail.facts.map((fact) => (
                      <div key={fact} className="border-b gold-divider pb-3 text-xs uppercase tracking-[.2em] text-blush-accent">{fact}</div>
                    ))}
                  </div>
                  <p className="mt-7 text-sm leading-7 text-blush-body">
                    There is no minimum height, weight or complexion requirement. Applicants are assessed on preparation, communication, advocacy, talent and stage presence.
                  </p>
                  <button onClick={() => navigate("register")} className="gold-cta mt-8 inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[.24em]">
                    Apply for {cat.title} <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="compare-categories" className="cinematic-band gold-lift">
        <SectionHeader eyebrow="Compare" title="Different eligibility. Same stage standard." />
        <div className="overflow-hidden border gold-divider bg-[#020817]/78">
          <div className="grid grid-cols-[.72fr_1fr_1fr] border-b gold-divider px-5 py-4 text-[10px] uppercase tracking-[.24em] text-blush-accent">
            <span>Criteria</span>
            <span>Miss Maharashtra</span>
            <span>Mrs. Maharashtra</span>
          </div>
          {comparisonRows.map(([label, miss, mrs]) => (
            <div key={label} className="reveal grid gap-4 border-b gold-divider px-5 py-5 text-sm leading-7 text-blush-body md:grid-cols-[.72fr_1fr_1fr]">
              <strong className="font-display text-2xl font-normal text-blush-ink">{label}</strong>
              <span>{miss}</span>
              <span>{mrs}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Scoring" title="Transparent criteria for every finalist." body="The same scoring structure is applied with category-specific judgment, keeping the pageant clear and fair." />
        <div className="grid gap-4 md:grid-cols-5">
          {scoring.map((s) => (
            <article key={s.no} className="reveal border gold-divider bg-[#020817]/78 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[.26em] text-blush-accent">{s.no}</span>
                <strong className="font-display text-4xl font-normal leading-none text-blush-ink">{s.weight}</strong>
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight text-blush-ink">{s.round}</h3>
              <p className="mt-4 text-sm leading-7 text-blush-body">{s.note}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
