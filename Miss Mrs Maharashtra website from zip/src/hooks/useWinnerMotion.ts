import { useEffect } from "react";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function useWinnerMotion() {
  useEffect(() => {
    let frame = 0;

    const updateShelf = () => {
      frame = 0;
      const shell = document.getElementById("winners-pin");
      const track = document.getElementById("wtrack");
      if (!shell || !track) return;
      const rect = shell.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp01(-rect.top / travel);
      const maxShift = Math.max(0, track.scrollWidth - window.innerWidth + 84);
      track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateShelf);
    };

    const onMove = (event: PointerEvent) => {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const near = Math.abs(dx) < 1.4 && Math.abs(dy) < 1.4;
        card.style.transform = near ? `perspective(900px) rotateY(${dx * 5.5}deg) rotateX(${-dy * 4.5}deg) translateZ(14px)` : "perspective(900px)";
      });
    };

    updateShelf();
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
