import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const skillsData = [
  { name: "Product Thinking" },
  { name: "UX Research" },
  { name: "Accessibility" },
  { name: "Design Systems" },
  { name: "Interaction Design" },
  { name: "Prototyping" },
  { name: "UI/UX Design" },
];

const expertiseList = [
  "UX Research", 
  "Product Thinking", 
  "Interaction Design", 
  "Design Systems", 
  "Accessibility", 
  "Prototyping"
];

const toolsList = [
  "Figma", "Canva", "HTML", "CSS", "Microsoft Designer", "Framer", "Adobe XD"
];

// 7 points on a circle mapped to percentages
const positions = [
  { left: "100%", top: "50%" },
  { left: "81.2%", top: "89.1%" },
  { left: "38.9%", top: "98.7%" },
  { left: "9.8%", top: "71.7%" },
  { left: "9.8%", top: "28.3%" },
  { left: "38.9%", top: "1.3%" },
  { left: "81.2%", top: "10.9%" },
];

export const Skills = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="skills" className="py-24 lg:py-32 px-6 bg-transparent text-foreground relative overflow-hidden min-h-[700px] flex items-center justify-center transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 w-[400px] md:w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] md:w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Side: Interactive Skills Constellation */}
        <div className="flex justify-center items-center relative min-h-[450px] md:min-h-[550px]">
          
          {/* Orbit Container */}
          <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] flex items-center justify-center">
            
            {/* Constellation Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <AnimatePresence>
                {isOpen && positions.map((pos, i) => (
                  <motion.line
                    key={`line-${i}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeInOut" }}
                    x1="50%"
                    y1="50%"
                    x2={pos.left}
                    y2={pos.top}
                    className="stroke-purple-300/40 md:stroke-purple-300/30 dark:stroke-purple-800/30"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                ))}
              </AnimatePresence>
            </svg>

            {/* Rotating Outer Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 rounded-full border border-purple-200/20 dark:border-purple-800/20 border-dashed pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Scattered Bubbles */}
            <AnimatePresence>
              {skillsData.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ top: "50%", left: "50%", scale: 0, opacity: 0 }}
                  animate={isOpen ? { 
                    top: positions[i].top, 
                    left: positions[i].left, 
                    scale: 1, 
                    opacity: 1 
                  } : { 
                    top: "50%", 
                    left: "50%", 
                    scale: 0, 
                    opacity: 0 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 20, 
                    delay: isOpen ? i * 0.05 : 0 
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.div
                    animate={isOpen ? { 
                      y: [0, -6, 0], 
                    } : {}}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(107,33,168,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-purple-100 dark:border-neutral-800 flex flex-col items-center justify-center text-center p-2 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-default group relative overflow-hidden"
                  >
                    {/* Hover Reveal Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="font-bold text-neutral-900 dark:text-neutral-200 text-[9px] md:text-xs tracking-wider group-hover:text-white transition-colors relative z-10">
                      {skill.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Central Hub */}
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
              className="relative z-30 flex flex-col items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-full bg-neutral-950 dark:bg-neutral-900 shadow-[0_0_80px_rgba(0,0,0,0.3)] dark:shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-neutral-800 dark:border-neutral-700 cursor-pointer group transition-colors duration-500"
            >
              {/* Inner Pulsing Core */}
              <div className={`absolute inset-0 rounded-full bg-purple-500/20 blur-xl transition-all duration-500 ${isOpen ? 'opacity-100 scale-110' : 'opacity-40 scale-100 group-hover:opacity-80 animate-pulse'}`} />
              
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <span className="text-white font-display text-lg md:text-2xl font-bold uppercase tracking-tight">
                  How I
                  <br />
                  Design
                </span>
              </div>
            </motion.button>
            
          </div>
        </div>

        {/* Right Side: Creative Animated Text Content */}
        <div className="flex flex-col space-y-12 max-w-xl mx-auto lg:mx-0">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-[1.1] text-neutral-900 dark:text-white tracking-tight transition-colors duration-500">
              Great products don't start with beautiful interfaces.
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed transition-colors duration-500">
              They start with <span className="text-purple-600 dark:text-purple-400 font-medium">understanding people</span>, questioning assumptions, and solving the right problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Core Expertise */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs md:text-sm font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase mb-5">
                Core Expertise
              </h3>
              <ul className="space-y-3">
                {expertiseList.map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-neutral-800 dark:text-neutral-300 font-medium text-sm md:text-base group transition-colors duration-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30 group-hover:bg-purple-500 mr-3 transition-colors" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs md:text-sm font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase mb-5">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {toolsList.map((tool, i) => (
                  <motion.span 
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 shadow-sm rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:border-purple-300 hover:text-purple-700 hover:shadow-md transition-all duration-500 cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
