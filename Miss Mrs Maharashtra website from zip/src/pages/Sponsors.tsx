import { ArrowRight } from "lucide-react";
import { imageRoles, partnerProof, sponsorNames, tiers, type PageKey } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";

const sponsorReach = [
  ["1,000", "Gala audience"],
  ["120+", "Contestants"],
  ["3", "Audition cities"],
  ["40+", "Guests & jury"],
];

export function Sponsors({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <div className="home-cinema">
      <section className="relative min-h-[72vh] overflow-hidden border-b gold-divider bg-[#040404] text-white">
        <img src={imageRoles.sponsorHero} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_24%] opacity-70" loading="eager" decoding="async" fetchPriority="high" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(214,174,79,.16),transparent_30%),linear-gradient(90deg,rgba(4,4,4,.95),rgba(4,4,4,.56)_52%,rgba(4,4,4,.88))]" />
        <div className="content-wrap relative z-10 flex min-h-[72vh] flex-col justify-end px-[clamp(20px,4vw,42px)] pb-[clamp(72px,9vw,120px)] pt-24">
          <div className="eyebrow mb-5">Become a sponsor</div>
          <h1 className="hero-title max-w-5xl">Partner with Maharashtra's crown stage.</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
            Build brand presence across auditions, grooming, coronation night, media coverage and titleholder appearances.
          </p>
          <button onClick={() => navigate("contact")} className="gold-cta mt-9 inline-flex w-fit items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
            Enquire now <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <Section className="cinematic-band !py-0">
        <div className="stat-strip grid border-b gold-divider md:grid-cols-4">
          {sponsorReach.map(([n, label]) => (
            <div key={label} className="stat-item reveal px-8 py-9 text-center md:py-11">
              <div className="font-display text-[clamp(3rem,4.6vw,5.2rem)] leading-none text-blush-ink">{n}</div>
              <div className="mt-4 text-[10px] uppercase tracking-[.34em] text-blush-accent">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader
          eyebrow="Sponsor packages"
          title="Choose your level of presence."
          body="Each package is designed for visible association with the pageant journey: city auditions, finale stage, contestant media and titleholder activity."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.tier} className={`reveal border bg-[#040404]/76 p-7 ${tier.featured ? "border-blush-accent shadow-[0_24px_80px_rgba(214,174,79,.1)]" : "border-blush-accent/15"}`}>
              <div className="eyebrow mb-5">{tier.slots}</div>
              <h3 className="font-display text-4xl text-blush-ink">{tier.tier}</h3>
              <div className="mt-4 text-2xl text-blush-accent">{tier.price}</div>
              <ul className="mt-8 grid gap-4 text-sm leading-7 text-blush-body">
                {tier.perks.map((perk) => (
                  <li key={perk} className="border-b gold-divider pb-3">{perk}</li>
                ))}
              </ul>
              <button onClick={() => navigate("contact")} className="mt-8 inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent">
                Request sponsorship deck <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </Section>

      <Section className="cinematic-band gold-lift">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="editorial-image reveal aspect-[4/5]">
            <img src={imageRoles.sponsorProof} alt="Makeover partner and pageant backstage moment" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Partner proof</p>
              <h3 className="mt-2 font-display text-4xl text-white">Visibility beyond the finale.</h3>
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow mb-5">Partner proof</div>
            <blockquote className="font-display text-[clamp(2.4rem,4.6vw,5.5rem)] leading-none text-blush-ink">"{partnerProof.quote}"</blockquote>
            <p className="mt-7 text-blush-body">{partnerProof.name}, {partnerProof.role}</p>
            <button onClick={() => navigate("contact")} className="gold-cta mt-9 inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[.24em]">
              Request sponsorship deck <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Partnership categories" title="Available lanes for brand presence." body="Confirmed partners appear in campaign material separately; these categories show where new sponsors can enter the season." />
        <div className="grid grid-cols-2 gap-1 bg-blush-ink/10 md:grid-cols-3">
          {sponsorNames.map((name) => (
            <div key={name} className="reveal grid min-h-28 place-items-center bg-[#040404]/76 p-5 text-center font-display text-2xl text-blush-ink transition hover:text-blush-accent">
              {name}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
