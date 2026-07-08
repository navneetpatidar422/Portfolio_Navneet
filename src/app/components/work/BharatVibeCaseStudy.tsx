import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Compass, ShieldAlert, Award, Star, Share2 } from "lucide-react";
import { Link } from "react-router";
import { Recommendations } from "./Recommendations";
import { ProjectReview } from "./ProjectReview";

export const BharatVibeCaseStudy = () => {
  return (
    <div className="case-study-page bg-transparent min-h-screen text-[#1D0C00] font-ibm-serif pt-24 pb-16 selection:bg-[#1D0C00] selection:text-white">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#5C4533] hover:text-[#1D0C00] font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#1D0C00] text-white text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">UI Concept</span>
          <span className="bg-amber-100 text-[#1D0C00] text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">Independence Day Special</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-[#1D0C00] mb-6 leading-none">
          What If Our Freedom Fighters Had Instagram?
        </h1>
        <p className="text-xl md:text-2xl font-serif text-[#5C4533] max-w-3xl leading-relaxed italic">
          A tribute-based UI concept reimagining Instagram through the soul of India — not an app redesign, but an emotional timeline of India's journey. 🇮🇳🕊
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-[#1D0C00]/10">
          <div>
            <span className="text-[#5C4533] text-xs uppercase tracking-widest block mb-1">Role</span>
            <span className="font-semibold text-[#1D0C00]">Solo Concept & Visual Designer</span>
          </div>
          <div>
            <span className="text-[#5C4533] text-xs uppercase tracking-widest block mb-1">Timeline</span>
            <span className="font-semibold text-[#1D0C00]">August 2025</span>
          </div>
          <div>
            <span className="text-[#5C4533] text-xs uppercase tracking-widest block mb-1">Theme Font</span>
            <span className="font-semibold text-[#1D0C00]">IBM Plex Serif</span>
          </div>
          <div>
            <span className="text-[#5C4533] text-xs uppercase tracking-widest block mb-1">Accent Hex</span>
            <span className="font-semibold text-[#1D0C00] flex items-center gap-1.5 font-mono">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1D0C00] inline-block" /> #1D0C00
            </span>
          </div>
        </div>
      </header>

      {/* Poetic Quote Hook */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <div className="border-t border-b border-[#1D0C00]/10 py-12">
          <p className="text-3xl md:text-4xl italic text-[#1D0C00] leading-relaxed max-w-3xl mx-auto font-serif">
            "Because freedom is not just in textbooks — it lives in our emotions, our platforms, and now… our designs."
          </p>
          <span className="block text-xs uppercase tracking-widest font-mono text-[#5C4533] mt-6">— NAVNEET PATIDAR</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wide border-b border-[#1D0C00]/10 pb-2">
            The Vision 🧠📸
          </h2>
          <p className="text-neutral-800 leading-relaxed text-lg">
            BharatVibe asks a bold "what if": what if heroes like Subhash Chandra Bose, Rani Laxmi Bai, and Sardar Patel could share their moments, thoughts, and struggles the way we share on Instagram today?
          </p>
          <p className="text-neutral-800 leading-relaxed text-lg">
            This design exploration strips away standard Western visual metaphors and reimagines the entire interaction stack of social media through the historical lens of India's independence struggle.
          </p>
        </div>
        <div className="bg-[#F3EFE9] border border-[#1D0C00]/10 p-8 rounded-2xl space-y-4">
          <h3 className="font-display text-lg uppercase tracking-wider text-[#1D0C00]">Project Mood 🇮🇳</h3>
          <p className="text-neutral-700 text-sm leading-relaxed">
            Every icon, label, and gesture was carefully rewritten to represent Indian historical symbols: conch shells for alerts, pigeon mail for shares, and scrolls for private messages.
          </p>
        </div>
      </section>

      {/* Concept Mapping Table */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1D0C00] tracking-wide mb-8 border-b border-[#1D0C00]/10 pb-2">
          Interface Re-Skin Mapping
        </h2>
        <div className="overflow-x-auto border border-[#1D0C00]/10 rounded-2xl shadow-sm">
          <table className="w-full text-left bg-white text-sm">
            <thead className="bg-[#1D0C00] text-[#FAF6F0] font-display text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Instagram UI Term</th>
                <th className="py-4 px-6">BharatVibe Reinterpretation</th>
                <th className="py-4 px-6">Symbolic Context & Historical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D0C00]/5 text-neutral-800">
              <tr>
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Home</td>
                <td className="py-4 px-6 font-bold">India Gate 🏛</td>
                <td className="py-4 px-6 text-neutral-600">Honors the fallen — the digital gateway to stories of sacrifice & grit.</td>
              </tr>
              <tr className="bg-[#FAF6F0]/30">
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Explore</td>
                <td className="py-4 px-6 font-bold">Telescope of Tiranga 🔭</td>
                <td className="py-4 px-6 text-neutral-600">A modern Bharat Darshan — discovering legend, cultural roots & heritage.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Reels</td>
                <td className="py-4 px-6 font-bold">Ashoka Chakra / Veer Gaathayein 🎡</td>
                <td className="py-4 px-6 text-neutral-600">The wheel of bravery — each spinning frame holds a freedom fighter's story.</td>
              </tr>
              <tr className="bg-[#FAF6F0]/30">
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Notifications</td>
                <td className="py-4 px-6 font-bold">Shankh (conch) 🐚</td>
                <td className="py-4 px-6 text-neutral-600">Symbol of awakening — a call to engage with echoing historical updates.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Messages / Comments</td>
                <td className="py-4 px-6 font-bold">Patra Scroll 📜</td>
                <td className="py-4 px-6 text-neutral-600">Inspired by historical letters, delivering deep and thoughtful dialogue.</td>
              </tr>
              <tr className="bg-[#FAF6F0]/30">
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Share</td>
                <td className="py-4 px-6 font-bold">Pigeon Mail 🕊</td>
                <td className="py-4 px-6 text-neutral-600">Homage to ancient message delivery systems, sending emotions across grids.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Save</td>
                <td className="py-4 px-6 font-bold">Ancient Locker 🔒</td>
                <td className="py-4 px-6 text-neutral-600">Like preserving sacred scripts & relics — archive the moments that matter.</td>
              </tr>
              <tr className="bg-[#FAF6F0]/30">
                <td className="py-4 px-6 font-bold font-mono text-[#1D0C00]">Story</td>
                <td className="py-4 px-6 font-bold">Your Struggle 💪</td>
                <td className="py-4 px-6 text-neutral-600">Personal story format reframed as one's personal struggle/journey to progress.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Figma Embed */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1D0C00] tracking-wide mb-6">
          Interactive Design Embed
        </h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-[#1D0C00]/10 pointer-events-auto z-10">
          <iframe 
            style={{ border: "none" }} 
            width="100%" 
            height="100%"
            src="https://embed.figma.com/proto/X86rdnqnt3CYH6z8GV0wqO/Bharat-Vibe?node-id=1-9&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A9&embed-host=share"
            allowFullScreen
            allow="clipboard-write; gamepad; vr; gyroscope; accelerometer"
            className="w-full h-full relative pointer-events-auto z-20"
          ></iframe>
        </div>
      </section>

      {/* Layout Concept Grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20 bg-white p-8 md:p-12 rounded-3xl border border-[#1D0C00]/5">
        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-[#1D0C00] mb-6">
          Aesthetics & Design Language
        </h2>
        <p className="text-neutral-700 leading-relaxed text-lg mb-8">
          The color choices draw from terracotta soils, vintage parchment, and national tri-colors. To mirror the era, fonts were swapped to IBM Plex Serif, giving posts the visual weight of historical dispatches and official journals. Buttons carry solid, heavy borders instead of subtle dropshadows, ensuring a bold, retro-brutalist tactile layout.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-mono font-bold uppercase tracking-wider">
          <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#1D0C00]/10">
            <span>Soil Brown</span>
            <span className="block mt-2 font-bold font-mono">#1D0C00</span>
          </div>
          <div className="bg-[#FF9933]/15 text-[#1D0C00] p-6 rounded-xl border border-[#1D0C00]/10">
            <span>Saffron Accent</span>
            <span className="block mt-2 font-bold font-mono">#FF9933</span>
          </div>
          <div className="bg-[#128807]/15 text-[#1D0C00] p-6 rounded-xl border border-[#1D0C00]/10">
            <span>Green Accent</span>
            <span className="block mt-2 font-bold font-mono">#128807</span>
          </div>
          <div className="bg-[#EAE6DC] p-6 rounded-xl border border-[#1D0C00]/10">
            <span>Paper White</span>
            <span className="block mt-2 font-bold font-mono">#EAE6DC</span>
          </div>
        </div>
      </section>

      {/* Mockup Showcase */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1D0C00] tracking-wide mb-8">
          App Mockups
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl bg-white/60 border border-orange-100 shadow-md p-6 md:p-10">
          <img
            src="/mockups/bharatvibe.png"
            alt="BharatVibe Mockups"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="bharatvibe" accentColor="#FF6B35" />

      {/* Recommendations Section */}
      <Recommendations currentId="bharatvibe" />
    </div>
  );
};
