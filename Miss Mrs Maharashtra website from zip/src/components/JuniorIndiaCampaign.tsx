import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";

const FILM_SRC = "/missmrs-assets/videos/junior-india-home.mp4";
const FILM_POSTER = "/missmrs-assets/videos/junior-india-home-poster.jpg";

export function JuniorIndiaCampaign({ onExplore }: { onExplore: () => void }) {
  const [canParallax, setCanParallax] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const filmY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !canParallax ? [0, 0] : [42, -42],
  );
  const wordmarkY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !canParallax ? [0, 0] : [-22, 22],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !canParallax ? [0, 0] : [8, -16],
  );
  const wordmarkClip = useTransform(
    scrollYProgress,
    [0.04, 0.24],
    ["inset(0 18% 0 0)", "inset(0 0% 0 0)"],
  );
  const filmClip = useTransform(
    scrollYProgress,
    [0.06, 0.27],
    ["inset(0 0 16% 0)", "inset(0 0 0% 0)"],
  );
  const headlineClip = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    ["inset(0 0 22% 0)", "inset(0 0 0% 0)"],
  );

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const syncParallax = () => setCanParallax(query.matches);

    syncParallax();
    query.addEventListener("change", syncParallax);
    return () => query.removeEventListener("change", syncParallax);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || shouldReduceMotion) {
      preview?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void preview.play().catch(() => undefined);
        else preview.pause();
      },
      { threshold: 0.32 },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} data-home-section data-junior-india-campaign className="junior-campaign">
      <div className="junior-campaign__stage">
        <motion.div
          className="junior-campaign__wordmark"
          aria-hidden="true"
          style={{ y: wordmarkY, clipPath: wordmarkClip }}
        >
          JUNIOR INDIA
        </motion.div>
        <div className="junior-campaign__vertical" aria-hidden="true">A NEW GENERATION / A NEW LEGACY</div>

        <div className="junior-campaign__details" aria-label="Junior India official launch film">
          <span>FILM 001</span>
          <span>OFFICIAL LAUNCH</span>
        </div>

        <motion.div className="junior-campaign__message" style={{ y: copyY }}>
          <div className="junior-campaign__event-date">
            <span>Junior India Event</span>
            <time dateTime="2026-11-22">22 November 2026</time>
          </div>
          <motion.h2 style={{ clipPath: headlineClip }}>
            <span>A New Generation.</span>
            <span>A New Legacy.</span>
          </motion.h2>
          <button type="button" onClick={onExplore} className="junior-campaign__cta">
            Explore Junior India <ArrowRight size={16} aria-hidden="true" />
          </button>
        </motion.div>

        <motion.figure
          className="junior-campaign__film"
          style={{ y: filmY, clipPath: filmClip }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.018 }}
        >
          <video
            ref={previewRef}
            data-junior-india-video
            className="junior-campaign__preview"
            poster={FILM_POSTER}
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Junior India official launch film preview"
          >
            <source src={FILM_SRC} type="video/mp4" />
          </video>
          <div className="junior-campaign__film-shade" aria-hidden="true" />
          <figcaption>
            <span>JUNIOR INDIA</span>
            <span>OFFICIAL FILM</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
