import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";
const fallbackImages = [
  "/missmrs-assets/featured/title-miss-maharashtra.jpg",
  "/missmrs-assets/featured/title-mrs-maharashtra.jpg",
  "/missmrs-assets/featured/titleholder-spotlight.jpg",
  "/missmrs-assets/curated/sneha-kalbhor.jpg",
  "/missmrs-assets/curated/apoorva-shirbhate.jpg",
  "/missmrs-assets/curated/archana-kamble.jpg",
  "/missmrs-assets/fast/zoya.jpg",
  "/missmrs-assets/website-zip-portrait/MIS/s3 winners/TS102120.jpg",
  "/missmrs-assets/website-zip-portrait/MIS/s3 winners/TS102092.jpg",
];

const uniqueImages = (imageList: string[]) => {
  const seen = new Set<string>();

  return imageList.filter((image) => {
    const normalized = decodeURI(image).trim().toLowerCase();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
};

function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (mediaQuery: string): boolean => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(mediaQuery).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches(query));
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

const transition = { duration: 0.18, ease: [0.32, 0.72, 0, 1] as const };
const transitionOverlay = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

const Carousel = memo(function Carousel({
  handleClick,
  cards,
  isCarouselActive,
}: {
  handleClick: (imgUrl: string, index: number) => void;
  cards: string[];
  isCarouselActive: boolean;
}) {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const faceCount = cards.length;
  const faceWidth = isScreenSizeSm ? 150 : 245;
  const faceHeight = isScreenSizeSm ? 225 : 370;
  const cylinderWidth = faceWidth * faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  useEffect(() => {
    if (!isCarouselActive) return;

    let frame = 0;
    let previous = performance.now();

    const spin = (now: number) => {
      const delta = now - previous;
      previous = now;
      rotation.set(rotation.get() - delta * 0.006);
      frame = requestAnimationFrame(spin);
    };

    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, [isCarouselActive, rotation]);

  return (
    <div
      className="flex h-full items-center justify-center bg-[#070607]"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            width: cylinderWidth,
            height: faceHeight,
            transformStyle: "preserve-3d",
          }}
        onDrag={(_, info) => {
          if (isCarouselActive) rotation.set(rotation.get() + info.delta.x * 0.18);
        }}
        onDragEnd={(_, info) => {
          if (!isCarouselActive) return;
          rotation.set(rotation.get() + info.velocity.x * 0.015);
        }}
      >
        {cards.map((imgUrl, i) => (
          <motion.button
            type="button"
            key={`${imgUrl}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center bg-[#070607] p-2"
            style={{
              width: `${faceWidth}px`,
              height: `${faceHeight}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(imgUrl, i)}
          >
            <motion.img
              src={encodeURI(imgUrl)}
              alt={`Winner portrait ${i + 1}`}
              layoutId={`carousel-img-${i}`}
              className="pointer-events-none h-full w-full border border-blush-accent/25 object-cover shadow-[0_20px_70px_rgba(0,0,0,.45)]"
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={transition}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
});

function ThreeDPhotoCarousel({ images }: { images?: string[] }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const cards = useMemo(() => uniqueImages(images?.length ? images : fallbackImages).slice(0, 10), [images]);

  const handleClick = (imgUrl: string, index: number) => {
    setActiveImg(imgUrl);
    setActiveIndex(index);
    setIsCarouselActive(false);
  };

  const handleClose = () => {
    setActiveImg(null);
    setActiveIndex(null);
    setIsCarouselActive(true);
  };

  if (isMobile) {
    return (
      <div className="border-y border-blush-accent/20 bg-[#070607] p-4">
        <div className="grid grid-cols-2 gap-3">
          {cards.slice(0, 6).map((imgUrl, index) => (
            <button
              key={`${imgUrl}-${index}`}
              type="button"
              onClick={() => handleClick(imgUrl, index)}
              className="aspect-[3/4] overflow-hidden border border-blush-accent/20 bg-[#040404]"
            >
              <img src={encodeURI(imgUrl)} alt={`Winner portrait ${index + 1}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        {activeImg ? (
          <div className="fixed inset-0 z-[90] grid place-items-center bg-[#070607]/95 p-5" onClick={handleClose}>
            <img src={encodeURI(activeImg)} alt="Selected winner portrait" className="max-h-full max-w-full object-contain" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && activeIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#070607]/92 p-5"
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`carousel-img-${activeIndex}`}
              src={encodeURI(activeImg)}
              className="max-h-full max-w-full border border-blush-accent/35 object-contain shadow-[0_30px_120px_rgba(0,0,0,.55)]"
              initial={{ scale: 0.86 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="relative h-[560px] w-full overflow-hidden border-y border-blush-accent/20 bg-[#070607] max-sm:h-[390px]">
        <Carousel
          handleClick={handleClick}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
