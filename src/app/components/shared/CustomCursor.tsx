import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const prevPosRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef(0);

  useEffect(() => {
    // Inject global style to hide standard OS cursor on desktop devices
    const styleEl = document.createElement('style');
    styleEl.id = 'boat-cursor-style';
    styleEl.innerHTML = `
      @media (pointer: fine) {
        body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    const onMouseMove = (e: MouseEvent) => {
      setHidden(false);
      const currentX = e.clientX;
      const currentY = e.clientY;

      setPosition({ x: currentX, y: currentY });

      // Calculate distance moved
      const dx = currentX - prevPosRef.current.x;
      const dy = currentY - prevPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      // Only adjust boat orientation if cursor has moved sufficiently (prevents jitter)
      if (distance > 3) {
        // The boat SVG is naturally oriented facing RIGHT (0 deg, +X axis).
        // Math.atan2(dy, dx) gives the angle of motion vector in radians.
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Compute shortest angle difference to prevent 360-degree spin loops
        let diff = targetAngle - (currentRotationRef.current % 360);
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        const newRotation = currentRotationRef.current + diff;
        currentRotationRef.current = newRotation;
        setRotation(newRotation);

        prevPosRef.current = { x: currentX, y: currentY };
      }

      const target = e.target as HTMLElement;
      if (target) {
        const isLink = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer');

        setLinkHovered(!!isLink);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transformOrigin: 'center center',
      }}
      animate={{
        x: position.x - 22,
        y: position.y - 22,
        rotate: rotation,
        scale: clicked ? 0.85 : linkHovered ? 1.3 : 1,
      }}
      transition={{
        x: { type: 'spring', stiffness: 450, damping: 28, mass: 0.3 },
        y: { type: 'spring', stiffness: 450, damping: 28, mass: 0.3 },
        rotate: { type: 'spring', stiffness: 220, damping: 18 },
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      {/* Boat Icon Container */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Soft Water-Glow Aura underneath Boat */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            linkHovered 
              ? 'bg-purple-500/35 blur-md scale-125' 
              : 'bg-purple-500/20 blur-sm scale-100'
          }`} 
        />

        {/* User-Provided SVG Boat Icon */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 1000.00 1000.00"
          id="Layer_2"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="relative z-10 filter drop-shadow-[0_2px_10px_rgba(153,0,255,0.75)] transition-colors duration-300"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M152.331,566.774c3.117,19.486,13.708,81.784,44.57,119.353 c10.614,12.921,26.459,20.405,43.18,20.405h539.447c14.998,0,29.348-6.118,39.732-16.939l26.313-27.419 c4.452-4.64,1.746-12.372-4.628-13.223l-333.183-44.488c-26.027-3.475-51.354-10.985-75.069-22.259 c-35.261-16.763-73.855-25.097-112.742-24.447c-20.029,0.335-40.059,0.689-60.091,0.569l-100.419-0.604 C154.889,558.1,151.609,562.264,152.331,566.774z M346.356,595.047h25c4.694,0,8.5,3.806,8.5,8.5c0,4.694-3.806,8.5-8.5,8.5h-25 c-4.694,0-8.5-3.806-8.5-8.5C337.856,598.853,341.662,595.047,346.356,595.047z M276.856,595.047h25c4.694,0,8.5,3.806,8.5,8.5 c0,4.694-3.806,8.5-8.5,8.5h-25c-4.694,0-8.5-3.806-8.5-8.5C268.356,598.853,272.162,595.047,276.856,595.047z M207.356,595.047h25 c4.694,0,8.5,3.806,8.5,8.5c0,4.694-3.806,8.5-8.5,8.5h-25c-4.694,0-8.5-3.806-8.5-8.5 C198.856,598.853,202.662,595.047,207.356,595.047z"
              style={{ fill: '#9900ff' }}
            />
            <path
              d="M482.856,302.038v280.32c5.66,1.44,11.37,2.68,17.14,3.7v-284.02c0-2.37-0.96-4.51-2.51-6.06 c-1.55-1.55-3.689-2.51-6.06-2.51C486.696,293.467,482.856,297.297,482.856,302.038z"
              style={{ fill: '#9900ff' }}
            />
            <path
              d="M516.133,588.547l217.46,29.03c-107.55-196.16-184.949-286.73-217.46-298.75V588.547z"
              style={{ fill: '#9900ff' }}
            />
            <path
              d="M317.227,540.797l2.439-0.04c1.5-0.02,3-0.03,4.5-0.03c39.82,0,79.87,9.03,115.82,26.12 c8.71,4.14,17.63,7.73,26.74,10.76v-258.78c-27.95,10.33-89.08,78.72-174.021,222.35 C300.946,541.067,309.156,540.938,317.227,540.797z"
              style={{ fill: '#9900ff' }}
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};
