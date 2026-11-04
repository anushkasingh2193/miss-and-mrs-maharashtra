import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

const REVEAL_FILM = "/missmrs-assets/videos/season-4-reveal.mp4";
const REVEAL_POSTER = "/missmrs-assets/videos/season-4-reveal-poster.jpg";

type RevealPlaybackTarget = Pick<HTMLVideoElement, "pause" | "play">;

export function syncRevealPlayback(video: RevealPlaybackTarget, shouldPlay: boolean) {
  if (!shouldPlay) {
    video.pause();
    return Promise.resolve();
  }

  return video.play().catch(() => undefined);
}

type SeasonFourRevealContentProps = {
  onRegister: () => void;
  shouldReduceMotion: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  isVideoReady?: boolean;
};

export function SeasonFourRevealContent({
  onRegister,
  shouldReduceMotion,
  videoRef,
  isVideoReady = true,
}: SeasonFourRevealContentProps) {
  return (
    <section
      className="season-four-reveal"
      data-home-section
      data-season-four-reveal
      aria-labelledby="season-four-reveal-title"
    >
      <div className="season-four-reveal__stage">
        <div className="season-four-reveal__intro">
          <p className="season-four-reveal__eyebrow">Season 4 Reveal</p>
          <h2 id="season-four-reveal-title">The crown returns to Nagpur.</h2>
          <p className="season-four-reveal__summary">
            Three days. One stage. A new chapter begins.
          </p>
          <button
            type="button"
            className="season-four-reveal__cta"
            data-season-four-register="true"
            onClick={onRegister}
          >
            Register for Season 4
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <figure className="season-four-reveal__film">
          <div className="season-four-reveal__film-meta" aria-hidden="true">
            <span>Official Reel</span>
            <span>Nagpur Reveal</span>
          </div>
          <div className="season-four-reveal__film-frame">
            <video
              ref={videoRef}
              className="season-four-reveal__video"
              poster={REVEAL_POSTER}
              autoPlay={isVideoReady && !shouldReduceMotion}
              controls={shouldReduceMotion}
              muted
              loop
              playsInline
              preload="none"
              aria-label="Season 4 Nagpur venue and dates reveal"
            >
              {isVideoReady ? <source src={REVEAL_FILM} type="video/mp4" /> : null}
            </video>
          </div>
          <figcaption>
            Season 4 Reveal — 21st, 22nd &amp; 23rd November 2026
          </figcaption>
        </figure>

        <aside className="season-four-reveal__facts" aria-label="Season 4 event details">
          <div className="season-four-reveal__fact-card">
            <p className="season-four-reveal__fact-label">Dates</p>
            <p className="season-four-reveal__fact-value">21st, 22nd &amp; 23rd November 2026</p>
          </div>
          <div className="season-four-reveal__fact-card">
            <p className="season-four-reveal__fact-label">Venue</p>
            <address className="season-four-reveal__fact-value">BTP Farms And Resorts, Nagpur</address>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function SeasonFourReveal({ onRegister }: { onRegister: () => void }) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVideoReady(true);
        else void syncRevealPlayback(video, false);
      },
      { rootMargin: "360px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      void syncRevealPlayback(video, false);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    video.load();
    void syncRevealPlayback(video, !shouldReduceMotion);
  }, [isVideoReady, shouldReduceMotion]);

  return (
    <SeasonFourRevealContent
      onRegister={onRegister}
      shouldReduceMotion={shouldReduceMotion}
      videoRef={videoRef}
      isVideoReady={isVideoReady}
    />
  );
}
