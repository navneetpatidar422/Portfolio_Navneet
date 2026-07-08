import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Brain, Calendar, Heart, Hourglass, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import { Recommendations } from "./Recommendations";
import { ProjectReview } from "./ProjectReview";

export const FlashbackCaseStudy = () => {
  return (
    <div className="case-study-page bg-transparent min-h-screen text-[#111111] font-karla pt-24 pb-16 selection:bg-[#900C3F] selection:text-white">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-[#900C3F] font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#900C3F] text-white text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">First Designathon</span>
          <span className="bg-rose-100 text-[#900C3F] text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">Adobe Designathon (Tryst'25, IIT Delhi)</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-[#900C3F] mb-6 leading-none">
          Relive forgotten memories with AI-Powered Digital Memory Keeper
        </h1>
        <p className="text-xl md:text-2xl font-serif text-neutral-600 max-w-3xl leading-relaxed italic">
          An AI journaling app that helps people revisit, reflect, and relive forgotten memories through smart categorization and digital time capsules.
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-rose-100">
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Team</span>
            <span className="font-semibold text-neutral-800">Navneet Patidar & Arman Singh</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Context</span>
            <span className="font-semibold text-neutral-800">Tryst'25 — IIT Delhi</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Theme Font</span>
            <span className="font-semibold text-neutral-800">Karla</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Brand Color</span>
            <span className="font-semibold text-[#900C3F] flex items-center gap-1.5 font-mono">
              <span className="w-3.5 h-3.5 rounded-full bg-[#900C3F] inline-block" /> #900C3F
            </span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-20 bg-rose-50/30 p-8 md:p-12 rounded-3xl border border-rose-100/50">
        <h2 className="text-2xl md:text-3xl font-display uppercase text-[#900C3F] tracking-wide mb-6">
          Executive Summary
        </h2>
        <p className="text-neutral-700 leading-relaxed text-lg mb-6">
          Flashback is an AI-powered journaling and memory-keeping app created during the Adobe Designathon at IIT Delhi's Tryst'25 . Marking my first-ever designathon, the project was conceptualized and prototyped in under 08 hours.
        </p>
        <p className="text-neutral-700 leading-relaxed text-lg">
          By combining AI-driven categorization, smart notifications, and digital time capsules, Flashback lets users record and experience their personal history in a deeply reflective way.
        </p>
      </section>

      {/* Key Features Grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#900C3F] tracking-wide mb-8 border-b border-rose-100 pb-2">
          Core App Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <h3 className="text-lg font-bold text-[#900C3F] mb-3 uppercase tracking-wide">Photo Journaling</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Combine photos with notes and personal reflections for richer, more meaningful memory logs.
            </p>
          </div>
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <h3 className="text-lg font-bold text-[#900C3F] mb-3 uppercase tracking-wide">AI Event Auto-Categorization</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Automatically sorts memories into events (vacations, birthdays, festivals) based on metadata like time, location, and sentiment.
            </p>
          </div>
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <h3 className="text-lg font-bold text-[#900C3F] mb-3 uppercase tracking-wide">Seasonal memory triggers</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Smart algorithms resurface old photos and journal logs relevant to the current season, months, or upcoming holidays.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works - AI Pipeline */}
      <section className="max-w-5xl mx-auto px-6 mb-20 bg-neutral-950 text-white p-8 md:p-12 rounded-3xl">
        <h2 className="text-3xl font-display uppercase text-rose-400 tracking-wide mb-10 text-center">
          How It Works — AI Integration Flow
        </h2>
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Pipeline */}
          <div className="space-y-12">
            
            <div className="flex gap-6 relative">
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/30 text-rose-400 font-mono font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <h4 className="text-md uppercase font-bold text-white tracking-wider mb-2">Memory Upload</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  User uploads a photo, journal text entry, or voice note to their log. The app reads raw metadata (capture date, GPS location, weather conditions).
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/30 text-rose-400 font-mono font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <h4 className="text-md uppercase font-bold text-white tracking-wider mb-2">AI Context Analysis</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Natural Language Processing (NLP) extracts topics and sentiment from journal entries. Computer vision filters visual tags, counts people, and identifies emotion.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/30 text-rose-400 font-mono font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 className="text-md uppercase font-bold text-white tracking-wider mb-2">Smart Tagging & Graph Mapping</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  The memory is assigned tags (e.g. "Family Time", "Joyful", "Beach Vacation") and linked inside a semantic memory graph to cluster related past events.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/30 text-rose-400 font-mono font-bold flex items-center justify-center shrink-0">4</div>
              <div>
                <h4 className="text-md uppercase font-bold text-white tracking-wider mb-2">Seasonal Retrieval & Prompts</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  AI triggers nostalgic notifications matching current seasons, holiday dates, or unlocks digital time capsules on specific milestone years.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Signature Feature: Digital Time Capsule */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="border-2 border-dashed border-rose-200 p-8 md:p-12 rounded-3xl bg-rose-50/10">
          <div className="max-w-3xl">
            <span className="text-[#900C3F] font-mono text-xs uppercase tracking-widest block mb-2">Signature Experience</span>
            <h2 className="text-3xl font-display uppercase text-[#900C3F] tracking-wide mb-6">
              The Digital Time Capsule — Preserve, Reflect, Relive
            </h2>
            <p className="text-neutral-700 leading-relaxed text-lg mb-8">
              The centerpiece of Flashback is the Digital Time Capsule. Users lock away cherishable memories—photos, voice memos, and journal details—to be unlocked and rediscovered far in the future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mb-8">
            <div className="bg-white border border-neutral-200 p-6 rounded-xl">
              <Calendar className="w-5 h-5 text-[#900C3F] mb-3" />
              <h4 className="font-bold text-neutral-800 mb-1 uppercase tracking-wide text-xs">Unlock Date</h4>
              <p className="text-neutral-500 text-xs">Specify a precise calendar date (e.g. 5 years later, graduation day) to open the capsule.</p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 rounded-xl">
              <Users className="w-5 h-5 text-[#900C3F] mb-3" />
              <h4 className="font-bold text-neutral-800 mb-1 uppercase tracking-wide text-xs">Collaborative Albums</h4>
              <p className="text-neutral-500 text-xs">Invite close friends and family members to add details, building a collective nostalgia experience.</p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 rounded-xl">
              <Hourglass className="w-5 h-5 text-[#900C3F] mb-3" />
              <h4 className="font-bold text-neutral-800 mb-1 uppercase tracking-wide text-xs">AR Recreation Concept</h4>
              <p className="text-neutral-500 text-xs">An extended design hypothesis visualizing 3D AR scenes to let users "walk through" reconstructed 3D memory spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Figma Embed */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#900C3F] tracking-wide mb-6">
          Interactive Prototype
        </h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-rose-100 pointer-events-auto z-10">
          <iframe 
            style={{ border: "none" }} 
            width="100%" 
            height="100%"
            src="https://embed.figma.com/proto/qdNT0g0i3azd97fntAKI6o/Adobe-Designathon?node-id=51-572&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=51%3A572&show-proto-sidebar=1&embed-host=share"
            allowFullScreen
            allow="clipboard-write; gamepad; vr; gyroscope; accelerometer"
            className="w-full h-full relative pointer-events-auto z-20"
          ></iframe>
        </div>
      </section>

      {/* Mockup Showcase */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#900C3F] tracking-wide mb-8">
          App Mockups
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl bg-white/60 border border-rose-100 shadow-md p-6 md:p-10">
          <img
            src="/mockups/flashback.png"
            alt="Flashback App Mockups"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="flashback" accentColor="#900C3F" />

      {/* Recommendations Section */}
      <Recommendations currentId="flashback" />
    </div>
  );
};
