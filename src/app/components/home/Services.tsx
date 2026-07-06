import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
    Code, 
    Palette, 
    Search, 
    CheckCircle2, 
    ArrowRight,
    MonitorPlay
} from "lucide-react";
import { Button } from "../ui/button";

const services = [
  {
    id: "ui",
    title: "UI / Visual Design",
    icon: Palette,
    description: "Creating visually stunning and intuitive interfaces that capture your brand's essence.",
    deliverables: ["Design Systems", "High-fidelity Mockups", "Interactive Prototypes", "Iconography"],
    price: "From $3k"
  },
  {
    id: "ux",
    title: "UX Research & Strategy",
    icon: Search,
    description: "Understanding user needs through data and empathy to build products that solve real problems.",
    deliverables: ["User Personas", "Journey Mapping", "Usability Testing", "Wireframing"],
    price: "From $2k"
  },
  {
    id: "dev",
    title: "Frontend Development",
    icon: Code,
    description: "Bringing designs to life with clean, performant, and accessible code using modern frameworks.",
    deliverables: ["React / Next.js", "Tailwind CSS", "Motion Interactions", "Responsive Layouts"],
    price: "From $4k"
  },
  {
    id: "motion",
    title: "Motion & Interaction",
    icon: MonitorPlay,
    description: "Adding life and personality to web experiences through micro-interactions and complex animations.",
    deliverables: ["Lottie Animations", "Scroll Interactions", "Page Transitions", "3D WebGL"],
    price: "From $2k"
  }
];

const process = [
    {
        step: "01",
        title: "Discovery",
        description: "We start by diving deep into your goals, audience, and challenges to set a solid foundation."
    },
    {
        step: "02",
        title: "Strategy",
        description: "Planning the user journey and architecture to ensure a seamless experience."
    },
    {
        step: "03",
        title: "Design",
        description: "Crafting the visual language and interactive elements with iterative feedback loops."
    },
    {
        step: "04",
        title: "Development",
        description: "Turning the vision into reality with pixel-perfect code and performance optimization."
    }
];

export const Services = () => {
  const [activeService, setActiveService] = useState<string | null>("ui");
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} id="services" className="py-24 lg:py-32 px-6 bg-transparent text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>
      
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-black/5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-2xl"
            >
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                    Expertise <span className="text-neutral-400">&</span> Capabilities
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed font-light">
                    We don't just build websites; we engineer digital ecosystems designed to scale, convert, and captivate your audience.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Button variant="outline" className="rounded-full border-neutral-200 bg-transparent text-black hover:bg-black hover:text-white transition-colors px-8 h-12">
                    View Methodology
                </Button>
            </motion.div>
        </div>

        {/* Master-Detail Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-32">
            
            {/* Left Column: Navigation Menu */}
            <div className="lg:col-span-5 flex flex-col gap-3">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => setActiveService(service.id)}
                            className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border group relative overflow-hidden ${
                                activeService === service.id 
                                ? "bg-white border-neutral-200 shadow-[0_0_30px_rgba(0,0,0,0.05)]" 
                                : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                            }`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <span className={`font-mono text-xs tracking-widest ${activeService === service.id ? "text-purple-600" : "text-neutral-400"}`}>
                                        0{index + 1}
                                    </span>
                                    <span className={`text-xl font-medium tracking-wide transition-colors ${activeService === service.id ? "text-black" : "text-neutral-600 group-hover:text-black"}`}>
                                        {service.title}
                                    </span>
                                </div>
                                <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeService === service.id ? "text-purple-600 translate-x-0" : "text-neutral-400 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                            </div>
                            
                            {/* Mobile-Only Accordion Content */}
                            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${activeService === service.id ? "max-h-[800px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
                                <p className="text-neutral-600 mb-6 leading-relaxed text-sm border-t border-black/5 pt-4">
                                    {service.description}
                                </p>
                                <div className="grid grid-cols-1 gap-2 mb-6">
                                    {service.deliverables.map(d => (
                                        <div key={d} className="flex items-center gap-3 text-sm text-neutral-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            {d}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl border border-black/5">
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider">Investment</span>
                                    <p className="text-black font-mono text-sm font-bold">{service.price}</p>
                                </div>
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Right Column: Detailed Card (Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-7 relative h-full min-h-[600px]">
                <div className="sticky top-32">
                    <AnimatePresence mode="wait">
                        {services.map((service) => (
                            activeService === service.id && (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="relative bg-white/80 backdrop-blur-2xl border border-black/10 rounded-[2rem] p-10 overflow-hidden shadow-2xl"
                                >
                                    {/* Abstract Decor */}
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-10">
                                            <div className="p-4 bg-gradient-to-br from-black/5 to-transparent rounded-2xl border border-black/5 shadow-inner">
                                                <service.icon className="w-8 h-8 text-black" />
                                            </div>
                                            <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                                <span className="text-purple-600 text-[10px] font-mono uppercase tracking-widest">Available Now</span>
                                            </div>
                                        </div>

                                        <h3 className="text-4xl font-bold text-black mb-6 leading-tight tracking-tight">{service.title}</h3>
                                        <p className="text-neutral-600 text-lg leading-relaxed mb-12 max-w-xl font-light">
                                            {service.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12">
                                            {service.deliverables.map((item) => (
                                                <div key={item} className="flex items-center gap-3 group">
                                                    <CheckCircle2 className="w-4 h-4 text-purple-500/50 group-hover:text-purple-600 transition-colors" />
                                                    <span className="text-neutral-600 text-sm group-hover:text-black transition-colors">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Starting Investment</span>
                                                <span className="text-2xl font-mono text-black tracking-tight">{service.price}</span>
                                            </div>
                                            <Button className="bg-black text-white hover:bg-neutral-800 rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                                                Start Project
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Process Section - The Blueprint */}
        <div className="relative pt-40 pb-20 overflow-hidden">
            
            {/* Subtle Grainy Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Elegant Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            <div className="text-center mb-40 space-y-6 relative z-10 px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                    <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-neutral-500">
                        Process
                    </span>
                </motion.div>
                
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-black"
                >
                    The Blueprint
                </motion.h3>
                
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }} 
                    className="text-neutral-500 max-w-lg mx-auto text-lg md:text-xl font-light leading-relaxed"
                >
                    Precision engineering meets creative intuition.
                </motion.p>
            </div>

            {/* Connecting Path Line (Desktop) */}
            <div className="hidden lg:block absolute top-[460px] left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-[1400px] mx-auto relative z-10">
                {process.map((p, i) => (
                    <motion.div
                        key={p.step}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="group relative"
                    >
                         {/* Connection Node (Desktop) */}
                         <div className="hidden lg:flex absolute -top-[52px] left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-4 z-10">
                             <div className="w-3 h-3 bg-white border border-neutral-300 rounded-full z-10 group-hover:border-black group-hover:scale-125 transition-all duration-500" />
                             <div className="h-8 w-px bg-gradient-to-b from-neutral-200 to-transparent group-hover:from-neutral-400 transition-colors duration-500" />
                         </div>

                        {/* Card Container - Glassmorphism & Depth */}
                        <div className="h-full p-8 pt-10 rounded-[2rem] bg-white border border-neutral-100 hover:border-neutral-200 transition-all duration-700 flex flex-col items-start text-left group-hover:-translate-y-2 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
                            
                            {/* Ambient Light Effect on Hover */}
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                            
                            {/* Step Number - Architectural Style */}
                            <div className="absolute top-6 right-8 font-mono text-5xl font-bold text-neutral-100 group-hover:text-neutral-900/5 transition-colors duration-500 select-none">
                                {String(i + 1).padStart(2, '0')}
                            </div>

                            {/* Icon Container */}
                            <div className="w-14 h-14 mb-8 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center relative z-10 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                                {i === 0 && <Search className="w-6 h-6 stroke-1 group-hover:stroke-[1.5]" />}
                                {i === 1 && <Palette className="w-6 h-6 stroke-1 group-hover:stroke-[1.5]" />}
                                {i === 2 && <Code className="w-6 h-6 stroke-1 group-hover:stroke-[1.5]" />}
                                {i === 3 && <MonitorPlay className="w-6 h-6 stroke-1 group-hover:stroke-[1.5]" />}
                            </div>

                            <h4 className="text-xl font-bold mb-4 text-black group-hover:tracking-wide transition-all duration-500">{p.title}</h4>
                            
                            <p className="text-neutral-500 text-sm leading-7 font-light group-hover:text-neutral-600 transition-colors duration-500">
                                {p.description}
                            </p>
                            
                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};
