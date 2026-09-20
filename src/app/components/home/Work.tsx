import { motion } from "motion/react";
import { SquigglyText } from "../ui/squiggly-text";
import { ProjectCarousel } from "./ProjectCarousel";

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
    title: "ISRO 2.O - Unveil the Solar Wonders",
    subtitle: "My first-ever UI/UX project — a solar-system exploration concept built to learn component-based animation.",
    year: "2024",
    image: "/projects/isro-thumb.jpg",
    tags: ["First UI/UX Project", "UI Concept", "Space Tech"],
    path: "/work/isro",
    color: "#2563EB"
  }
];

export const Work = () => {
  return (
    <section id="work" className="py-24 lg:py-32 px-6 bg-transparent text-foreground border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
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
              SELECTED{" "}
              <SquigglyText scale={[5, 8]} className="bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white px-3 sm:px-4 py-0.5 md:py-1 rounded-md shadow-md inline-block my-1">
                PROJECTS
              </SquigglyText>
            </h2>

            <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-body font-light leading-relaxed transition-colors duration-500">
              A curated collection of product design projects, designathon entries, and concepts—crafted through thoughtful problem-solving, systems thinking, and interactive experiences
            </p>
          </motion.div>
        </div>

        {/* Horizontal Project Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <ProjectCarousel projects={projects} />
        </motion.div>

      </div>
    </section>
  );
};
