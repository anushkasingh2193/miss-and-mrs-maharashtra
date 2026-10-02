import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function useLuxuryHoverMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const resetCard = (card: HTMLElement) => {
      card.style.setProperty("--hover-x", "0px");
      card.style.setProperty("--hover-y", "0px");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".luxury-hover-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      const y = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);

      card.style.setProperty("--hover-x", `${-x * 18}px`);
      card.style.setProperty("--hover-y", `${-y * 18}px`);
      card.style.setProperty("--tilt-x", `${-y * 3.2}deg`);
      card.style.setProperty("--tilt-y", `${x * 3.2}deg`);
    };

    const onPointerOut = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".luxury-hover-card");
      if (!card) return;
      const related = event.relatedTarget as Node | null;
      if (related && card.contains(related)) return;
      resetCard(card);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);
}
