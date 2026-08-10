import { ArrowRight, CalendarDays, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { gallery, latestNews, press, pressKit, type PageKey, youtubeChannelUrl } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  const leadNews = latestNews[0];
  const secondaryNews = latestNews.slice(1);

  return (
    <>
      <section className="relative overflow-hidden border-b gold-divider bg-[#070607] text-white">
        <img
          src={gallery[3]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_24%] opacity-54"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070607] via-[#070607]/68 to-[#070607]/88" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070607] to-transparent" />
        <div className="content-wrap relative z-10 grid min-h-[68vh] gap-10 px-[clamp(20px,4vw,42px)] pb-[clamp(48px,7vw,88px)] pt-[clamp(112px,12vw,156px)] lg:grid-cols-[.92fr_.72fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5 text-blush-accent">Official newsroom</div>
            <h1 className="font-display text-[clamp(4.4rem,11vw,9.5rem)] leading-[.86] text-blush-ink">
              Latest news.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Season updates, contestant stories, stage highlights and official coverage from Miss & Mrs. Maharashtra.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#latest-news"
                className="inline-flex items-center gap-3 bg-blush-accent px-6 py-4 text-xs font-semibold uppercase tracking-[.2em] text-black transition hover:bg-blush-hover"
              >
                View stories <ArrowRight size={16} />
              </a>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-blush-wash/30 px-6 py-4 text-xs font-semibold uppercase tracking-[.2em] text-blush-wash transition hover:border-blush-accent hover:text-blush-accent"
              >
                Open channel <ExternalLink size={15} />
              </a>
            </div>
          </div>

          <div className="reveal hidden border gold-divider bg-[#070607]/86 shadow-2xl shadow-black/30 backdrop-blur lg:block">
            <YouTubePreview
              src={leadNews.src}
              title={leadNews.title}
              feature={leadNews.feature}
              className="aspect-video"
            />
            <div className="p-6">
              <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                <span>Featured</span>
                <span>{leadNews.date}</span>
              </div>
              <h2 className="font-display text-3xl leading-tight text-blush-ink">{leadNews.title}</h2>
              <a
                href="#latest-news"
                className="mt-5 inline-flex items-center gap-3 border-t gold-divider pt-4 text-xs font-semibold uppercase tracking-[.2em] text-blush-accent transition hover:text-blush-hover"
              >
                Read coverage <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section id="latest-news" className="cinematic-band gold-lift text-white">
        <div className="reveal mb-10 grid border gold-divider bg-[#070607]/78 text-sm text-blush-body md:grid-cols-3">
          {[
            { icon: Newspaper, label: "Official desk", value: "Miss & Mrs. Maharashtra" },
            { icon: PlayCircle, label: "Coverage type", value: "Videos, releases, stories" },
            { icon: CalendarDays, label: "Current season", value: "Season 3 updates" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 border-b gold-divider p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <item.icon size={18} className="shrink-0 text-blush-accent" />
              <div>
                <div className="text-[10px] uppercase tracking-[.22em] text-blush-muted">{item.label}</div>
                <div className="mt-1 text-blush-ink">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[.85fr_1fr] lg:items-end">
          <SectionHeader
            eyebrow="Latest news"
            title="Newsroom."
            body="Official updates, contestant stories and stage coverage from the Miss & Mrs. Maharashtra media desk."
          />
          <div className="reveal lg:justify-self-end">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover"
            >
              More videos <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_.95fr]">
          <article className="reveal overflow-hidden border gold-divider bg-[#070607]/82 shadow-2xl shadow-black/20">
            <YouTubePreview
              src={leadNews.src}
              title={leadNews.title}
              feature={leadNews.feature}
              className="aspect-video"
            />
            <div className="p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                <span className="border gold-divider px-3 py-2 text-blush-ink">Featured</span>
                <span>{leadNews.date}</span>
                <span>{leadNews.feature}</span>
              </div>
              <h3 className="font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-none text-blush-ink">{leadNews.title}</h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blush-body">{leadNews.summary}</p>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 bg-blush-accent px-6 py-4 text-xs font-semibold uppercase tracking-[.22em] text-black transition hover:bg-blush-hover"
              >
                Watch update <ExternalLink size={15} />
              </a>
            </div>
          </article>

          <div className="grid gap-4">
            {secondaryNews.map((item) => (
            <article
              key={item.src}
              className="reveal grid gap-0 overflow-hidden border gold-divider bg-[#070607]/78 md:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[190px_1fr]"
            >
              <YouTubePreview
                src={item.src}
                title={item.title}
                feature={item.feature}
                className="aspect-video h-full"
              />
              <div className="flex flex-col justify-between p-5">
                <div>
                  <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.2em] text-blush-accent">
                  <span>{item.date}</span>
                  <span>{item.feature}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-blush-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-blush-body">{item.summary}</p>
                </div>
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.22em] text-blush-accent transition hover:text-blush-hover"
                >
                  Watch <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
          </div>
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeader eyebrow="Coverage" title="Media mentions & official releases." />
        <div className="grid border-t hairline">
          {press.map((item) => (
            <article key={item.head} className="reveal grid gap-4 border-b hairline py-7 md:grid-cols-[180px_1fr_120px] md:items-center">
              <span className="text-xs uppercase tracking-[.2em] text-blush-muted">{item.outlet}</span>
              <strong className="font-display text-2xl font-normal leading-tight text-blush-ink">{item.head}</strong>
              <span className="text-sm text-blush-body md:text-right">{item.date}</span>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Press kit" title="Official media resources." />
        <div className="grid gap-1 bg-blush-ink/10 md:grid-cols-4">
          {pressKit.map((item) => <div key={item.name} className="reveal bg-blush-page p-7"><h3 className="font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm text-blush-body">{item.meta}</p></div>)}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHeader eyebrow="Media accreditation" title="Need passes, assets or an interview?" body="The press desk can coordinate founder interviews, titleholder availability and credited images for editorial coverage." />
      </Section>
    </>
  );
}
