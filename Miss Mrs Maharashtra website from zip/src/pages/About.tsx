import { ArrowRight } from "lucide-react";
import { archive, imageRoles, timeline, type PageKey } from "@/data/site";
import { ImageTile, Section, SectionHeader } from "@/components/Section";

const founderStats = [
  ["Zoya", "Founder Chairman"],
  ["Siraj", "Chairman"],
  ["2022", "Mrs. Maharashtra"],
];

const proofStats = [
  ["Presented by", "Zoya & Siraj Sheikh"],
  ["2022", "Mrs. Maharashtra"],
  ["3rd", "Runner-up, Mrs. Universe"],
  ["3 cities", "Season 3 auditions"],
  ["National", "Crown pathway"],
];

const leadershipCards = [
  {
    name: "Zoya Siraj Sheikh",
    role: "Founder Chairman",
    image: imageRoles.founderPortrait,
    position: "50% 12%",
  },
  {
    name: "Siraj Sheikh",
    role: "Chairman",
    image: "/missmrs-assets/mentor/mentor_siraz_sheikh-1367x2048.jpg",
    position: "50% 14%",
  },
];

const platformPillars = [
  {
    title: "What it is",
    body: "A Maharashtra pageant platform with auditions, grooming, runway rounds, portfolio creation and finale production.",
  },
  {
    title: "Who it is for",
    body: "Miss category applicants and Mrs. category women ready to build confidence, public presence and representation.",
  },
  {
    title: "What you receive",
    body: "Mentorship, styling, ramp training, media exposure and professional images for life beyond the season.",
  },
  {
    title: "Where it leads",
    body: "A titleholder year with appearances, advocacy, designer showcases and national platform consideration.",
  },
];

export function About({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <div className="home-cinema">
      <section className="relative overflow-hidden border-b gold-divider bg-[#031026] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(214,174,79,.16),transparent_28%),radial-gradient(circle_at_18%_70%,rgba(214,174,79,.08),transparent_34%),linear-gradient(180deg,#031026,#0b0907_52%,#031026)]" />
        <div className="content-wrap relative z-10 grid min-h-[calc(82vh-var(--header-height))] gap-10 px-[clamp(20px,4vw,42px)] py-[clamp(56px,7vw,100px)] lg:grid-cols-[1.02fr_.82fr] lg:items-center">
          <div className="reveal max-w-4xl">
            <div className="eyebrow mb-5 text-blush-accent">About the platform</div>
            <h1 className="hero-title max-w-4xl">Built for the stage. Designed for the year after.</h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              A titleholder-led Maharashtra platform for grooming, runway discipline, media readiness and a national crown pathway.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button onClick={() => navigate("register")} className="gold-cta inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
                Apply now <ArrowRight size={15} />
              </button>
              <a href="#founder-vision" className="border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover">
                Meet the founders
              </a>
            </div>
          </div>

          <div className="reveal relative mx-auto w-full max-w-[640px]">
            <div className="absolute -inset-4 border border-blush-accent/15" />
            <div className="relative grid gap-3 border gold-divider bg-[#061122]/72 p-3 shadow-[0_34px_120px_rgba(0,0,0,.46)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {leadershipCards.map((leader) => (
                  <div key={leader.name} className="relative aspect-[4/5] overflow-hidden bg-[#020817]">
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role} of Miss and Mrs Maharashtra`}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: leader.position }}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/12 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">{leader.role}</p>
                      <h2 className="mt-2 font-display text-[clamp(1.9rem,3vw,3.6rem)] leading-none text-white">{leader.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border gold-divider bg-[#020817]/78 p-5">
                <div className="eyebrow mb-3">Leadership</div>
                <p className="font-display text-[clamp(1.8rem,3vw,3.4rem)] leading-tight text-blush-ink">
                  Presented by Zoya and Siraj Sheikh.
                </p>
                <p className="mt-4 text-sm leading-7 text-blush-body">
                  Titleholder insight and production leadership brought together for one Maharashtra stage.
                </p>
              </div>
              <div className="grid gap-1 sm:grid-cols-3">
                {founderStats.map(([value, label]) => (
                  <div key={label} className="border gold-divider bg-[#020817]/78 p-4">
                    <div className="font-display text-[clamp(1.5rem,2.3vw,2.6rem)] leading-none text-blush-ink">{value}</div>
                    <div className="mt-3 text-[9px] uppercase tracking-[.2em] text-blush-accent">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="cinematic-band !py-0">
        <div className="grid border-y gold-divider bg-[#020817]/72 md:grid-cols-5">
          {proofStats.map(([value, label]) => (
            <div key={label} className="border-r gold-divider px-5 py-7">
              <div className="font-display text-[clamp(1.9rem,2.8vw,3.4rem)] leading-none text-blush-ink">{value}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[.24em] text-blush-accent">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="eyebrow reveal">Brand statement</div>
          <div className="reveal max-w-4xl">
            <h2 className="display-title">Built for the stage, designed for the year after.</h2>
            <p className="mt-7 text-lg font-light leading-8 text-blush-body">
              Miss & Mrs. Maharashtra is a professional state pageant built around training, presentation, media readiness and titleholder responsibility.
            </p>
            <p className="mt-5 text-lg font-light leading-8 text-blush-body">
              Contestants do not arrive as finished models. They enter a guided season where voice, posture, style, interview clarity and advocacy are developed with intent.
            </p>
          </div>
        </div>
      </Section>

      <Section id="founder-vision" className="cinematic-band !pt-0">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="reveal grid gap-3 sm:grid-cols-2">
            {leadershipCards.map((leader) => (
              <div key={`vision-${leader.name}`} className="beam-frame relative aspect-[4/5] overflow-hidden border gold-divider bg-[#061122]">
                <img
                  src={leader.image}
                  alt={`${leader.name}, ${leader.role}`}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: leader.position }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061122] via-[#061122]/12 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">{leader.role}</p>
                  <h2 className="mt-2 font-display text-[clamp(1.9rem,3vw,3.4rem)] leading-none text-white">{leader.name}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal">
            <div className="eyebrow mb-5">Founder leadership</div>
            <h2 className="display-title max-w-3xl">Presented by Zoya and Siraj Sheikh.</h2>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Zoya brings titleholder experience and pageant vision; Siraj brings production discipline, partnerships and operational leadership. Together, they shape one credible Maharashtra stage.
            </p>
            <div className="mt-8 grid border gold-divider bg-[#061122]/72 sm:grid-cols-3">
              {founderStats.map(([value, label]) => (
                <div key={label} className="border-r gold-divider p-6">
                  <div className="font-display text-[clamp(2.3rem,3.6vw,4.6rem)] leading-none text-blush-ink">{value}</div>
                  <div className="mt-3 text-[10px] uppercase tracking-[.24em] text-blush-accent">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Platform" title="Clear purpose. Real preparation." body="The pageant experience is structured around outcomes contestants can carry beyond one evening on stage." />
        <div className="grid gap-1 bg-blush-ink/10 md:grid-cols-4">
          {platformPillars.map((pillar) => (
            <article key={pillar.title} className="reveal bg-[#061122]/78 p-7 transition hover:bg-[#11100c]">
              <h3 className="font-display text-3xl text-blush-ink">{pillar.title}</h3>
              <p className="mt-5 text-sm leading-7 text-blush-body">{pillar.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Timeline" title="From first crown to Season 3." />
        <div className="border-y gold-divider">
          {timeline.map((item) => (
            <div key={`${item.when}-${item.title}`} className="reveal grid gap-5 border-t gold-divider py-7 md:grid-cols-[120px_1fr_2fr]">
              <div className="font-display text-4xl text-blush-accent">{item.when}</div>
              <h3 className="font-display text-2xl text-blush-ink">{item.title}</h3>
              <p className="leading-7 text-blush-body">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Archive" title="Four frames from the pageant floor." />
        <div className="grid gap-5 md:grid-cols-4">
          {archive.map((item) => (
            <ImageTile key={item.no} image={item.image} title={item.title} meta={`Frame ${item.no}`} />
          ))}
        </div>
      </Section>
    </div>
  );
}
