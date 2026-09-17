import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface SectionTickerProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

export const SectionTicker = ({ items, speed = 25, reverse = false }: SectionTickerProps) => {
  const marqueeList = [...items, ...items, ...items];

  return (
    <div 
      className="w-full overflow-hidden bg-[#111111] dark:bg-white text-white dark:text-black py-4 select-none my-10 relative z-10 shadow-sm"
      style={{
        clipPath: "polygon(0 0, 50% 12px, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)",
        WebkitClipPath: "polygon(0 0, 50% 12px, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)"
      }}
    >
      <motion.div
        className="flex gap-8 w-max whitespace-nowrap py-0.5"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        style={{ willChange: "transform" }}
      >
        {marqueeList.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 font-subheading font-bold text-xs md:text-sm uppercase tracking-widest">
            <span>{item}</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 opacity-80" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};


