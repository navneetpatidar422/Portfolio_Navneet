import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const WhyIDesign = () => {
  return (
    <section id="why-i-design" className="py-20 md:py-28 px-6 bg-transparent text-[#111111] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-neutral-500">
            Design Philosophy
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif italic text-neutral-800 leading-snug"
        >
          "I design because interfaces are the translation layer between human intent and machine capability. If the translation fails, the product fails."
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light"
        >
          Designing is not just about making layouts look beautiful. It's about respecting the user's attention span, building accessible flows, and shipping real engineering value.
        </motion.p>
      </div>
    </section>
  );
};
