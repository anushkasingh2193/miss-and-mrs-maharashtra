import { ReactNode, useState } from "react";

type HeroClip = {
  src: string;
  label: string;
  objectPosition?: string;
  poster?: string;
};

interface ScrollExpandMediaProps {
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title: string;
  eyebrow?: string;
  scrollToExpand?: string;
  portrait?: boolean;
  clips?: HeroClip[];
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaSrc,
  posterSrc,
  bgImageSrc: _bgImageSrc,
  title,
  eyebrow,
  scrollToExpand = "Scroll to enter",
  portrait: _portrait = false,
  clips = [],
  children,
}: ScrollExpandMediaProps) {
  const [activeClip, setActiveClip] = useState<HeroClip | null>(null);
  const cornerClips = clips.slice(0, 2);
  const reelClips: HeroClip[] = [
    cornerClips[0],
    { src: mediaSrc, label: scrollToExpand, objectPosition: "50% 30%", poster: posterSrc },
    cornerClips[1],
  ].filter(Boolean) as HeroClip[];

  return (
    <section className="relative overflow-hidden border-y gold-divider bg-[#070607] px-[clamp(20px,4vw,42px)] py-[clamp(38px,5vw,68px)]">
      <div className="relative overflow-hidden py-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(213,168,75,.16),transparent_24%),linear-gradient(180deg,rgba(7,6,7,.98),rgba(16,14,11,.82)_48%,rgba(7,6,7,.98))]" />
        <div className="content-wrap relative z-10">
          <div className="mx-auto mb-7 max-w-3xl text-center text-white">
            {eyebrow ? <div className="eyebrow mb-5 text-blush-accent">{eyebrow}</div> : null}
            <h2 className="font-display text-[clamp(2.8rem,5vw,5.8rem)] leading-[.92] text-white drop-shadow-[0_18px_50px_rgba(0,0,0,.38)]">{title}</h2>
            {children}
          </div>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
            {reelClips.map((clip, index) => (
              <PortraitVideoCard
                key={`${clip.src}-${index}`}
                clip={clip}
                featured={index === 1}
                onOpen={() => setActiveClip(clip)}
              />
            ))}
          </div>
        </div>
      </div>
      {activeClip ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#040404]/88 px-4 py-8 backdrop-blur-sm" onClick={() => setActiveClip(null)}>
          <button
            type="button"
            onClick={() => setActiveClip(null)}
            className="absolute right-5 top-5 border border-blush-accent/35 bg-[#070607] px-4 py-3 text-xs uppercase tracking-[.22em] text-blush-accent transition hover:border-blush-accent focus:outline-none focus:ring-2 focus:ring-blush-accent"
          >
            Close
          </button>
          <div className="w-full max-w-[min(420px,92vw)] border gold-divider bg-[#070607] p-2 shadow-[0_32px_120px_rgba(0,0,0,.62)]" onClick={(event) => event.stopPropagation()}>
            <div className="aspect-[9/16] overflow-hidden bg-black">
              <video
                className="h-full w-full object-cover"
                src={activeClip.src}
                poster={activeClip.poster}
                controls
                autoPlay
                playsInline
                style={{ objectPosition: activeClip.objectPosition || "50% 24%" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PortraitVideoCard({ clip, featured = false, onOpen }: { clip: HeroClip; featured?: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${clip.label} reel`}
      className={`group overflow-hidden border bg-[#070607] p-1.5 text-left shadow-[0_20px_70px_rgba(0,0,0,.32)] transition hover:border-blush-accent focus:outline-none focus:ring-2 focus:ring-blush-accent ${featured ? "border-blush-accent/45 sm:translate-y-6" : "border-blush-accent/25"}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <video
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={clip.src}
          poster={clip.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ objectPosition: clip.objectPosition || "50% 18%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070607]/78 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blush-accent/45 bg-[#040404]/62 text-blush-accent opacity-0 backdrop-blur transition group-hover:opacity-100">
          <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-blush-accent" />
        </span>
        <div className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[.24em] text-blush-accent">{clip.label}</div>
      </div>
    </button>
  );
}
