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
