import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

const projects = [
  {
    id: "pratham",
    title: "RETAIL MANAGEMENT SYSTEM",
    subtitle: "Digitizing pricing, inventory, billing, employee operations, and customer experiences for a confidential RETAILer.",
    year: "2026",
    image: "/projects/pratham-thumb.jpg",
    tags: ["FIRST FREELANCE PAID PROJECT", "CONFIDENTIAL","Retail Management App"],
    path: "/work/pratham"
  },
  {
    id: "paygo",
    title: "A Voice-Guided UPI Layer for the Users Fintech Forgot",
    subtitle: "Reframing digital payments from \"hard to use\" to \"terrifying to get wrong\" — and designing for the fear, not just the flow.",
    year: "2025",
    image: "/projects/paygo-thumb.jpg",
    tags: ["Case Study", "Accessibility & Inclusive Design","Designathon Project"],
    path: "/work/paygo"
  },
  {
    id: "bharatvibe",
    title: "What If Our Freedom Fighters Had Instagram?",
    subtitle: "A tribute-based UI concept reimagining Instagram through the soul of India — not an app redesign, but an emotional timeline of India's journey.",
    year: "2025",
    image: "/projects/bharatvibe-thumb.jpg",
    tags: ["UI Concept", "Independence Day 2025 Special"],
    path: "/work/bharatvibe"
  },
  {
    id: "flashback",
    title: "Relive forgotten memories with AI-Powered Digital Memory Keeper",
    subtitle: "An AI journaling app that helps people revisit, reflect, and relive forgotten memories through smart categorization and digital time capsules.",
    year: "2025",
    image: "/projects/flashback-thumb.jpg",
    tags: ["Designathon Entry","Digital Time Capsule","Adobe Designathon,IITD"],
    path: "/work/flashback"
  },
  {
    id: "amazon",
    title: "Redesigning the E-Commerce website product page to reduce the visual noise.",
    subtitle: "Same information, same functionality — redesigned to cut visual noise and let the important things win.",
    year: "2026",
    image: "/projects/amazon-thumb.jpg",
    tags: ["UX Study", "Redesign Exercise","Amazon"],
    path: "/work/amazon"
  },
  {
    id: "isro",
    title: "ISRO 2.O — Unveil the Solar Wonders",
    subtitle: "My first-ever UI/UX project — a solar-system exploration concept built to learn component-based animation.",
    year: "2024",
    image: "/projects/isro-thumb.jpg",
    tags: ["First UI/UX Project", "UI Concept","Space Tech"],
    path: "/work/isro"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Clean custom ease-out cubic-bezier curve
    }
  }
};

// Project Card Component
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });
    
    // Smooth image scroll parallax
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            className="group block w-full bg-[#FAF9F5] border border-black/5 rounded-[2.5rem] overflow-hidden hover:shadow-xl hover:border-black/10 transition-all duration-500"
        >
            <Link to={project.path} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 items-center cursor-pointer">
                
                {/* Left Side: Thumbnail container */}
                <div className="lg:col-span-6 overflow-hidden rounded-[2rem] bg-neutral-100 aspect-square w-full relative border border-black/5">
                    <div className="absolute inset-0 bg-neutral-200" />
                    
                    <motion.div style={{ y }} className="w-full h-[110%] -mt-[5%]">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                    </motion.div>
                </div>

                {/* Right Side: Descriptive copy */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-center text-left">
                    
                    {/* Tags & Timeline */}
                    <div className="flex flex-wrap gap-2 items-center">
                        {/* Timeline tag */}
                        <Badge 
                            className="bg-[#C5A059] text-white rounded-full px-4 py-1.5 text-xs font-bold font-mono tracking-wider"
                        >
                            {project.year}
                        </Badge>
                        {/* Tag pills */}
                        {project.tags.map((tag) => (
                            <Badge 
                                key={tag} 
                                className="bg-black text-white rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Headline Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight font-body group-hover:text-amber-800 transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description Subparagraph */}
                    <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light font-body">
                        {project.subtitle}
                    </p>

                    {/* Prominent CTA Button - Hover is local to button only */}
                    <div className="pt-4">
                        <span className="inline-flex items-center gap-2 bg-black text-[#F7F4EE] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-sm select-none border border-transparent water-btn">
                            <span>View Project</span>
                            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </span>
                    </div>

                </div>

            </Link>
        </motion.div>
    );
};

export const Work = () => {
  return (
    <section id="work" className="py-24 lg:py-32 px-6 bg-transparent text-black min-h-screen border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        
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
                  <span className="text-neutral-500 font-bold uppercase tracking-widest text-xs font-mono">My Portfolio</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-neutral-900 mb-4">From Problems to Products</h2>
                <p className="text-neutral-600 max-w-lg text-lg leading-relaxed font-light">
                    A collection of products shaped by real challenges, thoughtful decisions, and a belief that great design begins long before the first screen is created.
                </p>
            </motion.div>
        </div>

        {/* Projects Grid List (Horizontal Stacked Format with Staggered animations) */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 lg:space-y-16"
        >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>

      </div>
    </section>
  );
};
