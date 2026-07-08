import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Layers, Eye, Compass, CheckSquare } from "lucide-react";
import { Link } from "react-router";
import { Recommendations } from "./Recommendations";
import { ProjectReview } from "./ProjectReview";

export const AmazonCaseStudy = () => {
  return (
    <div className="case-study-page bg-transparent min-h-screen text-[#111111] font-body pt-24 pb-16 selection:bg-[#FF9900] selection:text-black">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-[#FF9900] font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#FF9900] text-black text-xs font-mono uppercase tracking-widest px-3 py-1 rounded font-bold">UX Study</span>
          <span className="bg-neutral-200 text-neutral-800 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">Redesign Exercise</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-neutral-900 mb-6 leading-none">
          Redesigning the E-Commerce website product page to reduce the visual noise.
        </h1>
        <p className="text-xl md:text-2xl font-serif text-neutral-600 max-w-3xl leading-relaxed italic">
          Same information, same functionality — redesigned to cut visual noise and let the important things win.
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-neutral-200">
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Type</span>
            <span className="font-semibold text-neutral-800">UX Audit & UI Redesign</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Constraint</span>
            <span className="font-semibold text-neutral-800 font-serif">Preserve All Original Scope</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Focus</span>
            <span className="font-semibold text-neutral-800">Visual Noise & Hierarchy</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Brand Accent</span>
            <span className="font-semibold text-[#FF9900] flex items-center gap-1.5 font-mono">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF9900] inline-block" /> #FF9900
            </span>
          </div>
        </div>
      </header>

      {/* Pull Quote */}
      <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="border-t border-b border-neutral-200 py-10">
          <p className="font-serif text-2xl md:text-3xl italic text-neutral-800 leading-relaxed max-w-3xl mx-auto">
            "Improve usability without forcing users to adapt to a completely new mental model."
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wide border-b border-neutral-200 pb-2 text-neutral-800">
            Executive Summary
          </h2>
          <p className="text-neutral-700 leading-relaxed text-lg">
            This project focuses on auditing and redesigning Amazon's core mobile/web product detail page. Rather than trying to introduce new features, AI assistants, or gamified mechanics, the challenge lay in a strict layout constraint: <strong>keep all existing information, pricing models, merchant specs, and CTAs exactly intact</strong>.
          </p>
          <p className="text-neutral-700 leading-relaxed text-lg">
            By systemizing card layouts, separating sections via clean borders and whitespace, and adjusting text weights, the resulting layout improves data parsing speed and reduces cognitive clutter.
          </p>
        </div>
        <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-display text-lg uppercase tracking-wider text-[#FF9900] font-bold">The Rule Book</h3>
          <ul className="space-y-3 text-xs text-neutral-600 font-mono">
            <li className="flex gap-2">✓ No deleted specs</li>
            <li className="flex gap-2">✓ No hidden price nodes</li>
            <li className="flex gap-2">✓ Standard CTA actions</li>
            <li className="flex gap-2">✓ Retain reviews listing</li>
            <li className="flex gap-2">✓ Maintain product variants</li>
          </ul>
        </div>
      </section>

      {/* Audit findings & Improvements table */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-neutral-900 tracking-wide mb-8 border-b border-neutral-200 pb-2">
          UX Audit Findings & Improvements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <Layers className="w-8 h-8 text-[#FF9900] mb-4" />
            <h3 className="font-bold text-lg text-neutral-800 mb-2 uppercase tracking-wide text-xs">Information Hierarchy</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Price, product title, and core Action Buttons (Buy Now, Add to Cart) stand out far more clearly. Related details like shipping thresholds are grouped into single cards rather than being scattered randomly across the page.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <Eye className="w-8 h-8 text-[#FF9900] mb-4" />
            <h3 className="font-bold text-lg text-neutral-800 mb-2 uppercase tracking-wide text-xs">Visual Clutter Reduction</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              The original page presents an overwhelming grid of text links and small icons. The redesign introduces generous whitespace, cleaner border separators, and optimized padding to divide sections.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <Compass className="w-8 h-8 text-[#FF9900] mb-4" />
            <h3 className="font-bold text-lg text-neutral-800 mb-2 uppercase tracking-wide text-xs">Scanning Speed</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Eye tracking studies indicate users seek price, stock indicators, and delivery details first. The redesign surfaces these crucial data points in the top half of the screen using structured metadata columns.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <CheckSquare className="w-8 h-8 text-[#FF9900] mb-4" />
            <h3 className="font-bold text-lg text-neutral-800 mb-2 uppercase tracking-wide text-xs">Visual Consistency</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Unified border radii, matching padding offsets, standardized font weight scales, and consistent icon sets create a coherent layout that replaces the ad-hoc structures of the current live site.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Figma Embed */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-neutral-900 tracking-wide mb-6">
          Interactive Design Embed
        </h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm pointer-events-auto z-10">
          <iframe 
            style={{ border: "none" }} 
            width="100%" 
            height="100%"
            src="https://embed.figma.com/proto/ECj0DxTheByc4ZInWmOz2g/Amazon-Product-Redesign?scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=29-2256&embed-host=share"
            allowFullScreen
            allow="clipboard-write; gamepad; vr; gyroscope; accelerometer"
            className="w-full h-full relative pointer-events-auto z-20"
          ></iframe>
        </div>
      </section>

      {/* Mockup Showcase */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-neutral-900 tracking-wide mb-8">
          Old v/s Redesign
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl bg-white/60 border border-amber-100 shadow-md p-6 md:p-10">
          <img
            src="/mockups/Amazon_Redesign.png"
            alt="Amazon Headphone Redesign Mockups"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="amazon" accentColor="#FF9900" />

      {/* Recommendations Section */}
      <Recommendations currentId="amazon" />
    </div>
  );
};
