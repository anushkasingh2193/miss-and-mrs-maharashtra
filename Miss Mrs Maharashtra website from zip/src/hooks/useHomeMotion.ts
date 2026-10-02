import { useEffect } from "react";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function progressFor(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  return clamp01(-rect.top / travel);
}

export function useHomeMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const hero = document.getElementById("shot1");
      const heroImg = document.getElementById("hero-img");
      const heroCopy = document.getElementById("hero-copy");
      if (hero && heroImg && heroCopy) {
        const rect = hero.getBoundingClientRect();
        const p = clamp01(-rect.top / Math.max(1, window.innerHeight * 0.75));
        heroImg.style.transform = `scale(${1 + p * 0.08}) translateY(${p * 18}px)`;
        heroCopy.style.transform = `translateY(${-p * 34}px)`;
        heroCopy.style.opacity = String(1 - p * 0.85);
      }

      const featuredStage = document.getElementById("featured-stage");
      const featuredBg = document.getElementById("featured-stage-bg");
      const featuredTiles = document.getElementById("featured-stage-tiles");
      const featuredTitle = document.getElementById("featured-stage-title");
      const featuredKicker = document.getElementById("featured-stage-kicker");
      const featuredLine = document.getElementById("featured-stage-line");
      const featuredCaption = document.getElementById("featured-stage-caption");
      if (featuredStage && featuredBg && featuredTitle && featuredKicker && featuredLine && featuredCaption) {
        const p = progressFor(featuredStage);
        const enter = clamp01(p / 0.34);
        const hold = clamp01((p - 0.18) / 0.56);
        const exit = clamp01((p - 0.72) / 0.28);

        featuredBg.style.transform = `scale(${1.12 - hold * 0.08 + exit * 0.04}) translateY(${(-10 + hold * 18) * (window.innerWidth >= 768 ? 1 : 0.45)}px)`;
        featuredBg.style.filter = `saturate(${0.82 + hold * 0.24}) brightness(${0.8 + enter * 0.12 - exit * 0.08})`;
        featuredTitle.style.transform = `translate3d(${(1 - enter) * 34 - exit * 22}vw, ${exit * -18}px, 0) scale(${0.96 + enter * 0.04 - exit * 0.04})`;
        featuredTitle.style.opacity = String(0.18 + enter * 0.82 - exit * 0.42);
        featuredKicker.style.transform = `translateY(${(1 - enter) * 18 - exit * 18}px)`;
        featuredKicker.style.opacity = String(enter * (1 - exit * 0.8));
        featuredLine.style.transform = `scaleX(${enter * (1 - exit * 0.35)})`;
        featuredLine.style.opacity = String(enter * (1 - exit * 0.75));
        featuredCaption.style.transform = `translateY(${(1 - enter) * 24 + exit * 22}px)`;
        featuredCaption.style.opacity = String(clamp01((enter - 0.24) / 0.76) * (1 - exit * 0.9));

        if (featuredTiles) {
          const tileLift = enter * -110;
          featuredTiles.style.transform = `translate3d(0, ${tileLift}%, 0)`;
          featuredTiles.style.opacity = String(1 - enter * 0.92);
          featuredTiles.querySelectorAll<HTMLElement>("[data-feature-tile]").forEach((tile, index) => {
            const direction = index === 1 ? 0 : index === 0 ? -1 : 1;
            tile.style.transform = `translate3d(${direction * enter * 22}px, ${enter * -18}px, 0) scale(${1 + enter * 0.08})`;
          });
        }
      }

      const shot4 = document.getElementById("shot4");
      const shot4Track = document.getElementById("shot4track");
      if (shot4 && shot4Track) {
        shot4Track.style.transform = window.innerWidth >= 1024 ? `translate3d(${-progressFor(shot4) * 50}%, 0, 0)` : "translate3d(0, 0, 0)";
      }

      const shot6 = document.getElementById("shot6");
      const shot6Img = document.getElementById("shot6img");
      if (shot6 && shot6Img) {
        const rect = shot6.getBoundingClientRect();
        const p = clamp01((window.innerHeight - rect.top) / Math.max(1, window.innerHeight * 0.85));
        shot6Img.style.transform = `scale(${1.08 - p * 0.08})`;
        document.querySelectorAll<HTMLElement>("[data-beat]").forEach((beat) => {
          const threshold = Number(beat.dataset.beat || 0) * 0.24 - 0.18;
          const on = p > threshold;
          beat.style.opacity = on ? "1" : "0";
          beat.style.transform = on ? "translateY(0)" : "translateY(22px)";
        });
      }

      const reel = document.getElementById("shotreel");
      const scrub = document.getElementById("scrub-fill");
      if (reel && scrub) {
        scrub.style.height = `${progressFor(reel) * 100}%`;
      }

      const containerScroll = document.getElementById("container-scroll");
      const containerCard = document.getElementById("container-scroll-card");
      if (containerScroll && containerCard) {
        const p = progressFor(containerScroll);
        const scale = 0.86 + p * 0.14;
        const rotate = (1 - p) * 8;
        const y = (1 - p) * 46;
        containerCard.style.transform = `perspective(1200px) translateY(${y}px) rotateX(${rotate}deg) scale(${scale})`;
        containerCard.style.opacity = String(0.72 + p * 0.28);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onMove = (event: PointerEvent) => {
      const spot = document.getElementById("spot");
      if (!spot) return;
      const rect = spot.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      spot.style.opacity = inside ? "1" : "0";
      spot.style.background = `radial-gradient(circle 260px at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, rgba(255,251,250,.34), rgba(255,251,250,.09) 45%, transparent 68%)`;
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
