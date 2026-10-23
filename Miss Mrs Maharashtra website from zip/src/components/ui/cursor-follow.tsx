import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

interface CursorFollowProps {
  children: React.ReactNode;
  className?: string;
}

const CIRCLE_SIZE = 16;

const CursorFollow: React.FC<CursorFollowProps> = ({ children, className = "" }) => {
  const { x: mouseX, y: mouseY } = useCursorPosition();
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [pendingText, setPendingText] = useState<string | null>(null);
  const [textWidth, setTextWidth] = useState<number>(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 40 });
  const springY = useSpring(y, { stiffness: 350, damping: 40 });

  const bubbleWidth = cursorText ? Math.max(textWidth + 32, 40) : CIRCLE_SIZE;
  const bubbleHeight = cursorText ? 40 : CIRCLE_SIZE;

  useEffect(() => {
    x.set(mouseX - bubbleWidth / 2);
    y.set(mouseY - bubbleHeight / 2);
  }, [mouseX, mouseY, bubbleWidth, bubbleHeight, x, y]);

  useEffect(() => {
    if (pendingText && measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth);
      setCursorText(pendingText);
      setPendingText(null);
    }

    if (!pendingText && !cursorText) {
      setTextWidth(0);
    }
  }, [pendingText, cursorText]);

  const handleMouseOver = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const text = target.getAttribute("data-cursor-text");

    if (text) {
      setPendingText(text);
    }
  };

  const handleMouseOut = () => {
    setCursorText(null);
    setPendingText(null);
  };

  return (
    <div
      className={`relative h-full w-full ${className}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ cursor: "none" }}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.32, ease: "easeInOut" } }}
        className="pointer-events-none fixed z-[95]"
        style={{ left: 0, top: 0, x: springX, y: springY }}
      >
        <motion.div
          layout
          transition={{ duration: 0.32, ease: "easeInOut" }}
          animate={
            cursorText
              ? {
                  width: bubbleWidth,
                  height: 40,
                  borderRadius: 20,
                  background: "#d6ae4f",
                  color: "#061122",
                  paddingLeft: 16,
                  paddingRight: 16,
                  minWidth: 40,
                  minHeight: 32,
                  scale: 1.08,
                }
              : {
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: 999,
                  background: "#d6ae4f",
                  color: "#061122",
                  paddingLeft: 0,
                  paddingRight: 0,
                  minWidth: CIRCLE_SIZE,
                  minHeight: CIRCLE_SIZE,
                  scale: 1,
                }
          }
          className="flex items-center justify-center text-xs font-medium uppercase tracking-[.18em] shadow-lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
          }}
        >
          {cursorText ? (
            <motion.span
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.28, delay: 0.1, ease: "easeInOut" }}
              style={{ whiteSpace: "nowrap", width: "100%", textAlign: "center", color: "#061122" }}
            >
              {cursorText}
            </motion.span>
          ) : null}
        </motion.div>
        {(pendingText || cursorText) && (
          <span
            ref={measureRef}
            style={{
              position: "absolute",
              visibility: "hidden",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
              fontWeight: 500,
              paddingLeft: 16,
              paddingRight: 16,
              fontFamily: "inherit",
            }}
          >
            {pendingText || cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default CursorFollow;
