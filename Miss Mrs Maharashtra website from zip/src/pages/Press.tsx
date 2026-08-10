import { gallery, press, pressKit, videos, type PageKey } from "@/data/site";
import { Hero, Section, SectionHeader } from "@/components/Section";
import { YouTubePreview } from "@/components/VideoBento";

export function Press(_: { navigate: (page: PageKey) => void }) {
  return (
    <>
      <Hero eyebrow="Press" title="Media, videos and press kit." body="Broadcast clips, season coverage and the materials journalists need for accurate stories." image={gallery[3]} />
      <Section>
        <SectionHeader eyebrow="Video" title="Season footage." />
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.src} className="reveal">
              <YouTubePreview
                src={video.src}
                title={video.title}
                feature={video.feature}
                className="aspect-video"
              />
              <p className="mt-3 text-sm uppercase tracking-[.2em] text-blush-muted">{video.title}</p>
            </div>
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
