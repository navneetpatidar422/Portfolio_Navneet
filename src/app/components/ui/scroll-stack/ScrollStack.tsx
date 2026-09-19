/**
 * ScrollStack — Scroll-linked stacking cards.
 *
 * Architecture:
 * ─────────────
 * Cards are in normal document flow (position: relative/static).
 * At mount, each card's offsetTop is measured ONCE — this value is
 * NEVER affected by CSS transforms, so it stays accurate forever.
 *
 * On every scroll event, translateY is computed per-card:
 *   translateY = scrollY - cardNaturalDocTop + stickyTop   (while pinned)
 *
 * This keeps the card fixed at `stickyTop` px from the viewport top,
 * and is a pure linear function of scrollY — no thresholds, no triggers,
 * no animation timers. Scroll position IS the animation state.
 *
 * When the next card's pinStart is reached, it also starts pinning.
 * Since it has a higher z-index, it appears on top and progressively
 * overlaps the previous card as both are at the same viewport position.
 *
 * Why this is different from the broken previous version:
 *   ❌ OLD: used getBoundingClientRect() — changes when transforms are applied
 *           → feedback loop → jumps
 *   ✅ NEW: uses offsetTop — unaffected by transforms → stable forever
 */

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import './ScrollStack.css';

// ─── ScrollStackItem ────────────────────────────────────────────────────────

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // Legacy compat props (silently ignored, ScrollStack manages everything)
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

// ─── ScrollStack ────────────────────────────────────────────────────────────

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Distance from the viewport top where cards pin (px).
   * Should clear your navbar. Default: 80
   */
  stickyTop?: number;
  /**
   * Vertical gap between cards (px). Controls how much scroll distance
   * exists between the moment card N+1 enters the viewport and the moment
   * it fully overlaps card N. Larger = more scroll per transition.
   * Default: 120
   */
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
  stickyTop = 80,
  cardGap = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Static offsets: measured once at mount before any transforms.
  // offsetTop is NEVER affected by CSS transforms — safe to cache forever.
  const cardOffsetsRef = useRef<number[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const containerDocTopRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTransformsRef = useRef<number[]>([]);

  /**
   * measure() — Reset transforms, read static positions, cache them.
   * Called once at mount and on resize (content reflow).
   */
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Query all cards
    const cards = Array.from(
      container.querySelectorAll('.ss-card')
    ) as HTMLElement[];
    cardsRef.current = cards;
    lastTransformsRef.current = new Array(cards.length).fill(0);

    // ── Step 1: Reset all transforms so measurements are "natural" ──
    cards.forEach((card) => {
      card.style.transform = '';
    });

    // ── Step 2: Force a synchronous reflow so getBoundingClientRect
    //    and offsetTop return post-reset values ──
    void container.offsetHeight;

    // ── Step 3: Record container's absolute document position ──
    // getBoundingClientRect is fine here because: container has no
    // transform, and we've already reset all card transforms above.
    const rect = container.getBoundingClientRect();
    containerDocTopRef.current = rect.top + window.scrollY;

    // ── Step 4: Record each card's offsetTop (relative to container).
    //    offsetTop is NEVER affected by transforms. ──
    cardOffsetsRef.current = cards.map((card) => card.offsetTop);

    // ── Step 5: Apply stable non-layout styles ──
    cards.forEach((card, i) => {
      card.style.zIndex = String(i + 1);
      card.style.willChange = 'transform';
    });
  }, []);

  /**
   * updateTransforms() — Calculate and apply transforms for current scrollY.
   * Pure function of scrollY + static offsets. No layout reads inside the
   * per-card loop (only one getBoundingClientRect at the top for the container,
   * which has no transform and is stable).
   */
  const updateTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const offsets = cardOffsetsRef.current;
    if (!cards.length || !offsets.length) return;

    const scrollY = window.scrollY;
    const containerDocTop = containerDocTopRef.current;

    // pinEnd: the scrollY at which the LAST card reaches its sticky position.
    // After this, all cards are frozen at their stacked positions.
    const lastOffset = offsets[cards.length - 1] ?? 0;
    const pinEnd = containerDocTop + lastOffset - stickyTop;

    // Clamp scrollY so we don't go past the last card's pin point
    const effectiveScroll = Math.min(scrollY, pinEnd);

    cards.forEach((card, i) => {
      // Absolute document position of this card's top in natural flow
      const cardDocTop = containerDocTop + offsets[i];

      // scrollY value at which this card starts pinning
      const pinStart = cardDocTop - stickyTop;

      let ty = 0;
      if (scrollY >= pinStart) {
        // Pin: keep card at stickyTop in viewport
        ty = effectiveScroll - cardDocTop + stickyTop;
      }
      // else: card not yet reached, stays in natural flow (ty = 0)

      // Skip if unchanged (avoids unnecessary style writes)
      const prev = lastTransformsRef.current[i];
      const rounded = Math.round(ty * 10) / 10;
      if (prev === rounded) return;
      lastTransformsRef.current[i] = rounded;

      card.style.transform = `translate3d(0, ${rounded}px, 0)`;
    });
  }, [stickyTop]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateTransforms);
  }, [updateTransforms]);

  // ── Mount: measure static positions ──
  useLayoutEffect(() => {
    measure();
    // Initial transform pass after measurement
    updateTransforms();
  }, [measure, updateTransforms]);

  // ── Scroll + Resize listeners ──
  useEffect(() => {
    // Re-measure on resize (card heights may change on mobile reflow)
    const resizeObserver = new ResizeObserver(() => {
      measure();
      updateTransforms();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also handle resize via window for viewport changes
    window.addEventListener('resize', () => {
      measure();
      updateTransforms();
    }, { passive: true });

    // Run once immediately in case page loaded mid-scroll
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, updateTransforms, handleScroll]);

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
