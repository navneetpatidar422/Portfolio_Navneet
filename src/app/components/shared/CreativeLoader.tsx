import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const keywords = [
  { term: "THINK", def: "Understanding the human problem" },
  { term: "DESIGN", def: "Crafting clean, accessible flows" },
  { term: "BUILD", def: "Engineering high-performance prototypes" },
  { term: "SOLVE", def: "Blending empathy with precision" }
];

export const CreativeLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Keyword rotation interval
    const keyTimer = setInterval(() => {
      setIndex((prev) => {
        if (prev < keywords.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    // Progress counter (0 to 100 over 3.2 seconds)
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        return 100;
      });
    }, 30);

    // Complete loader after 3.5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(keyTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#09090B] text-[#F7F4EE] flex flex-col justify-between p-8 md:p-12 overflow-hidden"
    >
      {/* Background Subtle Tech Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Top Header metadata */}
      <div className="flex justify-between items-center z-10 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase select-none">
        <div>NAVNEET PATIDAR</div>
        <div className="hidden sm:block">PORTFOLIO EDITION ©{new Date().getFullYear()}</div>
        <div>DELHI, IN</div>
      </div>

      {/* Center Layout: Massive progress text + Rotating Concept */}
      <div className="flex-1 flex flex-col justify-center items-start z-10 max-w-5xl mx-auto w-full">
        {/* Progress Counter in beautiful serif/display */}
        <div className="font-display font-black text-7xl md:text-[10rem] leading-none tracking-tighter text-neutral-200 select-none mb-8 flex items-baseline">
          <span>{progress.toString().padStart(3, "0")}</span>
          <span className="text-xl md:text-3xl font-mono text-purple-500 ml-4 font-bold">%</span>
        </div>

        {/* Rotating design manifesto with custom clip-path slide-up transitions */}
        <div className="h-28 flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wide text-white mb-2">
                {keywords[index].term} <span className="text-purple-500">/</span>
              </h2>
              <p className="text-sm md:text-lg text-neutral-400 font-light font-body">
                {keywords[index].def}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom status & horizontal bar */}
      <div className="z-10 w-full max-w-5xl mx-auto">
        {/* Animated loader strip */}
        <div className="w-full h-[1px] bg-neutral-800 relative mb-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-amber-400 to-rose-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center font-mono text-[9px] tracking-widest text-neutral-500 uppercase select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
            <span>ESTABLISHING SECURE CONNECTION</span>
          </div>
          <div>DESIGN ARCHIVE v2.0</div>
        </div>
      </div>
    </motion.div>
  );
};
