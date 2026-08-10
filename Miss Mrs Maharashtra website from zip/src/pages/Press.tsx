import { ExternalLink } from "lucide-react";
import { gallery, latestNews, press, pressKit, type PageKey, youtubeChannelUrl } from "@/data/site";
import { Hero, Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  return (
    <>
      <Hero eyebrow="Press" title="Media, videos and press kit." body="Broadcast clips, season coverage and the materials journalists need for accurate stories." image={gallery[3]} />
      <Section className="cinematic-band gold-lift text-white">
        <div className="mb-12 grid gap-8 lg:grid-cols-[.85fr_1fr] lg:items-end">
          <SectionHeader
            eyebrow="Latest news"
            title="Coverage from the season."
            body="Video-led updates, contestant stories and pageant coverage from the Miss & Mrs. Maharashtra media desk."
          />
          <div className="reveal lg:justify-self-end">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent transition hover:text-blush-hover"
            >
              Open channel <ExternalLink size={14} />
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
