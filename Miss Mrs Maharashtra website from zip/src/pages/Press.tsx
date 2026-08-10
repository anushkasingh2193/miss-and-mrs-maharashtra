import { ArrowRight, CalendarDays, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { gallery, latestNews, press, pressKit, type PageKey, youtubeChannelUrl } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  const leadNews = latestNews[0];
  const secondaryNews = latestNews.slice(1);

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden border-b gold-divider bg-[#070607] text-white">
        <img
          src={gallery[3]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_26%] opacity-70"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070607] via-[#070607]/52 to-[#070607]/78" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070607] to-transparent" />
        <div className="content-wrap relative z-10 grid min-h-[78vh] gap-10 px-[clamp(20px,4vw,42px)] pb-[clamp(64px,8vw,112px)] pt-32 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5 text-blush-accent">Latest news</div>
            <h1 className="hero-title">Latest news and media coverage.</h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-blush-body">
              Season updates, contestant stories, stage highlights and official coverage from Miss & Mrs. Maharashtra.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#latest-news"
                className="inline-flex items-center gap-3 bg-blush-accent px-7 py-4 text-xs font-semibold uppercase tracking-[.22em] text-black transition hover:bg-blush-hover"
              >
                Read latest <ArrowRight size={16} />
              </a>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border-b border-blush-wash/70 pb-3 text-xs font-semibold uppercase tracking-[.22em] text-blush-wash transition hover:text-blush-accent"
              >
                Open channel <ExternalLink size={15} />
              </a>
            </div>
          </div>
          <a
            href="#latest-news"
            className="group hidden border gold-divider bg-[#070607]/82 p-7 shadow-2xl shadow-black/25 backdrop-blur lg:block"
            aria-label={`Open latest news: ${leadNews.title}`}
          >
            <div className="mb-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
              <span>{leadNews.date}</span>
              <span>{leadNews.feature}</span>
            </div>
            <h2 className="font-display text-4xl leading-tight text-blush-ink">{leadNews.title}</h2>
            <p className="mt-4 text-sm leading-7 text-blush-body">{leadNews.summary}</p>
            <span className="mt-7 inline-flex items-center gap-3 border-t gold-divider pt-5 text-xs font-semibold uppercase tracking-[.22em] text-blush-accent transition group-hover:text-blush-hover">
              View coverage <ArrowRight size={15} />
            </span>
          </a>
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
