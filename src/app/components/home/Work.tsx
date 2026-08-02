import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

const projects = [
  {
    id: "Retail_Management",
    title: "Jewellery Retail MANAGEMENT SYSTEM",
    subtitle: "Digitizing pricing, inventory, billing, employee operations, and customer experiences for a confidential client.",
    year: "2026",
    image: "/projects/Retail_Management-thumb.jpg",
    tags: ["FIRST FREELANCE PAID PROJECT", "CONFIDENTIAL", "Jewellery Retail Management App"],
    path: "/work/Retail_Management",
    color: "#C5A059"
  },
  {
    id: "paygo",
    title: "A Voice-Guided UPI Layer for the Users Fintech Forgot",
    subtitle: "Reframing digital payments from \"hard to use\" to \"terrifying to get wrong\" — and designing for the fear, not just the flow.",
    year: "2025",
    image: "/projects/paygo-thumb.jpg",
    tags: ["Case Study", "Accessibility & Inclusive Design", "Designathon Project"],
    path: "/work/paygo",
    color: "#662AB2"
  },
  {
    id: "bharatvibe",
    title: "What If Our Freedom Fighters Had Instagram?",
    subtitle: "A tribute-based UI concept reimagining Instagram through the soul of India — not an app redesign, but an emotional timeline of India's journey.",
    year: "2025",
    image: "/projects/bharatvibe-thumb.jpg",
    tags: ["UI Concept", "Independence Day 2025 Special"],
    path: "/work/bharatvibe",
    color: "#FF6B35"
  },
  {
    id: "flashback",
    title: "Relive forgotten memories with AI-Powered Digital Memory Keeper",
    subtitle: "An AI journaling app that helps people revisit, reflect, and relive forgotten memories through smart categorization and digital time capsules.",
    year: "2025",
    image: "/projects/flashback-thumb.jpg",
    tags: ["Designathon Entry", "Digital Time Capsule", "Adobe Designathon,IITD"],
    path: "/work/flashback",
    color: "#900C3F"
  },
  {
    id: "amazon",
    title: "Redesigning the E-Commerce website product page to reduce the visual noise.",
    subtitle: "Same information, same functionality — redesigned to cut visual noise and let the important things win.",
    year: "2026",
    image: "/projects/amazon-thumb.jpg",
    tags: ["UX Study", "Redesign Exercise", "Amazon"],
    path: "/work/amazon",
    color: "#FF9900"
  },
  {
    id: "isro",
    title: "ISRO 2.O — Unveil the Solar Wonders",
    subtitle: "My first-ever UI/UX project — a solar-system exploration concept built to learn component-based animation.",
    year: "2024",
    image: "/projects/isro-thumb.jpg",
    tags: ["First UI/UX Project", "UI Concept", "Space Tech"],
    path: "/work/isro",
    color: "#2563EB"
  }
];

// Project Card Component with Smooth 3D Deck Stacking & Signature Brand Colors
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // Smooth scroll scale depth interpolation
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (projects.length - index - 1) * 0.025]
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-24 sm:top-28 md:top-32 mb-12 sm:mb-16"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ 
          scale,
          borderColor: isHovered ? `${project.color}60` : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group block w-full bg-white/95 dark:bg-[#121214]/95 border border-black/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 backdrop-blur-2xl origin-top"
      >
        <Link to={project.path} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 items-center cursor-pointer">
          
          {/* Left Side: Thumbnail container */}
          <div className="lg:col-span-6 overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 aspect-square w-full relative border border-black/5 dark:border-white/5">
            <img 
              src={project.image} 
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* Right Side: Descriptive copy */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center text-left">
            
            {/* Tags & Timeline */}
            <div className="flex flex-wrap gap-2 items-center">
              <Badge 
                style={{ backgroundColor: project.color }}
                className="text-white rounded-full px-4 py-1.5 text-xs font-subheading font-bold uppercase tracking-wider border-none shadow-sm"
              >
                {project.year}
              </Badge>
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full px-4 py-1.5 text-xs font-subheading font-bold uppercase tracking-wider border-none"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Headline Title */}
            <h3 
              style={{ color: isHovered ? project.color : undefined }}
              className="text-2xl md:text-3xl lg:text-4xl font-anton uppercase tracking-tight text-neutral-900 dark:text-white leading-tight transition-colors duration-300"
            >
              {project.title}
            </h3>

            {/* Description Subparagraph */}
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-body font-light">
              {project.subtitle}
            </p>

            {/* Prominent CTA Button with Signature Brand Liquid Fill */}
            <div className="pt-4">
              <span className="relative inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-xs font-subheading font-bold uppercase tracking-widest overflow-hidden group/btn cursor-pointer transition-colors duration-300 select-none shadow-md">
                <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300 flex items-center gap-2">
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </span>
                <div 
                  style={{ backgroundColor: project.color }}
                  className="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" 
                />
              </span>
            </div>

          </div>

        </Link>
      </motion.div>
    </div>
  );
};

export const Work = () => {
  return (
    <section id="work" className="py-24 lg:py-32 px-6 bg-transparent text-foreground min-h-screen border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1.5 w-12 bg-emerald-500 transition-colors duration-500" />
              <span className="text-emerald-500 font-subheading font-bold uppercase tracking-widest text-xs transition-colors duration-500">
                Selected Works
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-anton uppercase tracking-tight text-neutral-900 dark:text-white transition-colors duration-500">
              FEATURED CASE STUDIES
            </h2>
            
            <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-body font-light leading-relaxed transition-colors duration-500">
              A curated collection of product design case studies, designathon entries, and concepts — built with deep research, systems thinking, and interactive motion.
            </p>
          </motion.div>
        </div>

        {/* 3D Stacking Deck Cards Container */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
