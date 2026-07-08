import { motion } from "motion/react";
import { Quote, MessageSquare, Star, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const testimonials = [
  {
    step: "01",
    quote: "Navneet demonstrated strong creativity, an excellent eye for design, and remarkable attention to detail throughout. He made valuable contributions across logo design and social media creatives, consistently delivering thoughtful, user-centric work with professionalism and ownership. He was a pleasure to work with..",
    author: "Avishek Somani",
    role: "Managing Partner - Vedam Advisors",
    initial: "AS",
    linkedin: "https://www.linkedin.com/in/avisheksomani/"
  },
  {
    step: "02",
    quote: "Thank you for your excellent UI/UX consultation for our Jewellery Pricing Application. Your insights, attention to detail, and user-centric approach have significantly improved the product's overall experience. We truly appreciate your valuable contribution and look forward to working with you again.",
    author: "Divyansh Kotnala",
    role: "Director and founder - Kotnala Consultancy",
    initial: "DK",
    linkedin: "https://www.linkedin.com/in/divyanshkotnala/"
  },
  {
    step: "03",
    quote: "Navneet consistently delivered high-quality visual assets that strengthened our brand presence across social media. Beyond graphic design, he contributed thoughtful UI/UX suggestions that helped us refine the overall user experience. His creativity, responsiveness, and collaborative approach made him a valuable part of the team.",
    author: "Dheeraj Rajput",
    role: "Founder - InstantAI",
    initial: "DR",
    linkedin: "https://www.linkedin.com/in/dheeraj-rajput/"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6 bg-transparent text-foreground border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-28 space-y-6 relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-neutral-500">
              Reviews
            </span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white uppercase font-display transition-colors duration-500"
          >
            Words from People I've Worked With
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }} 
            className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto text-lg font-light leading-relaxed transition-colors duration-500"
          >
            Real feedback from clients, teammates, and collaborators across freelance projects, internships, and competitions.
          </motion.p>
        </div>

        {/* Connecting Path Line (Desktop) */}
        <div className="hidden lg:block absolute top-[360px] left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent z-0" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-[1200px] mx-auto relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Connection Node (Desktop) */}
              <div className="hidden lg:flex absolute -top-[52px] left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-4 z-10">
                <div className="w-3 h-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-full z-10 group-hover:border-black dark:group-hover:border-white group-hover:scale-125 transition-all duration-500" />
                <div className="h-8 w-px bg-gradient-to-b from-neutral-200 dark:from-neutral-800 to-transparent group-hover:from-neutral-400 transition-colors duration-500" />
              </div>

              {/* Card Container */}
              <div className="h-full p-8 pt-10 rounded-[2rem] bg-white dark:bg-[#0E0E0E] border border-neutral-100 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white transition-all duration-700 flex flex-col justify-between items-start text-left group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
                
                {/* Step Number */}
                <div className="absolute top-6 right-8 font-mono text-5xl font-bold text-neutral-100 dark:text-neutral-800/20 group-hover:text-neutral-950/5 dark:group-hover:text-white/5 transition-colors duration-500 select-none">
                  {t.step}
                </div>

                <div className="w-full">
                  {/* Icon / Rating */}
                  <div className="w-14 h-14 mb-8 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center relative z-10 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500 shadow-sm">
                    <Quote className="w-6 h-6 stroke-1" />
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-7 font-light italic mb-8 relative z-10 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info & LinkedIn Link */}
                <div className="w-full flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-white/5 relative z-10">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                      <AvatarFallback className="text-neutral-600 dark:text-neutral-300 font-bold text-xs uppercase group-hover:bg-neutral-900 group-hover:text-white transition-all">
                        {t.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-neutral-900 dark:text-white text-sm font-bold tracking-tight">{t.author}</h4>
                      <p className="text-neutral-400 dark:text-neutral-500 text-[10px] font-mono uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#0A66C2] hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-300 shrink-0"
                      title="View LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 fill-current stroke-none" />
                    </a>
                  )}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};