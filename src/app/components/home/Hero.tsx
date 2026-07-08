import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";
import { ParallaxText } from "../shared/ParallaxText";
import profileImg from "../../../imports/Untitled_design__5_-2.png";

const TYPING_FULL = "Crafting digital experiences that blend meaningful aesthetics with performant engineering.";

const TypingSubtitle = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(TYPING_FULL.slice(0, i));
        if (i >= TYPING_FULL.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, 32);
      return () => clearInterval(timer);
    }, 600);
    return () => clearTimeout(start);
  }, []);

  const highlight = (text: string) => {
    const parts = text.split(/(meaningful aesthetics|performant engineering)/);
    return parts.map((part, idx) =>
      part === "meaningful aesthetics" || part === "performant engineering" ? (
        <span key={idx} className="text-black dark:text-white font-semibold transition-colors duration-500">{part}</span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <span>
      {highlight(displayed)}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-neutral-500 ml-0.5 align-middle animate-[blink_0.8s_step-end_infinite]" />
      )}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden text-foreground flex flex-col justify-center py-32 md:pt-0 md:pb-24">
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        {/* Grain overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full pt-20">
        
        {/* Dynamic Parallax Typography */}
        <motion.div
            style={{ y: y2 }}
            className="w-full py-8 flex flex-col relative"
        >
             {/* Upper Text - Behind the image */}
             <div className="relative z-10">
                 <div className="font-serif tracking-tight"><ParallaxText baseVelocity={-2}>UI/UX DESIGNER</ParallaxText></div>
             </div>

             {/* The Image (Larger, Hover trigger for thought bubbles) */}
             <div 
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[300px] h-[400px] md:w-[500px] md:h-[650px] select-none cursor-pointer"
             >
                 <img 
                     src={profileImg} 
                     alt="Profile" 
                     className="w-full h-full object-contain object-top drop-shadow-2xl pointer-events-none select-none"
                 />

                 {/* Thought Cloud Bubbles */}
                 <AnimatePresence>
                     {isHovered && (
                          <>
                              {/* Bubble 1: THINK (Top-Left) */}
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.3, y: 15 }}
                                  animate={{ 
                                      opacity: 1, 
                                      scale: 1, 
                                      y: [0, -6, 0],
                                  }}
                                  exit={{ opacity: 0, scale: 0.4, y: 10 }}
                                  transition={{
                                      scale: { type: "spring", stiffness: 200, damping: 14, delay: 0 },
                                      opacity: { duration: 0.2 },
                                      y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
                                  }}
                                  className="absolute top-[8%] -left-[10%] md:-left-[24%] z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-800 shadow-xl px-6 py-4.5 rounded-[2rem] max-w-[170px] md:max-w-[210px] transition-colors duration-500"
                              >
                                  <h5 className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-1 select-none">THINK</h5>
                                  <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm leading-relaxed font-body font-light select-none">
                                      Every project starts by understanding the problem.
                                  </p>
                                  {/* Cloud bubble tail dots */}
                                  <div className="w-3.5 h-3.5 rounded-full absolute bottom-[-10px] right-[25%] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 dark:border-neutral-800 shadow-sm pointer-events-none" />
                                  <div className="w-2 h-2 rounded-full absolute bottom-[-18px] right-[18%] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 dark:border-neutral-800 shadow-sm pointer-events-none" />
                              </motion.div>

                              {/* Bubble 2: DESIGN (Middle-Right) */}
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.3, y: 15 }}
                                  animate={{ 
                                      opacity: 1, 
                                      scale: 1, 
                                      y: [0, 8, 0],
                                  }}
                                  exit={{ opacity: 0, scale: 0.4, y: 10 }}
                                  transition={{
                                      scale: { type: "spring", stiffness: 200, damping: 14, delay: 0.12 },
                                      opacity: { duration: 0.2 },
                                      y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                  }}
                                  className="absolute top-[38%] -right-[15%] md:-right-[28%] z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-800 shadow-xl px-6 py-4.5 rounded-[2rem] max-w-[170px] md:max-w-[210px] transition-colors duration-500"
                              >
                                  <h5 className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1 select-none">DESIGN</h5>
                                  <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm leading-relaxed font-body font-light select-none">
                                      Simple interfaces built around people.
                                  </p>
                                  {/* Cloud bubble tail dots */}
                                  <div className="w-3.5 h-3.5 rounded-full absolute bottom-[-6px] left-[25%] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 dark:border-neutral-800 shadow-sm pointer-events-none" />
                                  <div className="w-2 h-2 rounded-full absolute bottom-[-14px] left-[18%] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 shadow-sm pointer-events-none" />
                              </motion.div>

                              {/* Bubble 3: BUILD (Bottom-Left) */}
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.3, y: 15 }}
                                  animate={{ 
                                      opacity: 1, 
                                      scale: 1, 
                                      y: [0, -8, 0],
                                  }}
                                  exit={{ opacity: 0, scale: 0.4, y: 10 }}
                                  transition={{
                                      scale: { type: "spring", stiffness: 200, damping: 14, delay: 0.24 },
                                      opacity: { duration: 0.2 },
                                      y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                                  }}
                                  className="absolute bottom-[16%] -left-[12%] md:-left-[26%] z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-800 shadow-xl px-6 py-4.5 rounded-[2rem] max-w-[170px] md:max-w-[210px] transition-colors duration-500"
                              >
                                  <h5 className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1 select-none">BUILD</h5>
                                  <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm leading-relaxed font-body font-light select-none">
                                      Interactive prototypes ready for testing.
                                  </p>
                                  {/* Cloud bubble tail dots */}
                                  <div className="w-3.5 h-3.5 rounded-full absolute top-[25%] right-[-8px] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 dark:border-neutral-800 shadow-sm pointer-events-none" />
                                  <div className="w-2 h-2 rounded-full absolute top-[15%] right-[-16px] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/60 shadow-sm pointer-events-none" />
                              </motion.div>
                          </>
                     )}
                 </AnimatePresence>
             </div>

             {/* Lower Text - In front of the image */}
             <div className="relative z-30 mt-16 md:mt-24">
                 <div className="font-serif tracking-tight"><ParallaxText baseVelocity={2}>CREATIVE DEVELOPER</ParallaxText></div>
             </div>
        </motion.div>
        
        {/* Intro Text & CTAs */}
        <div className="mt-8 mb-12 md:mb-0 flex flex-col items-center gap-10 px-6 relative z-30">
            <motion.p
                className="text-center max-w-[600px] text-neutral-600 dark:text-neutral-300 text-lg md:text-2xl leading-relaxed font-light tracking-wide min-h-[3.5rem] transition-colors duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <TypingSubtitle />
            </motion.p>

            {/* CTAs */}
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <button 
                    onClick={() => {
                        const target = document.querySelector("#contact");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group relative px-8 py-4 bg-black dark:bg-[#F7F4EE] text-[#F7F4EE] dark:text-black text-sm font-bold uppercase tracking-widest rounded-full overflow-hidden shadow-lg hover:shadow-xl cursor-pointer water-btn transition-colors duration-500"
                >
                    <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors">Start a Project</span>
                    <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-10" />
                </button>
                <a 
                    href="https://drive.google.com/file/d/1QdAJZCM7EbsIQdZQW7AT6J8Gr7H3ErP1/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 text-black dark:text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm cursor-pointer water-btn"
                >
                    Download Resume
                </a>
            </motion.div>
        </div>
      </div>

      </section>
  );
};
