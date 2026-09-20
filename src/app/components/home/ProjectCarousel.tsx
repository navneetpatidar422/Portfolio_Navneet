import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  tags: string[];
  path: string;
  color: string;
};

interface ProjectCarouselProps {
  projects: Project[];
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const total = projects.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((c) => mod(c + dir, total));
    },
    [total]
  );

  const prev = () => go(-1);
  const next = () => go(1);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      go(delta < 0 ? 1 : -1);
    }
  };

  const activeProject = projects[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 32, mass: 0.9 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 32, mass: 0.9 },
    }),
  };

  return (
    <div className="relative w-full flex items-center gap-2 sm:gap-4">
      <NavButton onClick={prev} direction="left" color={activeProject.color} />

      <div
        className="flex-1 overflow-hidden rounded-[2.5rem]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <ProjectCard project={activeProject} isDragging={isDragging} />
          </motion.div>
        </AnimatePresence>
      </div>

      <NavButton onClick={next} direction="right" color={activeProject.color} />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   ProjectCard
   • Mobile  (<lg): fixed 360px — 200px image + 152px content (year + title + CTA)
                    No subtitle, no tags. Line-clamp-2 on title. Pixel-identical.
   • Desktop (lg+): fixed 420px — original left-image / right-text grid, full info.
──────────────────────────────────────────────────────────────────────────── */

const ProjectCard = ({
  project,
  isDragging,
}: {
  project: Project;
  isDragging: React.MutableRefObject<boolean>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderColor: isHovered ? `${project.color}60` : undefined }}
      className="group w-full bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden transition-colors duration-500"
    >

      {/* ══════════════════════════════════════════
          MOBILE layout  — shown below lg
          Fixed 360px total, pixel-identical every card
      ══════════════════════════════════════════ */}
      <div
        className="lg:hidden flex flex-col w-full"
        style={{ height: "440px" }}
      >
        {/* Accent bar — 8px */}
        <div style={{ backgroundColor: project.color }} className="h-2 w-full flex-shrink-0" />

        <Link
          to={project.path}
          draggable={false}
          onClick={(e) => isDragging.current && e.preventDefault()}
          className="flex flex-col flex-1 min-h-0"
        >
          {/* Fixed-height image — 200px */}
          <div className="w-full flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800" style={{ height: "185px" }}>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04] will-change-transform"
            />
          </div>

          {/* Content area — fills remaining 152px exactly, overflow hidden */}
          <div className="flex-1 min-h-0 overflow-hidden px-5 pt-4 pb-4 flex flex-col justify-between">

            {/* Top: year badge + title (2 lines max) */}
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <Badge
                style={{ backgroundColor: project.color }}
                className="self-start text-white rounded-full px-3 py-1 text-[10px] font-subheading font-bold uppercase tracking-wider border-none"
              >
                {project.year}
              </Badge>
              <h3
                style={{ color: isHovered ? project.color : undefined }}
                className="text-[1.05rem] leading-snug font-anton uppercase tracking-tight text-neutral-900 dark:text-white transition-colors duration-300"
              >
                {project.title}
              </h3>
            </div>

            {/* Bottom: CTA pinned */}
            <span className="relative inline-flex self-start items-center gap-1.5 bg-[#111111] dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-[10px] font-subheading font-bold uppercase tracking-widest overflow-hidden group/btn cursor-pointer select-none">
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300 flex items-center gap-1">
                <span>View Project</span>
                <ArrowUpRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </span>
              <div
                style={{ backgroundColor: project.color }}
                className="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
              />
            </span>

          </div>
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP layout — hidden below lg
          Fixed 420px — original grid, full content
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:flex-col w-full" style={{ height: "420px" }}>
        {/* Accent bar */}
        <div style={{ backgroundColor: project.color }} className="h-2 w-full flex-shrink-0" />

        <Link
          to={project.path}
          draggable={false}
          className="flex-1 grid grid-cols-12 gap-10 p-10 items-center cursor-pointer min-h-0"
          onClick={(e) => isDragging.current && e.preventDefault()}
        >
          {/* Left: Thumbnail */}
          <div className="col-span-5 overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 h-full relative border border-black/5 dark:border-white/5">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04] will-change-transform"
            />
          </div>

          {/* Right: Copy */}
          <div className="col-span-7 flex flex-col justify-center gap-4 text-left overflow-hidden">

            {/* Year + Tags */}
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

            {/* Title */}
            <h3
              style={{ color: isHovered ? project.color : undefined }}
              className="text-2xl md:text-3xl lg:text-[1.9rem] font-anton uppercase tracking-tight text-neutral-900 dark:text-white leading-tight transition-colors duration-300 line-clamp-3"
            >
              {project.title}
            </h3>

            {/* Subtitle */}
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-body font-light line-clamp-2">
              {project.subtitle}
            </p>

            {/* CTA */}
            <div className="pt-1">
              <span className="relative inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-xs font-subheading font-bold uppercase tracking-widest overflow-hidden group/btn cursor-pointer transition-colors duration-300 select-none">
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
      </div>

    </div>
  );
};

/* ── Nav arrow ───────────────────────────────────────────────────────────── */

const NavButton = ({
  onClick,
  direction,
  color,
}: {
  onClick: () => void;
  direction: "left" | "right";
  color: string;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.08, borderColor: color }}
    whileTap={{ scale: 0.92 }}
    aria-label={direction === "left" ? "Previous project" : "Next project"}
    transition={{ duration: 0.15 }}
    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-neutral-800 dark:text-white transition-colors duration-200"
  >
    {direction === "left" ? (
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
    ) : (
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
    )}
  </motion.button>
);
