"use client";

import React, { useId } from "react";
import { motion, useTime, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface SquigglyTextProps {
  /**
   * The text (or any node) to wrap with the squiggly effect.
   */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Number of distinct displacement frames to cycle through.
   * Higher = smoother wobble, more SVG filters in the DOM.
   * @default 5
   */
  steps?: number;
  /**
   * Time between filter swaps, in milliseconds.
   * Lower = more frantic; higher = lazier wave.
   * @default 80
   */
  stepDuration?: number;
  /**
   * Maximum displacement in px. Bigger = more squiggly.
   * Pass a single number for a constant scale, or a tuple to alternate
   * between two values per step (matches the original Lucas Bebber demo).
   * @default [6, 8]
   */
  scale?: number | [number, number];
  /**
   * Turbulence base frequency. Lower values produce longer, smoother waves;
   * higher values produce tighter, jitterier noise.
   * @default 0.02
   */
  baseFrequency?: number;
  /**
   * Number of turbulence octaves. Higher = more detailed noise.
   * @default 3
   */
  numOctaves?: number;
  /**
   * Render the wrapper as this element type.
   * @default "span"
   */
  as?: "span" | "div";
  /**
   * Apply a dark/selected text marker box background (like hand-cut tape / selection highlight).
   */
  selected?: boolean;
}

export function SquigglyText({
  children,
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,
  as = "span",
  selected = false,
  className,
  style,
}: SquigglyTextProps) {
  const reactId = useId();
  // useId can produce ":" / "_" which aren't valid in CSS url(#…) refs.
  const safeId = reactId.replace(/[:_]/g, "");
  const filterId = (i: number) => `squiggly-${safeId}-${i}`;

  const filters = React.useMemo(
    () => Array.from({ length: steps }, (_, i) => `url(#${filterId(i)})`),
    // filterId is stable per render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [steps, safeId],
  );

  const time = useTime();
  const filter = useTransform(
    time,
    (t) => filters[Math.floor(t / stepDuration) % filters.length],
  );

  const scaleAt = (i: number) =>
    Array.isArray(scale) ? scale[i % scale.length] : scale;

  const Wrapper = as === "div" ? motion.div : motion.span;

  return (
    <Wrapper
      style={{ filter, ...style }}
      className={cn(
        "inline-block",
        selected && "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 px-2.5 sm:px-3 py-0.5 md:py-1 rounded-sm shadow-md mx-1 my-0.5 align-middle select-none",
        className
      )}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {Array.from({ length: steps }).map((_, i) => (
            <filter id={filterId(i)} key={i}>
              <feTurbulence
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                result="noise"
                seed={i}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scaleAt(i)}
              />
            </filter>
          ))}
        </defs>
      </svg>
      {children}
    </Wrapper>
  );
}
