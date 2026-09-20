import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { SquigglyText } from "../ui/squiggly-text";

const galleryItems = [
  { id: 1, image: "/gallery/bumrah.jpg" },
  { id: 2, image: "/gallery/king-kohli.jpg" },
  { id: 3, image: "/gallery/maverick.jpg" },
  { id: 4, image: "/gallery/champions.jpg" },
  { id: 5, image: "/gallery/vedam-logo.jpg" },
  { id: 6, image: "/gallery/jadeja.png" },
  { id: 7, image: "/gallery/boom-boom.jpg" },
  { id: 8, image: "/gallery/hitman.png" },
  { id: 9, image: "/gallery/oumuamua.jpeg" },
  { id: 10, image: "/gallery/Figmatrophy.jpeg" },
];

const ANIM_DURATION_MS = 55000;

export const GraphicDesign = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Controls the ✋ cursor: "grab" at rest, "grabbing" while dragging
  const [isGrabbing, setIsGrabbing] = useState(false);

  const marqueeItems = [...galleryItems, ...galleryItems, ...galleryItems];

  /* ── Refs ────────────────────────────────────────────────────────────── */
  const trackRef      = useRef<HTMLDivElement>(null);
  const dragging      = useRef(false);
  const didDrag       = useRef(false);
  const pointerStartX = useRef(0);
  const dragStartTX   = useRef(0);
  const currentTX     = useRef(0);
  const autoPlaying   = useRef(true);
  const rafId         = useRef<number | null>(null);
  const velocity      = useRef(0);
  const lastX         = useRef(0);
  const lastT         = useRef(0);
  const touchStartX   = useRef(0);
  const touchStartTX  = useRef(0);

  /* ── Helpers ─────────────────────────────────────────────────────────── */

  /** Capture the live CSS translateX (works whether animation is running or manual) */
  const getLiveTranslateX = useCallback((): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const mat = new DOMMatrix(getComputedStyle(el).transform);
    return mat.m41;
  }, []);

  /** Push a raw pixel offset onto the track element */
  const applyTX = useCallback((px: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${px}px, 0, 0)`;
  }, []);

  /**
   * Clamp px into [−tileWidth, 0] for seamless looping.
   * tileWidth = trackRef.scrollWidth / 3  (we tripled the items)
   * NOTE: we use trackRef (not the clipped wrapper) so scrollWidth is the full track.
   */
  const wrapTX = useCallback((px: number): number => {
    const track = trackRef.current;
    if (!track) return px;
    const tile = track.scrollWidth / 3;
    if (tile === 0) return px;
    return ((px % tile) - tile) % tile;
  }, []);

  /** Freeze the CSS animation at its current painted position */
  const pauseAuto = useCallback(() => {
    const el = trackRef.current;
    if (!el || !autoPlaying.current) return;
    const tx = getLiveTranslateX();
    el.style.animation = "none";
    currentTX.current  = tx;
    applyTX(tx);
    autoPlaying.current = false;
  }, [getLiveTranslateX, applyTX]);

  /** Resume the CSS animation, starting from the current pixel offset */
  const resumeAuto = useCallback(() => {
    const el    = trackRef.current;
    if (!el || autoPlaying.current) return;

    const tile = el.scrollWidth / 3;
    if (tile === 0) return;

    // Map current offset → 0..tile, then derive how far into the animation we are
    const rawTX       = wrapTX(currentTX.current);
    const frac        = Math.abs(rawTX) / tile;          // 0 = start, 1 = end
    const remainingMs = frac * ANIM_DURATION_MS;
    const delayS      = -(ANIM_DURATION_MS - remainingMs) / 1000;

    el.style.transform = "";
    el.style.animation = `visualMarquee ${ANIM_DURATION_MS / 1000}s ${delayS}s linear infinite`;
    autoPlaying.current = true;
  }, [wrapTX]);

  /* ── Shared release logic ────────────────────────────────────────────── */
  const handleRelease = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsGrabbing(false);

    const v = velocity.current;
    if (Math.abs(v) > 0.05) {
      const startTX  = currentTX.current;
      const startT   = performance.now();
      const strength = 350;
      const totalPx  = v * strength * 0.5;

      const glide = (now: number) => {
        const t     = Math.min((now - startT) / strength, 1);
        const eased = 1 - (1 - t) * (1 - t); // ease-out quad
        const px    = wrapTX(startTX + totalPx * eased);
        currentTX.current = px;
        applyTX(px);
        if (t < 1) {
          rafId.current = requestAnimationFrame(glide);
        } else {
          rafId.current = null;
          resumeAuto();
        }
      };
      rafId.current = requestAnimationFrame(glide);
    } else {
      resumeAuto();
    }
  }, [applyTX, wrapTX, resumeAuto]);

  /* ── Pointer events (mouse / stylus / pen) ───────────────────────────── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    pauseAuto();
    dragging.current      = true;
    didDrag.current       = false;
    pointerStartX.current = e.clientX;
    dragStartTX.current   = currentTX.current;
    lastX.current         = e.clientX;
    lastT.current         = performance.now();
    velocity.current      = 0;
    setIsGrabbing(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pauseAuto]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;

    const now = performance.now();
    const dt  = now - lastT.current;
    if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastT.current = now;

    currentTX.current = wrapTX(dragStartTX.current + dx);
    applyTX(currentTX.current);
  }, [applyTX, wrapTX]);

  /* ── Touch events ────────────────────────────────────────────────────── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    pauseAuto();
    dragging.current     = true;
    didDrag.current      = false;
    touchStartX.current  = e.touches[0].clientX;
    touchStartTX.current = currentTX.current;
    lastX.current        = e.touches[0].clientX;
    lastT.current        = performance.now();
    velocity.current     = 0;
  }, [pauseAuto]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;

    const now = performance.now();
    const dt  = now - lastT.current;
    if (dt > 0) velocity.current = (e.touches[0].clientX - lastX.current) / dt;
    lastX.current = e.touches[0].clientX;
    lastT.current = now;

    currentTX.current = wrapTX(touchStartTX.current + dx);
    applyTX(currentTX.current);
  }, [applyTX, wrapTX]);

  /* ── Cleanup ─────────────────────────────────────────────────────────── */
  useEffect(() => () => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section id="graphic-design" className="py-24 lg:py-32 bg-transparent text-foreground relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12 lg:mb-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-12 bg-emerald-500 transition-colors duration-500" />
            <span className="text-emerald-500 font-subheading font-bold uppercase tracking-widest text-xs transition-colors duration-500">
              Graphic Design
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-anton uppercase leading-tight text-neutral-900 dark:text-white tracking-tight transition-colors duration-500">
            <SquigglyText scale={[5, 8]} className="bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white px-3 sm:px-4 py-0.5 md:py-1 rounded-md shadow-md inline-block mr-2 my-1">
              Visual
            </SquigglyText>
            Explorations
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-body font-light max-w-xl transition-colors duration-500">
            A continuous gallery of posters, brand identities, and digital artwork.
          </p>
        </motion.div>

      </div>

      {/* ── Marquee strip ──────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-4 select-none"
        style={{ cursor: isGrabbing ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={handleRelease}
        onPointerLeave={handleRelease}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleRelease}
        onTouchCancel={handleRelease}
      >
        <style>{`
          @keyframes visualMarquee {
            0%   { transform: translate3d(-33.333%, 0, 0); }
            100% { transform: translate3d(0%, 0, 0); }
          }
          .animate-visual-marquee {
            animation: visualMarquee ${ANIM_DURATION_MS / 1000}s linear infinite;
            will-change: transform;
          }
        `}</style>

        <div
          ref={trackRef}
          className="flex gap-6 w-max animate-visual-marquee"
          style={{ userSelect: "none" }}
        >
          {marqueeItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ scale: 1.04, y: -6 }}
              onClick={() => !didDrag.current && setSelectedImage(item.image)}
              draggable={false}
              className="relative shrink-0 rounded-2xl md:rounded-3xl overflow-hidden group/card shadow-lg border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 h-[280px] sm:h-[340px] md:h-[420px] transition-all duration-300"
              style={{ cursor: isGrabbing ? "grabbing" : "grab" }}
            >
              <img
                src={item.image}
                alt="Graphic design visual"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover/card:scale-105 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col cursor-default"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-emerald-500 transition-colors flex items-center justify-center cursor-pointer backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="overflow-auto max-h-[85vh] flex items-center justify-center p-6">
                <img
                  src={selectedImage}
                  alt="Graphic design visual preview"
                  className="max-h-[80vh] w-auto object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
