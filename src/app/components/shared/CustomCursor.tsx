import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', () => setHidden(true));
      document.addEventListener('mouseenter', () => setHidden(false));
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', () => setHidden(true));
      document.removeEventListener('mouseenter', () => setHidden(false));
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      // Check for clickable elements
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
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 z-50 pointer-events-none hidden md:block mix-blend-difference ${hidden ? 'opacity-0' : 'opacity-100'}`}
      animate={{
        x: position.x - (linkHovered ? 24 : 8),
        y: position.y - (linkHovered ? 24 : 8),
        scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5
      }}
    >
      
      
      {/* Optional: Add text label logic here if we wanted "VIEW" to appear */}
    </motion.div>
  );
};
