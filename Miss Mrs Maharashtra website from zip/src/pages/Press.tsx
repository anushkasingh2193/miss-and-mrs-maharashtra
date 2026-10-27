import { ArrowRight, CalendarDays, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { latestNews, newsroomArticles, press, pressKit, type PageKey, youtubeChannelUrl } from "@/data/site";
import { Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  const leadNews = latestNews[0];
  const secondaryNews = latestNews.slice(1);
  const leadVideoId = leadNews.src.match(/embed\/([^?]+)/)?.[1];
  const leadVideoUrl = leadVideoId ? `https://www.youtube.com/watch?v=${leadVideoId}` : youtubeChannelUrl;

  return (
    <>
      <section data-press-hero="editorial" className="overflow-hidden border-b gold-divider bg-[#061122] text-white">
        <div className="grid lg:min-h-[clamp(620px,78svh,760px)] lg:grid-cols-[.78fr_1.22fr]">
          <div className="relative flex min-h-[500px] items-end border-b gold-divider px-[clamp(24px,5vw,84px)] pb-[clamp(48px,7vw,84px)] pt-[clamp(128px,15vw,168px)] lg:min-h-0 lg:border-b-0 lg:border-r">
            <div className="max-w-xl">
              <div className="eyebrow mb-6 text-blush-accent">Official newsroom</div>
              <h1 className="font-display text-[clamp(4rem,7vw,6.8rem)] leading-[.9] text-blush-ink">
                Newsroom.
              </h1>
              <p className="mt-7 max-w-lg text-[17px] font-light leading-8 text-blush-body">
                Official announcements, contestant stories and verified coverage from the Maharashtra stage.
              </p>
              <div className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <a
                  href="#latest-news"
                  className="inline-flex items-center gap-3 bg-blush-accent px-6 py-4 text-xs font-semibold uppercase tracking-[.2em] text-black transition hover:bg-blush-hover"
                >
                  Read latest updates <ArrowRight size={16} />
                </a>
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b border-blush-wash/35 pb-2 text-xs font-semibold uppercase tracking-[.2em] text-blush-wash transition hover:border-blush-accent hover:text-blush-accent"
                >
                  YouTube channel <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          <figure className="grid min-h-[600px] grid-rows-[1fr_auto] bg-[#020817] lg:min-h-0">
            <a
              href={leadVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block min-h-[390px] overflow-hidden bg-[#07152b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blush-accent lg:min-h-0"
              aria-label={`Watch ${leadNews.title}`}
            >
              <img
                src="/missmrs-assets/featured/newsroom-titleholders-cutout.png"
                alt="Miss and Mrs. Maharashtra titleholders on the finale runway"
                className="h-full w-full object-contain object-bottom px-[clamp(10px,2vw,28px)] pt-16 transition duration-700 group-hover:scale-[1.015]"
                loading="eager"
                decoding="async"
              />
              <span className="absolute left-6 top-6 grid size-14 place-items-center rounded-full border border-blush-accent/70 bg-[#061122]/90 text-blush-accent sm:left-8 sm:top-8">
                <PlayCircle size={23} />
              </span>
              <span className="absolute right-6 top-7 border-b border-blush-accent/60 pb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-blush-wash sm:right-8 sm:top-9">
                Watch coverage
              </span>
            </a>
            <figcaption className="border-t gold-divider bg-[#04101f] px-[clamp(24px,4vw,56px)] py-[clamp(28px,4vw,44px)]">
              <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                <span>Featured story</span>
                <span aria-hidden="true">/</span>
                <span>{leadNews.date}</span>
                <span aria-hidden="true">/</span>
                <span>{leadNews.feature}</span>
              </div>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,4vw,4rem)] leading-[.98] text-blush-ink">
                {leadNews.title}
              </h2>
            </figcaption>
          </figure>
        </div>
      </section>

      <Section id="latest-news" className="cinematic-band gold-lift text-white">
        <div className="reveal mb-10 grid border gold-divider bg-[#061122]/78 text-sm text-blush-body md:grid-cols-3">
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
            title="The official season newsroom."
            body="Use this space for announcements, contestant features, video coverage, press references and verified pageant updates."
          />
          <div className="reveal lg:justify-self-end">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover"
            >
              Open YouTube channel <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_.95fr]">
          <article className="reveal overflow-hidden border gold-divider bg-[#061122]/82 shadow-2xl shadow-black/20">
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
                Watch full update <ExternalLink size={15} />
              </a>
            </div>
          </article>

          <div className="grid gap-4">
            {secondaryNews.map((item) => (
            <article
              key={item.src}
              className="reveal grid gap-0 overflow-hidden border gold-divider bg-[#061122]/78 md:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[190px_1fr]"
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
                  Watch story <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
          </div>
        </div>
      </Section>
      <Section className="newsroom-band">
        <SectionHeader
          eyebrow="Editorial desk"
          title="Articles, announcements and contestant stories."
          body="A newsroom should be easy to scan even before a visitor watches video coverage. These briefs give partners, applicants and media teams clear written updates."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {newsroomArticles.map((article) => (
            <article key={article.title} className="news-article-card reveal">
              <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[.22em] text-blush-accent">
                <span>{article.type}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-blush-ink">{article.title}</h3>
              <p className="mt-4 text-sm leading-7 text-blush-body">{article.summary}</p>
            </article>
          ))}
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
        <SectionHeader eyebrow="Press kit" title="Official media resources." body="Brand assets, founder details, images and season facts for journalists, partners and coverage teams." />
        <div className="grid gap-1 bg-blush-ink/10 md:grid-cols-4">
          {pressKit.map((item) => <div key={item.name} className="reveal bg-blush-page p-7"><h3 className="font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm text-blush-body">{item.meta}</p></div>)}
        </div>
      </Section>
      <Section tone="dark">
        <SectionHeader eyebrow="Media accreditation" title="Need passes, assets or an interview?" body="The press desk can coordinate founder interviews, titleholder availability, credited images and finale access for editorial coverage." />
      </Section>
    </>
  );
}
