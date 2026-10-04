import { homepageWinnerSlider, videos } from "@/data/site";
import { ArrowRight, Play } from "lucide-react";

const sliderItems = [...homepageWinnerSlider, ...homepageWinnerSlider];
const featuredVideos = videos.slice(0, 4);

export default function ImageGallery({ onViewGallery }: { onViewGallery?: () => void }) {
  return (
    <section className="winner-marquee-section w-full px-[clamp(20px,4vw,42px)] py-[clamp(72px,8vw,118px)]">
      <div className="content-wrap">
        <div className="winner-marquee-header">
          <div>
            <div className="eyebrow mb-4">Winners</div>
            <h2 className="font-display text-[clamp(3rem,6vw,7rem)] leading-[.88] text-blush-ink">
              The titleholders in motion.
            </h2>
          </div>
          <div className="winner-marquee-copy">
            <p>
              A continuous winner slider inspired by the official archive, pairing titleholder portraits
              with names, placements and category details.
            </p>
            <button type="button" onClick={onViewGallery} className="winner-inline-link">
              View full gallery <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="winner-slider-frame mt-12" aria-label="Winner titleholder slider">
        <div className="winner-slider-track">
          {sliderItems.map((winner, index) => (
            <article className="winner-slider-card" key={`${winner.name}-${index}`}>
              <div className="winner-slider-image">
                <img src={winner.image} alt={`${winner.name} ${winner.place}`} loading="lazy" decoding="async" />
              </div>
              <div className="winner-slider-caption">
                <span>{winner.place}</span>
                <h3>{winner.name}</h3>
                <p>{winner.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="content-wrap mt-14">
        <div className="winner-video-panel">
          <div className="winner-video-intro">
            <div className="eyebrow mb-3">Video coverage</div>
            <h3 className="font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-none text-blush-ink">
              Watch the pageant moments.
            </h3>
            <p className="mt-4 text-sm leading-7 text-blush-body">
              Embedded from the official reference site: stage coverage, contestant moments,
              application stories and season highlights.
            </p>
          </div>
          <div className="winner-video-grid">
            {featuredVideos.map((video) => (
              <article className="winner-video-card" key={video.src}>
                <iframe
                  src={`${video.src}${video.src.includes("?") ? "&" : "?"}rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="winner-video-caption">
                  <span><Play size={12} /> {video.feature}</span>
                  <h4>{video.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
