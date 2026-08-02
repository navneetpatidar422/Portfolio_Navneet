import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Early return on mobile / touch devices to save 100% CPU/GPU resources
  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)) {
    return null;
  }

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Inject global CSS rule to hide native OS cursor on desktop fine-pointer devices
    const styleEl = document.createElement('style');
    styleEl.id = 'user-retro-cursor-style';
    styleEl.innerHTML = `
      @media (pointer: fine) {
        body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isClicked = false;
    let animationFrameId: number;

    // Direct GPU-accelerated requestAnimationFrame loop (Zero React re-renders)
    const updatePosition = () => {
      // 0.85 lerp factor for instant 120fps butter-smooth tracking
      currentX += (targetX - currentX) * 0.85;
      currentY += (targetY - currentY) * 0.85;

      const scale = isClicked ? 0.85 : isHovered ? 1.2 : 1;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.style.opacity = '1';

      const target = e.target as HTMLElement;
      if (target) {
        const isLink = !!(
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer')
        );

        if (isHovered !== isLink) {
          isHovered = isLink;
          if (pathRef.current) {
            if (isLink) {
              pathRef.current.style.fill = '#10B981';
            } else {
              pathRef.current.style.fill = '';
            }
          }
        }
      }
    };

    const onMouseDown = () => { isClicked = true; };
    const onMouseUp = () => { isClicked = false; };
    const onMouseLeave = () => { cursor.style.opacity = '0'; };
    const onMouseEnter = () => { cursor.style.opacity = '1'; };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block opacity-0 will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* User Provided SVG Pixel Arrow Cursor */}
      <svg
        width="28"
        height="28"
        viewBox="-10.5 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <path
          ref={pathRef}
          d="M9.313 14.906v1.313h1.313v1.313h-3.969v2.656h1.313v2.656h1.344v2.656h-2.656v-2.656h-1.344v-2.656h-1.313v-1.313h-1.344v1.313h-1.313v1.344h-1.344v-14.594h1.344v1.313h1.313v1.344h1.344v1.313h1.313v1.344h1.344v1.313h1.313v1.344h1.344z"
          className="fill-black dark:fill-white stroke-white dark:stroke-black stroke-[0.6] transition-colors duration-150"
        />
      </svg>
    </div>
  );
};
