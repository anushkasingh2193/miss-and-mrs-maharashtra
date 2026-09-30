import { imageRoles, jury, mentors, type PageKey } from "@/data/site";
import { ImageTile, Section, SectionHeader } from "@/components/Section";

export function Mentors(_: { navigate: (page: PageKey) => void }) {
  return (
    <div className="home-cinema">
      <section className="cinematic-band relative overflow-hidden border-b gold-divider px-[clamp(20px,4vw,42px)] py-[clamp(64px,8vw,120px)] text-white">
        <div className="content-wrap grid min-h-[calc(78vh-var(--header-height))] gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div className="reveal max-w-4xl">
            <div className="eyebrow mb-5">Jury & mentors</div>
            <h1 className="hero-title max-w-4xl">Guidance for every stage.</h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Expert mentorship across grooming, public speaking, styling, runway presence and social advocacy.
            </p>
            <div className="mt-10 grid max-w-xl grid-cols-3 border gold-divider bg-[#020817]/72">
              {[["6", "Mentors"], ["8", "Jury voices"], ["3", "Cities"]].map(([value, label]) => (
                <div key={label} className="border-r gold-divider p-5">
                  <div className="font-display text-4xl text-blush-ink">{value}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[.24em] text-blush-accent">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-5 rounded-t-full border border-blush-accent/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border gold-divider bg-[#020817] shadow-[0_36px_110px_rgba(0,0,0,.42)]">
              <img
                src={imageRoles.mentorHero}
                alt="Miss and Mrs Maharashtra mentor guidance"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 30%" }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(4,4,4,.78)),radial-gradient(circle_at_50%_14%,rgba(214,174,79,.12),transparent_36%)]" />
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-[10px] uppercase tracking-[.3em] text-blush-accent">Season faculty</p>
                <h2 className="mt-3 font-display text-[clamp(2.3rem,4vw,4.8rem)] leading-none text-white">Mentorship with presence.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="cinematic-band">
        <SectionHeader eyebrow="Mentors" title="The season faculty." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((m) => <ImageTile key={m.name} image={m.bg} title={m.name} meta={m.role} body={m.bio} />)}
        </div>
      </Section>
      <Section className="cinematic-band">
        <SectionHeader eyebrow="Guest jury" title="Faces from stage, screen and pageantry." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {jury.map((j) => <ImageTile key={j.name} image={j.bg} title={j.name} meta={j.role} />)}
        </div>
      </Section>
    </div>
  );
}
