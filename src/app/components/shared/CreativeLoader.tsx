import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export const CreativeLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 over ~2 seconds
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressTimer);
        return 100;
      });
    }, 18);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger completion checkmark animation
      setIsDone(true);

      // Delay to showcase checkmark & welcome text before smooth exit
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 950);

      return () => clearTimeout(completeTimeout);
    }
  }, [progress, onComplete]);

  // Determine current creative status message based on progress
  const getStatusMessage = () => {
    if (progress > 80) return "WELCOME TO MY PORTFOLIO ✨";
    if (progress > 68) return "SYSTEMIZING DESIGN & MOTION...";
    if (progress > 35) return "TRANSLATING INTENT INTO INTERFACES...";
    return "CURATING VISUAL EXPERIENCES...";
  };

  // SVG Circumference calculations for animated track & progress ring
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius; // ~376.99px
  
  // Track sweeps ahead to complete circumference smoothly
  const trackProgress = Math.min(100, progress * 1.3);
  const trackOffset = circumference * (1 - trackProgress / 100);
  
  // Green stroke follows actual progress 0% -> 100%
  const greenOffset = circumference * (1 - progress / 100);

  return (
    <motion.div
      initial={{ opacity: 1, y: "0%" }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] bg-[#FAFAFC] dark:bg-[#08090C] text-foreground flex flex-col justify-center items-center p-8 md:p-12 overflow-hidden transition-colors duration-500"
    >
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

      {/* Ambient Radial Accent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Center Layout: Profile Favicon inside Circumference-Filling SVG Ring */}
      <div className="flex flex-col justify-center items-center text-center max-w-xl mx-auto w-full relative z-10">
        
        {/* Animated Circumference Ring & Profile Morph Container */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-8">
          
          {/* Rotating Ambient Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 dark:border-emerald-500/10 pointer-events-none"
          />

          {/* Outer SVG Animated Circular Progress Ring */}
          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 150 150">
            {/* 1. Animated Gray Circumference Track Stroke */}
            <motion.circle
              cx="75"
              cy="75"
              r={circleRadius}
              className="stroke-neutral-300/80 dark:stroke-neutral-700/60"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: trackOffset }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
            {/* 2. Bold Emerald Green Progress Stroke */}
            <motion.circle
              cx="75"
              cy="75"
              r={circleRadius}
              className="stroke-[#10B981]"
              strokeWidth="6"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: greenOffset }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </svg>

          {/* Center Inner Area: Profile Favicon -> Merged Checkmark Badge */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <AnimatePresence mode="wait">
              {!isDone ? (
                // ── Stage 1: Favicon Profile Photo ──
                <motion.div
                  key="favicon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ 
                    scale: [1, 1.15, 0], 
                    opacity: [1, 1, 0],
                    rotate: [0, 10, -10],
                    transition: { duration: 0.4, ease: "easeInOut" } 
                  }}
                  className="w-24 h-24 rounded-full ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-[#FAFAFC] dark:ring-offset-[#08090C] overflow-hidden shadow-xl"
                >
                  <img
                    src="/portfolio-favicon.png"
                    alt="Navneet Patidar Favicon"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                // ── Stage 2: Merged Animated Checkmark Badge ──
                <motion.div
                  key="done-check"
                  initial={{ scale: 0.2, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 380, 
                    damping: 18,
                    mass: 0.8
                  }}
                  className="w-24 h-24 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] relative overflow-hidden"
                >
                  {/* Internal Liquid Shine */}
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <Check className="w-11 h-11 stroke-[3.5] relative z-10" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ripple Waves on Circumference Completion & Merge */}
          {isDone && (
            <>
              <motion.div
                initial={{ opacity: 0.8, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-[#10B981] pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 0, scale: 2.0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-[#10B981]/50 pointer-events-none"
              />
            </>
          )}
        </div>

        {/* Percentage Counter */}
        <div className="font-anton text-4xl md:text-5xl text-neutral-900 dark:text-white mb-4 tracking-tight">
          {progress}%
        </div>

        {/* Dynamic Creative Message */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={getStatusMessage()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-xs md:text-sm font-subheading font-bold uppercase tracking-widest ${
                isDone ? "text-[#10B981]" : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {getStatusMessage()}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom Progress Bar Status */}
        <div className="w-full max-w-xs mx-auto mt-6 space-y-3 text-center font-subheading font-bold text-[10px] tracking-widest text-neutral-400 uppercase select-none">
          <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#10B981] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div>INITIALIZING INTERACTIVE ENVIRONMENT</div>
        </div>

      </div>

    </motion.div>
  );
};
