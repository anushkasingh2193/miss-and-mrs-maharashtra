import { ArrowDown, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { imageRoles, juniorIndiaContestants, type PageKey } from "@/data/site";

export function JuniorIndia(_: { navigate: (page: PageKey) => void }) {
  return (
    <>
      <section className="relative isolate min-h-[clamp(560px,76svh,760px)] overflow-hidden border-b gold-divider bg-[#020817] text-white">
        <img
          src={imageRoles.galleryHero}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_28%] opacity-25"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,8,23,.98)_0%,rgba(6,17,34,.9)_52%,rgba(2,8,23,.62)_100%)]" />

        <div className="content-wrap flex min-h-[clamp(560px,76svh,760px)] items-end px-[clamp(22px,5vw,72px)] py-[clamp(64px,8vw,108px)]">
          <div className="max-w-4xl">
            <div className="eyebrow mb-6 text-blush-accent">A new title begins</div>
            <h1 className="font-display text-[clamp(4.4rem,11vw,10rem)] leading-[.78] tracking-[-.035em] text-blush-ink">
              Junior<br />India.
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-blush-body sm:text-lg">
              A new stage is taking shape. Meet the contestants here as the first Junior India roster is announced.
            </p>
            <a
              href="#junior-india-contestants"
              className="mt-9 inline-flex items-center gap-3 border-b border-blush-accent pb-2 text-[11px] uppercase tracking-[.22em] text-blush-accent transition hover:text-blush-hover"
            >
              Meet the contestants <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </section>

      <Section id="junior-india-contestants" className="cinematic-band">
        <SectionHeader
          eyebrow="Junior India"
          title="Meet the contestants."
          body="This is the official home for the Junior India contestant roster. Names and portraits will appear here as profiles are confirmed."
        />

        {juniorIndiaContestants.length === 0 ? (
          <div className="relative mt-10 overflow-hidden border gold-divider bg-[#061122]/78 px-[clamp(24px,5vw,72px)] py-[clamp(58px,8vw,104px)] text-center">
            <div className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-blush-accent to-transparent" />
            <Sparkles className="mx-auto text-blush-accent" size={28} aria-hidden="true" />
            <p className="eyebrow mt-6">Roster announcement</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.8rem,6vw,6rem)] leading-[.92] text-blush-ink">
              Contestant profiles are coming soon.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-blush-body sm:text-base">
              Return here to discover each contestant as official names and portraits are released.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {juniorIndiaContestants.map((contestant) => (
              <article
                key={`${contestant.name}-${contestant.image}`}
                data-junior-contestant-card="true"
                className="group luxury-hover-card overflow-hidden border gold-divider bg-[#061122]/72"
              >
                <div className="aspect-[3/4] overflow-hidden bg-blush-wash">
                  <img
                    src={contestant.image}
                    alt={`${contestant.name}, Junior India contestant`}
                    className="luxury-hover-image h-full w-full object-cover object-top transition duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="border-t gold-divider p-5">
                  <h2 className="font-display text-3xl leading-none text-blush-ink">{contestant.name}</h2>
                  {contestant.descriptor ? (
                    <p className="mt-3 text-[10px] uppercase tracking-[.2em] text-blush-accent">{contestant.descriptor}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
