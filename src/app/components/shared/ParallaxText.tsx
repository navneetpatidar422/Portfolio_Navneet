import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
}

export function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Custom wrap utility since import might be unstable in new package versions
  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden tracking-tighter leading-[0.85] m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="scroller font-medium uppercase text-8xl md:text-[11rem] tracking-[-0.02em] flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12 font-[Slackey]">{children} </span>
        <span className="block mr-12 font-[Slackey]">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}
