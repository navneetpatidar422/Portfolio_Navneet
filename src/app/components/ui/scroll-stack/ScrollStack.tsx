/**
 * ScrollStack — native sticky card stack with smooth scroll-linked motion.
 *
 * Important:
 * - Keeps the original per-card sticky layout because the browser's native
 *   sticky positioning is part of the visual effect.
 * - Smooths only the scroll progress, not the actual page scroll.
 * - Each card's transform is continuous across each card-to-card transition.
 * - No timers, animation callbacks, or scroll-event React state updates.
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`ss-card-inner ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  /** Distance from viewport top where cards pin (px). Default: 100 */
  stickyTop?: number;
  /** Scroll distance per card transition (px). Default: 200 */
  cardGap?: number;
  /** Scale reduction per stacked card layer. Default: 0.035 */
  scaleStep?: number;
  /** Vertical top offset per stacked card layer (px). Default: 16 */
  offsetY?: number;
}

interface ScrollStackCardProps {
  index: number;
  total: number;
  stickyTop: number;
  scaleStep: number;
  offsetY: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  index,
  total,
  stickyTop,
  scaleStep,
  offsetY,
  scrollYProgress,
  children,
}) => {
  /*
   * Each segment represents exactly one card transition.
   *
   * Example with 6 cards:
   *   progress 0.0 -> card 0 active
   *   progress 0.2 -> card 1 active
   *   progress 0.4 -> card 2 active
   *   ...
   *
   * We deliberately keep the same sticky architecture as the working
   * original. The only change is that transform values are driven by a
   * lightly smoothed scroll progress value.
   */
  const segmentCount = Math.max(1, total - 1);
  const segmentSize = 1 / segmentCount;

  const inputPoints: number[] = [];
  const scaleOutput: number[] = [];
  const yOutput: number[] = [];

  /*
   * Before this card becomes active, keep it at its natural sticky position.
   * Once its segment begins, progressively push it backwards/upwards as later
   * cards become active.
   */
  inputPoints.push(0);
  scaleOutput.push(1);
  yOutput.push(0);

  if (index > 0) {
    inputPoints.push(index * segmentSize);
    scaleOutput.push(1);
    yOutput.push(0);
  }

  /*
   * After activation, the card moves continuously through every subsequent
   * stack depth. There is deliberately no separate "final" state that could
   * cause a snap.
   */
  for (let layer = 1; layer <= total - 1 - index; layer++) {
    const progress = clamp(
      (index + layer) * segmentSize,
      0,
      1,
    );

    inputPoints.push(progress);
    scaleOutput.push(
      Math.max(0.72, 1 - layer * scaleStep),
    );
    yOutput.push(-layer * offsetY);
  }

  // Keep arrays strictly increasing and ensure the end of the progress range
  // always has a defined value.
  if (inputPoints[inputPoints.length - 1] < 1) {
    inputPoints.push(1);
    scaleOutput.push(scaleOutput[scaleOutput.length - 1]);
    yOutput.push(yOutput[yOutput.length - 1]);
  }

  const scale = useTransform(
    scrollYProgress,
    inputPoints,
    scaleOutput,
  );

  const y = useTransform(
    scrollYProgress,
    inputPoints,
    yOutput,
  );

  /*
   * The currently active card should remain visually above the other cards.
   * Using a derived MotionValue means no React re-render is required.
   *
   * The active index changes around the middle of a transition, which also
   * makes reverse scrolling deterministic.
   */
  const zIndex = useTransform(scrollYProgress, (progress) => {
    const activeIndex = clamp(
      Math.round(progress * segmentCount),
      0,
      total - 1,
    );

    if (index === activeIndex) return 1000;

    // Cards immediately around the active card still need predictable order.
    return index < activeIndex
      ? 600 - index
      : 500 - index;
  });

  const pointerEvents = useTransform(scrollYProgress, (progress) => {
    const activeIndex = clamp(
      Math.round(progress * segmentCount),
      0,
      total - 1,
    );

    return index === activeIndex ? 'auto' : 'none';
  });

  return (
    <motion.div
      className="ss-card-sticky"
      style={{
        zIndex,
        scale,
        y,
        top: `${stickyTop}px`,
        transformOrigin: 'top center',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        pointerEvents,
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stickyTop = 100,
  cardGap = 200,
  scaleStep = 0.035,
  offsetY = 16,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();

    const mediaQuery = window.matchMedia('(max-width: 639px)');

    const handleChange = () => checkMobile();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const activeScaleStep = isMobile
    ? Math.min(scaleStep, 0.025)
    : scaleStep;

  const activeOffsetY = isMobile
    ? Math.min(offsetY, 12)
    : offsetY;

  /*
   * Keep the original scroll geometry.
   *
   * Every non-last card gets:
   *     viewport height - sticky top + cardGap
   *
   * so native sticky positioning provides the natural movement toward the
   * next card while the MotionValue only handles the stack transformation.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${stickyTop}px`, 'end end'],
  });

  /*
   * A very stiff spring removes tiny wheel/trackpad discontinuities without
   * making the animation feel delayed. The page itself still uses native
   * scrolling; only the visual transform is smoothed.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 900,
    damping: 100,
    mass: 0.15,
    restDelta: 0.0005,
    restSpeed: 0.0005,
  });

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`ss-container ${className}`.trim()}
      style={{
        paddingTop: `${(total - 1) * activeOffsetY}px`,
      }}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="ss-card-wrapper"
          style={{
            height:
              index === total - 1
                ? 'auto'
                : `calc(100vh - ${stickyTop}px + ${cardGap}px)`,
          }}
        >
          <ScrollStackCard
            index={index}
            total={total}
            stickyTop={stickyTop}
            scaleStep={activeScaleStep}
            offsetY={activeOffsetY}
            scrollYProgress={smoothProgress}
          >
            {child}
          </ScrollStackCard>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;