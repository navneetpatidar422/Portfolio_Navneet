import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

export const ThankYou = () => {
  const tickerItems = [
    "THANK YOU FOR VISITING",
    "DESIGNED WITH PASSION",
    "ENGINEERED WITH PRECISION",
    "LET'S BUILD SOMETHING GREAT",
    "THANK YOU FOR YOUR TIME",
  ];

  const marqueeList = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section id="thank-you" className="py-20 md:py-28 bg-transparent text-foreground relative overflow-hidden transition-colors duration-500 border-t border-black/5 dark:border-white/5">
      
      {/* Top Marquee Ribbon Ticker */}
      <div className="w-full overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-black py-3 select-none mb-16 rotate-[-1deg] shadow-lg">
        <motion.div
          className="flex gap-8 w-max whitespace-nowrap"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {marqueeList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 font-subheading font-bold text-xs md:text-sm uppercase tracking-widest">
              <span>{item}</span>
              <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-600 animate-pulse" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
        
        {/* Pulsing Thank You Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-neutral-900 border border-emerald-500/30 shadow-md"
        >
          <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-bounce" />
          <span className="text-xs font-subheading font-bold uppercase tracking-widest text-emerald-500">
            With Gratitude
          </span>
        </motion.div>

        {/* Headline Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl md:text-8xl font-anton uppercase tracking-tight text-neutral-900 dark:text-white leading-none"
        >
          THANK YOU FOR YOUR TIME.
        </motion.h2>

        {/* Handwritten Waiting for the Sunrise Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-sunrise text-3xl md:text-5xl text-emerald-500 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          "Your attention is the most valuable gift. Thank you for exploring my work and journey!"
        </motion.p>
      </div>

    </section>
  );
};
