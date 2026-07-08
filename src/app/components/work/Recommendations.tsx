import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

// ← Uses the actual local project thumbnails from /public/projects/
const projects = [
  {
    id: "Retail_Management",
    title: "Jewellery Retail MANAGEMENT SYSTEM",
    subtitle: "Digitizing pricing, inventory, billing, employee operations, and customer experiences for a confidential client.",
    year: "2026",
    image: "/projects/Retail_Management-thumb.jpg",
    tags: ["Paid Project", "Confidential"],
    path: "/work/Retail_Management"
  },
  {
    id: "paygo",
    title: "A Voice-Guided UPI Layer for the Users Fintech Forgot",
    subtitle: "Reframing digital payments from \"hard to use\" to \"terrifying to get wrong\" — and designing for the fear, not just the flow.",
    year: "2025",
    image: "/projects/paygo-thumb.jpg",
    tags: ["Case Study", "Accessibility"],
    path: "/work/paygo"
  },
  {
    id: "bharatvibe",
    title: "What If Our Freedom Fighters Had Instagram?",
    subtitle: "A tribute-based UI concept reimagining Instagram through the soul of India — not an app redesign, but an emotional timeline of India's journey.",
    year: "2025",
    image: "/projects/bharatvibe-thumb.jpg",
    tags: ["UI Concept", "Independence Day"],
    path: "/work/bharatvibe"
  },
  {
    id: "flashback",
    title: "Relive forgotten memories with AI-Powered Digital Memory Keeper",
    subtitle: "An AI journaling app that helps people revisit, reflect, and relive forgotten memories through smart categorization and digital time capsules.",
    year: "2025",
    image: "/projects/flashback-thumb.jpg",
    tags: ["Hackathon", "Adobe Designathon"],
    path: "/work/flashback"
  },
  {
    id: "amazon",
    title: "Redesigning the E-Commerce website product page to reduce the visual noise.",
    subtitle: "Same information, same functionality — redesigned to cut visual noise and let the important things win.",
    year: "2026",
    image: "/projects/amazon-thumb.jpg",
    tags: ["UX Study", "Redesign Exercise"],
    path: "/work/amazon"
  },
  {
    id: "isro",
    title: "ISRO 2.O — Unveil the Solar Wonders",
    subtitle: "Navneet's first-ever UI/UX project — a solar-system exploration concept built to learn component-based animation.",
    year: "2024",
    image: "/projects/isro-thumb.jpg",
    tags: ["Personal", "Component Motion"],
    path: "/work/isro"
  }
];

export const Recommendations = ({ currentId }: { currentId: string }) => {
  const recommended = projects.filter(p => p.id !== currentId);
  const isDarkPage = currentId === "isro";

  return (
    <section className={`max-w-5xl mx-auto px-6 pt-16 mt-20 border-t ${
      isDarkPage ? "border-white/10" : "border-black/10"
    }`}>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-xl md:text-2xl font-display uppercase tracking-tight ${
          isDarkPage ? "text-white" : "text-neutral-900"
        }`}>
          Other Projects
        </h3>
        <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
          Swipe to explore &rarr;
        </span>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
        {recommended.map(project => (
          <Link
            key={project.id}
            to={project.path}
            className={`group block w-[280px] md:w-[320px] shrink-0 snap-start rounded-[1.5rem] p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border ${
              isDarkPage 
                ? "bg-neutral-900/40 border-white/5 hover:border-white/20" 
                : "bg-[#FAF9F5] border-black/5 dark:bg-neutral-900/40 dark:border-white/5 hover:border-black/10 dark:hover:border-white"
            }`}
          >
            <div>
              {/* Thumbnail */}
              <div className={`overflow-hidden rounded-xl aspect-[4/3] bg-neutral-100 mb-4 border relative ${
                isDarkPage ? "border-white/5" : "border-black/5"
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="bg-[#C5A059] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shrink-0">
                  {project.year}
                </span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase truncate">
                  {project.tags[0]}
                </span>
              </div>

              <h4 className={`text-base font-bold tracking-tight font-body leading-snug line-clamp-2 min-h-[2.5rem] transition-colors duration-300 ${
                isDarkPage 
                  ? "text-white group-hover:text-[#C5A059]" 
                  : "text-neutral-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-[#C5A059]"
              }`}>
                {project.title}
              </h4>
            </div>

            <div className="pt-4 mt-auto">
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm select-none ${
                isDarkPage 
                  ? "bg-white text-neutral-950 group-hover:bg-[#C5A059] group-hover:text-white" 
                  : "bg-black text-[#F7F4EE] group-hover:bg-[#C5A059] group-hover:text-white"
              }`}>
                <span>View Project</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
