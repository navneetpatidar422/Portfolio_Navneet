/**
 * ScrollStack — Scroll-linked stacking cards.
 *
 * Performance design:
 * ─────────────────
 * • Static offsetTop measurements (never affected by transforms) — no feedback loop.
 * • ResizeObserver is DEBOUNCED so it can't fire mid-scroll.
 * • Only ONE window.resize listener (properly cleaned up).
 * • Skip writes when value is unchanged.
 * • No layout reads inside the per-card RAF loop.
 */

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import './ScrollStack.css';

// ─── ScrollStackItem ──────────────────────────────────────────────────────────

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // Legacy compat props (silently ignored)
  itemClassName?: string;
  _index?: number;
  _total?: number;
  _stickyTop?: number;
  _laneHeight?: number;
  _onMeasure?: (index: number, height: number) => void;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  className = '',
  style,
}) => (
  <div className={`ss-card ${className}`.trim()} style={style}>
    {children}
  </div>
);

// ─── ScrollStack ──────────────────────────────────────────────────────────────

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  /** Distance from viewport top where cards pin (px). Should clear your navbar. Default: 88 */
  stickyTop?: number;
  /** Vertical gap between cards (px). Controls overlap transition distance. Default: 160 */
  cardGap?: number;
  // Legacy compat props (silently ignored)
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  scrollDistancePerCard?: number;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stickyTop = 88,
  cardGap = 160,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const containerDocTopRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const prevTransformsRef = useRef<number[]>([]);
  // Debounce timer for resize re-measurement
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guard: don't let ResizeObserver fire while scroll RAF is running
  const isMeasuringRef = useRef(false);

  // ── measure() ─────────────────────────────────────────────────────────────
  // Resets transforms, reads static positions, caches them.
  // Must ONLY be called when scroll is NOT happening (debounced on resize).
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    isMeasuringRef.current = true;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('.ss-card')
    );
    cardsRef.current = cards;
    prevTransformsRef.current = new Array(cards.length).fill(NaN); // force first write

    // 1. Reset all card transforms
    cards.forEach(c => { c.style.transform = ''; });

    // 2. One synchronous reflow to settle layout (read offsetHeight = batch)
    const _ = container.offsetHeight; void _;

    // 3. Snapshot container's absolute document position
    const rect = container.getBoundingClientRect();
    containerDocTopRef.current = rect.top + window.scrollY;

    // 4. Snapshot each card's static offsetTop (layout value, NEVER affected by transforms)
    cardOffsetsRef.current = cards.map(c => c.offsetTop);

    // 5. Set stacking styles (paint only, not layout)
    cards.forEach((c, i) => {
      c.style.zIndex = String(i + 1);
      c.style.willChange = 'transform';
    });

    isMeasuringRef.current = false;

    // Re-apply correct transforms for current scroll position
    updateTransforms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // NOTE: updateTransforms is defined below and referenced via closure.
  // Using a ref to break the circular dependency.
  const updateTransformsRef = useRef<() => void>(() => {});

  // ── updateTransforms() ────────────────────────────────────────────────────
  // Pure math: scrollY + static offsets → translateY per card.
  // Zero layout reads. Zero React state. Runs in RAF.
  const updateTransforms = useCallback(() => {
    if (isMeasuringRef.current) return;
    const cards = cardsRef.current;
    const offsets = cardOffsetsRef.current;
    if (!cards.length || !offsets.length) return;

    const scrollY = window.scrollY;
    const containerDocTop = containerDocTopRef.current;
    const lastOffset = offsets[offsets.length - 1] ?? 0;

    // scrollY at which the last card has fully pinned (freeze point)
    const pinEnd = containerDocTop + lastOffset - stickyTop;
    const clampedScroll = Math.min(scrollY, pinEnd);

    cards.forEach((card, i) => {
      const cardDocTop = containerDocTop + offsets[i];
      const pinStart = cardDocTop - stickyTop;

      let ty = 0;
      if (scrollY >= pinStart) {
        ty = clampedScroll - cardDocTop + stickyTop;
      }

      // Round to 1 decimal to reduce redundant style writes
      const tyr = Math.round(ty * 10) / 10;
      if (prevTransformsRef.current[i] === tyr) return;
      prevTransformsRef.current[i] = tyr;
      card.style.transform = `translate3d(0,${tyr}px,0)`;
    });
  }, [stickyTop]);

  // Keep the ref in sync so measure() can call updateTransforms
  useEffect(() => {
    updateTransformsRef.current = updateTransforms;
  }, [updateTransforms]);

  // ── handleScroll() ────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateTransforms);
  }, [updateTransforms]);

  // ── Mount: measure then set up listeners ──────────────────────────────────
  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Debounced resize: wait 150ms after resize stops before re-measuring.
    // This prevents ResizeObserver from firing mid-scroll on mobile (rubber-band,
    // browser chrome show/hide) which would cause visible jitter.
    const handleResize = () => {
      if (resizeTimerRef.current !== null) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        measure();
      }, 150);
    };

    // ResizeObserver: only for genuine DOM content changes (font load, image load).
    // Also debounced so it can't fire during scroll.
    const ro = new ResizeObserver(() => {
      if (resizeTimerRef.current !== null) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        measure();
      }, 150);
    });
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener('resize', handleResize, { passive: true });

    // Initial scroll position sync
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeTimerRef.current !== null) clearTimeout(resizeTimerRef.current);
    };
  }, [handleScroll, measure]);

  return (
    <div
      ref={containerRef}
      className={`ss-container ${className}`.trim()}
      style={{ '--ss-gap': `${cardGap}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default ScrollStack;
