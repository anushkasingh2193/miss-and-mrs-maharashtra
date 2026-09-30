import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { videos, youtubeChannelUrl } from "@/data/site";
import { cn } from "@/lib/utils";

export function YouTubePreview({ src, title, feature, className = "" }: { src: string; title: string; feature?: string; className?: string }) {
  const [active, setActive] = useState(false);
  const id = getYoutubeId(src);
  const thumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  const embedSrc = id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : src;

  return (
    <div className={cn("group relative overflow-hidden border gold-divider bg-[#020817]", className)}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedSrc}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-accent"
          aria-label={`Play ${title}`}
        >
          {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105 group-hover:opacity-100" loading="lazy" decoding="async" /> : null}
          <span className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/28 to-[#020817]/20" />
          <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-full border border-blush-accent/55 bg-[#020817]/72 text-blush-accent backdrop-blur">
            <Play size={17} fill="currentColor" />
          </span>
        </button>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061122]/92 to-transparent p-5 text-white transition duration-300 group-hover:opacity-100">
        {feature ? (
          <div className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.24em] text-blush-accent">
            <Play size={12} /> {feature}
          </div>
        ) : null}
        <h3 className="font-display text-2xl leading-tight">{title}</h3>
      </div>
    </div>
  );
}

function getYoutubeId(src: string) {
  const match = src.match(/embed\/([^?]+)/);
  return match?.[1] || "";
}

export function VideoBento() {
  return (
    <section className="cinematic-band section-pad gold-lift">
      <div className="content-wrap">
        <div className="mb-12 grid gap-8 lg:grid-cols-[.85fr_1fr] lg:items-end">
          <div className="reveal">
            <div className="eyebrow mb-5">Latest news</div>
            <h2 className="display-title">Watch the crown come alive.</h2>
          </div>
          <div className="reveal lg:justify-self-end">
            <p className="max-w-xl text-lg font-light leading-8 text-blush-body">
              Embedded coverage from the Miss & Mrs. Maharashtra channel:
              stage moments, contestant stories, backstage energy and
              coronation highlights.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 border-b border-blush-accent pb-2 text-xs uppercase tracking-[.24em] text-blush-accent"
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open channel <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="grid auto-rows-[260px] gap-5 lg:grid-cols-4">
          {videos.map((video, index) => (
            <YouTubePreview
              key={video.src}
              src={video.src}
              title={video.title}
              feature={video.feature}
              className={cn(
                "reveal shadow-[0_24px_80px_rgba(0,0,0,.28)]",
                index === 0 && "lg:col-span-2 lg:row-span-2",
                index === 1 && "lg:col-span-2",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
