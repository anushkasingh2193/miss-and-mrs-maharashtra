import { ArrowRight, ExternalLink } from "lucide-react";
import { gallery, latestNews, press, pressKit, type PageKey, youtubeChannelUrl } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  const leadNews = latestNews[0];

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
            className="group hidden border gold-divider bg-[#070607]/76 p-6 backdrop-blur lg:block"
            aria-label={`Open latest news: ${leadNews.title}`}
          >
            <div className="mb-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
              <span>{leadNews.date}</span>
              <span>{leadNews.feature}</span>
            </div>
            <h2 className="font-display text-4xl leading-tight text-blush-ink">{leadNews.title}</h2>
            <p className="mt-4 text-sm leading-7 text-blush-body">{leadNews.summary}</p>
            <span className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-blush-accent transition group-hover:text-blush-hover">
              View coverage <ArrowRight size={15} />
            </span>
          </a>
        </div>
      </section>

      <Section id="latest-news" className="cinematic-band gold-lift text-white">
        <div className="mb-12 grid gap-8 lg:grid-cols-[.85fr_1fr] lg:items-end">
          <SectionHeader
            eyebrow="Latest news"
            title="News from the season."
            body="Video-led updates, contestant stories and pageant coverage from the Miss & Mrs. Maharashtra media desk."
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

        <div className="grid gap-5 lg:grid-cols-4">
          {latestNews.map((item, index) => (
            <article
              key={item.src}
              className={
                index === 0
                  ? "reveal grid gap-0 overflow-hidden border gold-divider bg-[#070607]/76 lg:col-span-2 lg:row-span-2"
                  : "reveal overflow-hidden border gold-divider bg-[#070607]/76"
              }
            >
              <YouTubePreview
                src={item.src}
                title={item.title}
                feature={item.feature}
                className={index === 0 ? "aspect-video lg:aspect-[16/10]" : "aspect-video"}
              />
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                  <span>{item.date}</span>
                  <span>{item.feature}</span>
                </div>
                <h3 className="font-display text-3xl leading-tight text-blush-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-blush-body">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeader eyebrow="Coverage" title="Press list." />
        {press.map((item) => (
          <div key={item.head} className="reveal grid gap-5 border-t hairline py-7 md:grid-cols-[150px_1fr_120px]">
            <span className="text-blush-muted">{item.outlet}</span><strong>{item.head}</strong><span>{item.date}</span>
          </div>
        ))}
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
