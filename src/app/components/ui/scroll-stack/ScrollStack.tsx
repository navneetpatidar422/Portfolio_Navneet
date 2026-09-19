/**
 * ScrollStack — stacked deck card animation driven by motion scroll progress.
 *
 * Cards pin at `stickyTop`. As subsequent cards scroll into view,
 * previous cards scale down slightly and shift upwards, forming a stacked
 * card deck with visible tabs at the top (matching index card stack aesthetics).
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
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
  cardGap: number;
  scaleStep: number;
  offsetY: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}

const ScrollStackCard: React.FC<ScrollStackCardProps> = ({
  index,
  total,
  stickyTop,
  cardGap,
  scaleStep,
  offsetY,
  scrollYProgress,
  children,
}) => {
  const isLast = index === total - 1;

  // Calculate transform keyframes for scale and translateY (y)
  const inputPoints: number[] = [0];
  const scaleOutput: number[] = [1];
  const yOutput: number[] = [0];

  if (total > 1) {
    const numSegments = total - 1;
    const segStep = 1 / numSegments;

    const cardStart = index * segStep;
    if (cardStart > 0) {
      inputPoints.push(cardStart);
      scaleOutput.push(1);
      yOutput.push(0);
    }

    for (let j = index + 1; j < total; j++) {
      const p = Math.min(1, j * segStep);
      const coveredCount = j - index;
      inputPoints.push(p);
      scaleOutput.push(Math.max(0.65, 1 - coveredCount * scaleStep));
      yOutput.push(-coveredCount * offsetY);
    }

    if (inputPoints[inputPoints.length - 1] < 1) {
      inputPoints.push(1);
      scaleOutput.push(scaleOutput[scaleOutput.length - 1]);
      yOutput.push(yOutput[yOutput.length - 1]);
    }
  }

  const scale = useTransform(scrollYProgress, inputPoints, scaleOutput);
  const y = useTransform(scrollYProgress, inputPoints, yOutput);

  return (
    <div
      className="ss-card-wrapper"
      style={{
        height: isLast ? 'auto' : `calc(100vh - ${stickyTop}px + ${cardGap}px)`,
        position: 'relative',
      }}
    >
      <motion.div
        className="ss-card-sticky"
        style={{
          position: 'sticky',
          top: `${stickyTop}px`,
          zIndex: index + 1,
          scale,
          y,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
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
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeScaleStep = isMobile ? 0.025 : scaleStep;
  const activeOffsetY = isMobile ? 12 : offsetY;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${stickyTop}px`, 'end end'],
  });

  return (
    <div
      ref={containerRef}
      className={`ss-container ${className}`.trim()}
      style={{
        paddingTop: `${(total - 1) * activeOffsetY}px`,
      }}
    >
      {childrenArray.map((child, index) => (
        <ScrollStackCard
          key={index}
          index={index}
          total={total}
          stickyTop={stickyTop}
          cardGap={cardGap}
          scaleStep={activeScaleStep}
          offsetY={activeOffsetY}
          scrollYProgress={scrollYProgress}
        >
          {child}
        </ScrollStackCard>
      ))}
    </div>
  );
};

export default ScrollStack;