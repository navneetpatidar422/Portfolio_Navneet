import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Orbit, Rocket, Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { Recommendations } from "./Recommendations";
import { ProjectReview } from "./ProjectReview";

const StarField = () => {
  // Generate 120 stars at random positions
  const stars = Array.from({ length: 120 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1.8 + 0.6, // 0.6px to 2.4px
    delay: `${Math.random() * 8}s`, // longer staggered start (0s to 8s)
    duration: `${3 + Math.random() * 5}s` // slower fade speed (3s to 8s)
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.85; transform: scale(1.2); }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationName: "star-twinkle",
            animationDuration: star.duration,
            animationDelay: star.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out"
          }}
        />
      ))}
    </div>
  );
};

export const IsroCaseStudy = () => {
  return (
    <div className="bg-[#050508] min-h-screen text-white font-body pt-24 pb-16 selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <StarField />
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-purple-400 font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-purple-600 text-white text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">Personal Project</span>
          <span className="bg-neutral-900 text-neutral-300 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">Origin Project</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-6 leading-none">
          ISRO 2.O — Unveil the Solar Wonders
        </h1>
        <p className="text-xl md:text-2xl font-serif text-neutral-400 max-w-3xl leading-relaxed italic">
          My first-ever UI/UX project — a solar-system exploration concept built to learn component-based animation.
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-neutral-900">
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Timeline</span>
            <span className="font-semibold text-neutral-200">December 2024</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Focus</span>
            <span className="font-semibold text-neutral-200">Animation & Component Variants</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Theme Style</span>
            <span className="font-semibold text-neutral-200">Space Tech (Dark Mode)</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Primary Color</span>
            <span className="font-semibold text-purple-400 flex items-center gap-1.5 font-mono">
              <span className="w-3.5 h-3.5 rounded-full bg-purple-500 inline-block" /> #A855F7
            </span>
          </div>
        </div>
      </header>

      {/* Origin Reflection Quote */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <div className="py-10 bg-gradient-to-br from-purple-950/60 to-neutral-950/80 rounded-3xl p-8 border border-purple-900/40 backdrop-blur-sm">
          <p className="font-serif text-2xl md:text-3xl italic text-white leading-relaxed max-w-3xl mx-auto">
            &ldquo;This was my first UI/UX project, making it one of the most meaningful milestones in my journey.&rdquo;
          </p>
          <span className="mt-4 block text-xs font-mono uppercase tracking-widest text-purple-400">— Navneet Patidar</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wide border-b border-purple-900/50 pb-3 text-purple-400">
            The Origin Story
          </h2>
          <p className="text-neutral-200 leading-relaxed text-lg">
            ISRO 2.O marks my initial entry into the field of digital user interfaces. Developed in late 2024, the website concept redesigns India's space program portal with a futuristic theme. 
          </p>
          <p className="text-neutral-200 leading-relaxed text-lg">
            Rather than emphasizing detailed user research or structured UX audit spreadsheets, the goal was to master Figma's animation capabilities—experimenting with timed loops, auto-transition variables, and interactive hover component states.
          </p>
        </div>
        <div className="bg-purple-950/40 border border-purple-900/50 p-8 rounded-2xl flex flex-col justify-between backdrop-blur-sm">
          <div>
            <h4 className="text-xs uppercase text-purple-400 tracking-wider mb-4 font-bold">Key Learnings</h4>
            <ul className="space-y-3 text-sm text-neutral-200">
              <li className="flex gap-3 items-start"><span className="text-purple-400 mt-0.5">▹</span>Auto-transition timed loops</li>
              <li className="flex gap-3 items-start"><span className="text-purple-400 mt-0.5">▹</span>Component variants hover states</li>
              <li className="flex gap-3 items-start"><span className="text-purple-400 mt-0.5">▹</span>Smart animate transitions</li>
              <li className="flex gap-3 items-start"><span className="text-purple-400 mt-0.5">▹</span>Responsive canvas scaling</li>
            </ul>
          </div>
          <div className="mt-8 text-xs text-neutral-500 font-mono border-t border-purple-900/40 pt-4">
            December 2024 • Figma Learning Milestone
          </div>
        </div>
      </section>

      {/* Re-created Layout features */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-purple-400 tracking-wide mb-8 border-b border-purple-900/50 pb-3">
          Pages &amp; Animations Designed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-purple-950/30 border border-purple-900/40 p-8 rounded-2xl hover:border-purple-700/60 transition-colors duration-300">
            <Orbit className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Solar Orbit Home</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              A visually revolving solar system mockup. Used to practice Figma's timed trigger loops, making planets glide smoothly in orbital circles.
            </p>
          </div>

          <div className="bg-purple-950/30 border border-purple-900/40 p-8 rounded-2xl hover:border-purple-700/60 transition-colors duration-300">
            <Rocket className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Interactive Missions</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Missions listings displaying detailed info overlays. Hovering transitions were systemized via parent-child component variants.
            </p>
          </div>

          <div className="bg-purple-950/30 border border-purple-900/40 p-8 rounded-2xl hover:border-purple-700/60 transition-colors duration-300">
            <BookOpen className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Solar Articles</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              A content hub focusing on ISRO's historical launches. Designed to organize heavy visual assets with structured grid card hierarchies.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Figma Embed */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-purple-400 tracking-wide mb-6">
          Interactive Prototype
        </h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-900 pointer-events-auto z-10">
          <iframe 
            style={{ border: "none" }} 
            width="100%" 
            height="100%"
            src="https://embed.figma.com/proto/IuQgFJ1NiNXG31wRoDnRrr/ISRO-2.O?node-id=10-445&starting-point-node-id=4%3A6&scaling=scale-down-width&content-scaling=fixed&embed-host=share"
            allowFullScreen
            allow="clipboard-write; gamepad; vr; gyroscope; accelerometer"
            className="w-full h-full relative pointer-events-auto z-20"
          ></iframe>
        </div>
      </section>

      {/* Mockup Showcase */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-purple-400 tracking-wide mb-8 border-b border-purple-900/50 pb-3">
          Web Mockups
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl bg-neutral-900/60 border border-purple-900/40 shadow-xl p-6 md:p-10 backdrop-blur-sm">
          <img
            src="/mockups/isro.png"
            alt="ISRO 2.0 Web Mockups"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="isro" accentColor="#2563EB" />

      {/* Recommendations Section */}
      <Recommendations currentId="isro" />
    </div>
  );
};
