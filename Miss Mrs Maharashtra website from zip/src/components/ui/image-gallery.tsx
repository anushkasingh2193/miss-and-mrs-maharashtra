import { useState } from "react";
import { homepageWinnerSlider, videos } from "@/data/site";
import { ArrowRight, Play } from "lucide-react";
import { YouTubePreview } from "@/components/VideoBento";

const featuredVideos = videos.slice(0, 4);

export default function ImageGallery({ onViewGallery }: { onViewGallery?: () => void }) {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <section className="winner-marquee-section w-full px-[clamp(20px,4vw,42px)] py-[clamp(72px,8vw,118px)]">
      <div className="content-wrap">
        <div className="winner-marquee-header">
          <div>
            <div className="eyebrow mb-4">Winners</div>
            <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] text-blush-ink">Proof that the pathway creates titleholders.</h2>
          </div>
          <div className="winner-marquee-copy">
            <p>Past winners make the promise visible: a structured season becomes a public identity, professional portfolio and crown story.</p>
            <button type="button" onClick={onViewGallery} className="winner-inline-link">Meet the winners <ArrowRight size={15} /></button>
          </div>
        </div>

      </div>

      <div className="winner-slider-frame mt-10" role="region" aria-label="Winner titleholder gallery" tabIndex={0}>
        <div className="winner-slider-track">
          {homepageWinnerSlider.map((winner) => <WinnerCard key={winner.name} winner={winner} />)}
          <div className="contents" aria-hidden="true">
            {homepageWinnerSlider.map((winner) => <WinnerCard key={`duplicate-${winner.name}`} winner={winner} />)}
          </div>
        </div>
      </div>

      <div className="content-wrap mt-14">
        <div className="winner-video-panel">
          <div className="winner-video-intro">
            <div className="eyebrow mb-3">Video coverage</div>
            <h3 className="font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-none text-blush-ink">Watch the stage before you enter it.</h3>
            <p className="mt-4 text-sm leading-7 text-blush-body">Choose a film, then press play. The YouTube player loads only when you ask for it.</p>
          </div>
          <div className="winner-video-feature">
            <YouTubePreview key={featuredVideos[activeVideo].src} {...featuredVideos[activeVideo]} className="aspect-video" />
            <div className="winner-video-thumbs" aria-label="Choose a pageant film">
              {featuredVideos.map((video, index) => (
                <button key={video.src} type="button" onClick={() => setActiveVideo(index)} aria-pressed={activeVideo === index} className="winner-video-thumb">
                  <img src={youtubeThumbnail(video.src)} alt="" loading="lazy" decoding="async" />
                  <span><Play size={11} /> {video.feature}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WinnerCard({ winner }: { winner: (typeof homepageWinnerSlider)[number] }) {
  return (
    <article className="winner-slider-card">
      <div className="winner-slider-image"><img src={winner.image} alt={`${winner.name}, ${winner.title}`} loading="lazy" decoding="async" /></div>
      <div className="winner-slider-caption"><span>{winner.place}</span><h3>{winner.name}</h3><p>{winner.title}</p></div>
    </article>
  );
}

function youtubeThumbnail(src: string) {
  const id = src.match(/embed\/([^?]+)/)?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}
