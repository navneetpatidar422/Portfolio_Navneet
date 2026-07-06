import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
    User, 
    GraduationCap, 
    Trophy, 
    Briefcase,
    ArrowRight,
    CheckCircle2,
    MapPin,
    Calendar
} from "lucide-react";
import { Button } from "../ui/button";

const experiences = [
  {
    role: "Designer",
    company: "InstantAI",
    period: "Apr 2026 – Present"
  },
  {
    role: "Graphic Design Intern",
    company: "Vedam Advisors",
    period: "Nov 2025 – Feb 2026"
  },
  {
    role: "Design & Content Team",
    company: "AWS Cloud Club GGSIPU",
    period: "Aug 2025 – Present"
  }
];

const tabsData = [
  {
    id: "aboutme",
    step: "01",
    title: "About me",
    icon: User,
    period: "Bio & Focus",
    description: "An aspiring Product Designer with an engineering background and a passion for creating digital experiences that are simple, intuitive, and meaningful.",
    details: [
      "Pursuing B.Tech in Industrial Internet of Things (IIoT).",
      "Discovered design through a curiosity about user-technology interactions.",
      "Worked on freelance, internships, hackathons, and personal concepts.",
      "Designed across fintech, retail, healthcare, and AI domains."
    ]
  },
  {
    id: "academic",
    step: "02",
    title: "Academic Dossier",
    icon: GraduationCap,
    period: "2024 - 2028",
    description: "Pursuing engineering at University School of Automation and Robotics (USAR), GGSIPU, bridging technical and design disciplines.",
    details: [
      "Current CGPA: 8.34 (Academic Excellence)",
      "National Science Fair: 1st Rank in Rajasthan, 4th in India",
      "YET 2022: 11th Rank in Rajasthan"
    ]
  },
  {
    id: "hackathons",
    step: "03",
    title: "Hackathons and Competitions",
    icon: Trophy,
    period: "2024 - 2026",
    description: "Active designer and prototyper participating in high-stress, short-duration design challenges to build evidence-backed solutions.",
    details: [
      "1st Position — BuildSprint Challenge (ARSD College, Delhi)",
      "3rd Position — Ideatex (Organized by BAIT)",
      "Top 10 Finalists — UX Voyage Designathon (NSUT, New Delhi)",
      "Top 10 Finalists — MOCKUP 4.0 Designathon (MUJ, Jaipur)",
      "Top 8 Finalists — UXelerate (USAR GGSIPU, Delhi)",
      "1st Rank — Phenomenal Frame '24 (Poster Designing)"
    ]
  },
  {
    id: "experience",
    step: "04",
    title: "Experience",
    icon: Briefcase,
    period: "Professional Roles",
    description: "Work experience spanning design internships, freelance consulting, and cloud community contributions.",
    details: []
  }
];

// ─── Minimal & Sleek Experience Timeline ──────────────────────────────────────
const ExperienceTimeline = () => (
  <div className="relative pl-6 border-l border-neutral-200/80 space-y-8 py-2 ml-2">
    {experiences.map((exp, i) => (
      <motion.div
        key={exp.company}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
        className="relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        {/* Timeline Node Point */}
        <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-900 border-2 border-white ring-4 ring-[#FAF9F5]/40 transition-transform duration-300 group-hover:scale-125" />

        {/* Role & Company Stack */}
        <div>
          <h4 className="text-base font-bold text-neutral-900 leading-tight group-hover:text-black transition-colors">
            {exp.role}
          </h4>
          <p className="text-sm font-medium text-neutral-500 mt-1">
            {exp.company}
          </p>
        </div>

        {/* Timeline Period */}
        <div className="text-neutral-500 text-xs font-mono tracking-wider sm:text-right shrink-0 mt-1 sm:mt-0 bg-neutral-100/80 px-3 py-1 rounded-full border border-neutral-200/50">
          {exp.period}
        </div>
      </motion.div>
    ))}
  </div>
);

export const AboutMe = () => {
  const [activeTab, setActiveTab] = useState<string>("aboutme");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={containerRef} id="about" className="py-24 lg:py-32 px-6 bg-transparent text-black relative overflow-hidden border-t border-black/5">
      {/* Ambient Background Glows */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1.5 w-12 bg-neutral-900" />
                  <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs font-mono">Dossier</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-neutral-900 mb-4">About Me</h2>
                <p className="text-neutral-600 max-w-lg text-lg leading-relaxed font-light">
                    Engineering meets empathy. Research meets craft. I'm Navneet Patidar, a Product Designer based in New Delhi, India.
                </p>
            </motion.div>
        </div>

        {/* Center Intro Description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20 space-y-5"
        >
          <p className="text-neutral-600 text-lg leading-relaxed font-body">
            An aspiring Product Designer with an engineering background and a passion for creating digital experiences that are simple, intuitive, and meaningful.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed font-body">
            Currently pursuing my B.Tech in Industrial Internet of Things (IIoT) at USAR, GGSIPU, I discovered design through a curiosity about how people interact with technology. Since then, I've worked on freelance projects, internships, hackathons, and personal concepts across fintech, retail, healthcare, and AI.
          </p>
          <p className="text-neutral-600 text-lg leading-relaxed font-body">
            I enjoy simplifying complex problems, designing user-centered products, and continuously learning. My goal is to build products that create real value while growing as a designer alongside talented teams.
          </p>

          <div className="pt-2">
            <a href="#contact">
              <Button variant="outline" className="rounded-full border-neutral-200 bg-white hover:bg-black hover:text-white transition-all px-8 h-12 shadow-sm water-btn">
                Let's Collaborate
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Master-Detail Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Interactive Navigation Menu */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
                {tabsData.map((tab) => (
                    <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border group relative overflow-hidden ${
                                activeTab === tab.id 
                                ? "bg-white border-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)]" 
                                : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                            }`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <span className={`font-mono text-xs tracking-widest font-bold ${activeTab === tab.id ? "text-purple-600" : "text-neutral-400"}`}>
                                        {tab.step}
                                    </span>
                                    <div className="flex flex-col">
                                      <span className={`text-lg font-bold tracking-wide transition-colors ${activeTab === tab.id ? "text-black" : "text-neutral-600 group-hover:text-black"}`}>
                                          {tab.title}
                                      </span>
                                      <span className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{tab.period}</span>
                                    </div>
                                </div>
                                <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeTab === tab.id ? "text-purple-600 translate-x-0" : "text-neutral-400 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                            </div>
                            
                            {/* Mobile-Only Accordion Content */}
                            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeTab === tab.id ? "max-h-[1200px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
                              {tab.id === "experience" ? (
                                <div className="border-t border-black/5 pt-4">
                                  <ExperienceTimeline />
                                </div>
                              ) : (
                                <>
                                  <p className="text-neutral-600 mb-6 leading-relaxed text-sm border-t border-black/5 pt-4 font-light">
                                      {tab.description}
                                  </p>
                                  <div className="grid grid-cols-1 gap-3 mb-6">
                                      {tab.details.map(d => (
                                          <div key={d} className="flex items-start gap-3 text-sm text-neutral-700">
                                              <CheckCircle2 className="w-4 h-4 text-purple-500/60 shrink-0 mt-0.5" />
                                              <span>{d}</span>
                                          </div>
                                      ))}
                                  </div>
                                </>
                              )}
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Right Column: Detailed Card (Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-7 relative min-h-[480px]">
                <div className="sticky top-32">
                    <AnimatePresence mode="wait">
                        {tabsData.map((tab) => (
                            activeTab === tab.id && (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="relative bg-white/80 backdrop-blur-2xl border border-black/10 rounded-[2rem] p-8 overflow-hidden shadow-xl"
                                >
                                    {/* Abstract Decor */}
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                      {tab.id === "experience" ? (
                                        // ── Minimal Experience Timeline ──
                                        <>
                                          <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                              <div className="p-3 bg-gradient-to-br from-black/5 to-transparent rounded-xl border border-black/5">
                                                <tab.icon className="w-6 h-6 text-black" />
                                              </div>
                                              <div>
                                                <h3 className="text-xl font-bold text-black tracking-tight">Experience</h3>
                                                <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">Professional Roles</p>
                                              </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{experiences.length} roles</span>
                                          </div>
                                          <ExperienceTimeline />
                                        </>
                                      ) : (
                                        // ── Standard Tab Detail ──
                                        <>
                                          <div className="flex items-start justify-between mb-8">
                                              <div className="p-4 bg-gradient-to-br from-black/5 to-transparent rounded-2xl border border-black/5 shadow-inner">
                                                  <tab.icon className="w-7 h-7 text-black" />
                                              </div>
                                              <div className="px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full">
                                                  <span className="text-neutral-600 text-[10px] font-mono uppercase tracking-widest font-bold">{tab.period}</span>
                                              </div>
                                          </div>

                                          <h3 className="text-3xl font-bold text-black mb-4 leading-tight tracking-tight">{tab.title}</h3>
                                          <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-xl font-light">
                                              {tab.description}
                                          </p>

                                          <div className="grid grid-cols-1 gap-y-4 mb-4">
                                              {tab.details.map((item) => (
                                                  <div key={item} className="flex items-start gap-3 group">
                                                      <CheckCircle2 className="w-4 h-4 text-purple-500/50 group-hover:text-purple-600 transition-colors shrink-0 mt-1" />
                                                      <span className="text-neutral-600 text-sm group-hover:text-black transition-colors">{item}</span>
                                                  </div>
                                              ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
