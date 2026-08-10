import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [3, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : isMobile ? [0.94, 0.99] : [0.97, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -12]);

  return (
    <div ref={containerRef} className="relative flex min-h-[660px] items-center justify-center overflow-hidden bg-transparent px-4 py-8 md:min-h-[760px] md:px-10">
      <div className="relative w-full" style={{ perspective: "1200px" }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, children }: { translate: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 38px 120px rgba(0,0,0,.42), 0 0 0 1px rgba(214,174,79,.18)",
      }}
      className="mx-auto mt-6 w-full overflow-hidden border border-blush-accent/25 bg-[#040404] p-1 shadow-2xl md:w-[75vw] md:max-w-[980px] md:p-2"
    >
      <div className="w-full overflow-hidden border border-blush-accent/15 bg-[#040404]">
        {children}
      </div>
    </motion.div>
  );
}
