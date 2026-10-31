import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play, X } from "lucide-react";

const FILM_SRC = "/missmrs-assets/videos/junior-india-home.mp4";
const FILM_POSTER = "/missmrs-assets/videos/junior-india-home-poster.jpg";

export function JuniorIndiaCampaign({ onExplore }: { onExplore: () => void }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || shouldReduceMotion) {
      preview?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPlayerOpen) void preview.play().catch(() => undefined);
        else preview.pause();
      },
      { threshold: 0.32 },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, [isPlayerOpen, shouldReduceMotion]);

  useEffect(() => {
    if (!isPlayerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previewRef.current?.pause();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPlayerOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      playButtonRef.current?.focus();
    };
  }, [isPlayerOpen]);

  return (
    <section data-home-section data-junior-india-campaign className="junior-campaign">
      <div className="junior-campaign__stage">
        <div className="junior-campaign__wordmark" aria-hidden="true">JUNIOR INDIA</div>
        <div className="junior-campaign__vertical" aria-hidden="true">A NEW GENERATION / A NEW LEGACY</div>

        <div className="junior-campaign__details" aria-label="Junior India official launch film">
          <span>FILM 001</span>
          <span>OFFICIAL LAUNCH</span>
        </div>

        <div className="junior-campaign__message">
          <h2>
            <span>A New Generation.</span>
            <span>A New Legacy.</span>
          </h2>
          <button type="button" onClick={onExplore} className="junior-campaign__cta">
            Explore Junior India <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <motion.figure
          className="junior-campaign__film"
          initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
          whileInView={shouldReduceMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
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
          <button
            ref={playButtonRef}
            type="button"
            className="junior-campaign__play"
            aria-label="Play the Junior India launch film"
            onClick={() => setIsPlayerOpen(true)}
          >
            <Play size={25} fill="currentColor" aria-hidden="true" />
          </button>
          <figcaption>
            <span>JUNIOR INDIA</span>
            <span>OFFICIAL FILM</span>
          </figcaption>
        </motion.figure>
      </div>

      <AnimatePresence>
        {isPlayerOpen ? (
          <motion.div
            className="junior-film-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Junior India official launch film"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) setIsPlayerOpen(false);
            }}
          >
            <motion.div
              className="junior-film-dialog__frame"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="junior-film-dialog__meta" aria-hidden="true">
                <span>FILM 001</span>
                <span>JUNIOR INDIA / OFFICIAL LAUNCH</span>
              </div>
              <video
                className="junior-film-dialog__video"
                poster={FILM_POSTER}
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                <source src={FILM_SRC} type="video/mp4" />
              </video>
              <button
                ref={closeButtonRef}
                type="button"
                className="junior-film-dialog__close"
                aria-label="Close the Junior India launch film"
                onClick={() => setIsPlayerOpen(false)}
              >
                <X size={24} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
