import { motion } from "motion/react";
import { Quote, MessageSquare, Star, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const testimonials = [
  {
    step: "01",
    quote: "Working with Navneet on our Jewellery Retail system was seamless. He designed a clear, functional inventory dashboard that saved us hours of daily manual tracking.",
    author: "Avishek Somani",
    role: "Managing Director - Vedam Advisors",
    initial: "AS",
    linkedin: "https://www.linkedin.com/in/navneet-patidar/"
  },
  {
    step: "02",
    quote: "Navneet brought a thoughtful, user-centered approach to our product. His attention to detail and UX recommendations significantly improved the overall experience of our Jewellery Pricing Application. It was a pleasure working with him, and we look forward to collaborating again.",
    author: "Divyansh Kotnala",
    role: "Director and founder - Kotnala Consultancy",
    initial: "DR",
    linkedin: "https://www.linkedin.com/in/divyanshkotnala/"
  },
  {
    step: "03",
    quote: "In high-pressure designathons, Navneet is the designer you want. He quickly translates complex ideas into clickable, functional interactive prototypes.",
    author: "Arman Singh",
    role: "Designathon Teammate",
    initial: "AS",
    linkedin: "https://www.linkedin.com/in/navneet-patidar/"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6 bg-transparent text-[#111111] border-t border-black/5 relative overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-28 space-y-6 relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm"
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
            className="text-4xl md:text-6xl font-bold tracking-tighter text-black uppercase font-display"
          >
            Words from People I've Worked With
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }} 
            className="text-neutral-500 max-w-lg mx-auto text-lg font-light leading-relaxed"
          >
            Real feedback from clients, teammates, and collaborators across freelance projects, internships, and competitions.
          </motion.p>
        </div>

        {/* Connecting Path Line (Desktop) */}
        <div className="hidden lg:block absolute top-[360px] left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent z-0" />

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
                <div className="w-3 h-3 bg-white border border-neutral-300 rounded-full z-10 group-hover:border-black group-hover:scale-125 transition-all duration-500" />
                <div className="h-8 w-px bg-gradient-to-b from-neutral-200 to-transparent group-hover:from-neutral-400 transition-colors duration-500" />
              </div>

              {/* Card Container */}
              <div className="h-full p-8 pt-10 rounded-[2rem] bg-white border border-neutral-100 hover:border-neutral-200 transition-all duration-700 flex flex-col justify-between items-start text-left group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
                
                {/* Step Number */}
                <div className="absolute top-6 right-8 font-mono text-5xl font-bold text-neutral-100 group-hover:text-neutral-950/5 transition-colors duration-500 select-none">
                  {t.step}
                </div>

                <div className="w-full">
                  {/* Icon / Rating */}
                  <div className="w-14 h-14 mb-8 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center relative z-10 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                    <Quote className="w-6 h-6 stroke-1" />
                  </div>

                  <p className="text-neutral-600 text-sm md:text-base leading-7 font-light italic mb-8 relative z-10 group-hover:text-neutral-800 transition-colors">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info & LinkedIn Link */}
                <div className="w-full flex items-center justify-between pt-6 border-t border-neutral-100 relative z-10">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-neutral-200 bg-neutral-50">
                      <AvatarFallback className="text-neutral-600 font-bold text-xs uppercase group-hover:bg-neutral-900 group-hover:text-white transition-all">
                        {t.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-neutral-900 text-sm font-bold tracking-tight">{t.author}</h4>
                      <p className="text-neutral-400 text-[10px] font-mono uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#0A66C2] hover:bg-blue-50/50 transition-colors duration-300 shrink-0"
                      title="View LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 fill-current stroke-none" />
                    </a>
                  )}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};