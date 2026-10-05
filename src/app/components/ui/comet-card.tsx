"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 14,
  translateDepth = 0,
  scale = 1,
  glare = true,
  floatingShadow = false,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  scale?: number;
  glare?: boolean;
  floatingShadow?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 350 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsHovered(true);

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("perspective-distant [perspective:1000px] transform-3d", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          ...(translateDepth > 0 ? { translateX, translateY } : {}),
          transformStyle: "preserve-3d",
          ...(floatingShadow
            ? {
                boxShadow:
                  "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
              }
            : {}),
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: scale,
          transition: { duration: 0.15 },
        }}
        className="relative rounded-2xl w-full h-full"
      >
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay transition-opacity duration-200"
            style={{
              background: glareBackground,
              opacity: isHovered ? 0.35 : 0,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
