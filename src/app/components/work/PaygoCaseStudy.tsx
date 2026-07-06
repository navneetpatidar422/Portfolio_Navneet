import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Mic, ShieldAlert, Languages, Cpu, CheckCircle, Smartphone } from "lucide-react";
import { Link } from "react-router";
import { Recommendations } from "./Recommendations";
import { ProjectReview } from "./ProjectReview";

export const PaygoCaseStudy = () => {
  return (
    <div className="bg-transparent min-h-screen text-[#111111] font-noto pt-24 pb-16">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-[#662AB2] font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#662AB2] text-white text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full">Case Study</span>
          <span className="bg-purple-100 text-[#662AB2] text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full">Accessibility & Inclusive Design</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-[#662AB2] mb-6 leading-none">
          A Voice-Guided UPI Layer for the Users Fintech Forgot
        </h1>
        <p className="text-xl md:text-2xl font-serif text-neutral-600 max-w-3xl leading-relaxed italic">
          Reframing digital payments from "hard to use" to "terrifying to get wrong" — and designing for the fear, not just the flow.
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-purple-100">
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Role</span>
            <span className="font-semibold text-neutral-800">Solo UX/UI Designer</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Origin</span>
            <span className="font-semibold text-neutral-800">UX Voyage Designathon (NSUT)</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Duration</span>
            <span className="font-semibold text-neutral-800">August 2025</span>
          </div>
          <div>
            <span className="text-neutral-500 text-xs uppercase tracking-widest block mb-1">Color Palette</span>
            <span className="font-semibold text-[#662AB2] flex items-center gap-1.5 font-mono">
              <span className="w-3.5 h-3.5 rounded-full bg-[#662AB2] inline-block" /> #662AB2
            </span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-purple-50/50 p-8 md:p-12 rounded-3xl border border-purple-100">
          <h2 className="text-2xl md:text-3xl font-display uppercase text-[#662AB2] tracking-wide mb-6">
            Executive Summary
          </h2>
          <p className="text-neutral-700 leading-relaxed text-lg mb-6">
            PayGO is a voice-guided UPI (Unified Payments Interface) layer designed for the segment of India's population that digital payments still fail: rural users, low-literacy users, the elderly, and people with low vision. 
          </p>
          <p className="text-neutral-700 leading-relaxed text-lg">
            Rather than building a brand new payment app, PayGO sits on top of the existing UPI framework as an accessibility-first interaction layer. It replaces silent visual scanning and typing with a spoken, verbally confirmed, error-proof flow.
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-5xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-6">
          <h2 className="text-3xl font-display uppercase text-[#662AB2] tracking-wide border-b border-purple-100 pb-2">
            The Problem Statement
          </h2>
          <p className="text-neutral-700 leading-relaxed text-lg">
            Low-literacy, low-vision, elderly, and generally low-tech users struggle with digital UPI payments because most payment interfaces silently assume a baseline of literacy, vision, and confidence these users don't have. This leads a large, digitally-ready population to keep avoiding UPI altogether. We know this because it's a well-documented, large-scale gap in India's fast-expanding digital payment ecosystem.
          </p>
          <div className="border-l-4 border-[#662AB2] pl-6 py-2 my-8">
            <h4 className="text-sm font-bold uppercase text-[#662AB2] tracking-wider mb-1">The Core Insight</h4>
            <p className="text-neutral-900 font-serif text-xl italic leading-relaxed">
              "These users aren't actually scared of the act of paying — they're scared of making an irreversible mistake or falling victim to fraud. That reframe — from 'payments are hard' to 'mistakes are terrifying' — is the design's real starting point."
            </p>
          </div>
        </div>
        <div className="md:col-span-4 bg-neutral-50 p-8 rounded-2xl border border-neutral-200 flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase text-neutral-500 tracking-wider mb-3">Vulnerability Points</h4>
            <ul className="space-y-3 font-medium text-sm text-neutral-700">
              <li className="flex gap-2"><span className="text-[#662AB2]">•</span> Typo-heavy input fields</li>
              <li className="flex gap-2"><span className="text-[#662AB2]">•</span> Fast, silent confirmations</li>
              <li className="flex gap-2"><span className="text-[#662AB2]">•</span> Cluttered promotional ads</li>
              <li className="flex gap-2"><span className="text-[#662AB2]">•</span> Small font sizes on banks</li>
            </ul>
          </div>
          <div className="mt-8 text-xs text-neutral-400 font-mono">
            Designed to target NPCI & BHIM standard banking accessibility gaps.
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-5xl mx-auto px-6 mb-20 bg-neutral-950 text-white p-8 md:p-12 rounded-3xl">
        <h2 className="text-3xl font-display uppercase text-purple-400 tracking-wide mb-10 text-center">
          Design Strategy — Three Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 text-xl font-bold font-mono">01</div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Calm Interface</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Minimal visual distraction, large high-contrast elements, and a strictly linear payment flow so the user is never confused about what step they are on. No ads, no popups.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 text-xl font-bold font-mono">02</div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Voice-First Interaction</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              A voice assistant serves as the primary mode of interaction, giving clear, non-controlling guidance at every step so the user always feels in charge.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 text-xl font-bold font-mono">03</div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Error-Proof Flow</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Mandatory verbal repetition and confirmation of recipient, amount, and payment status — the direct mechanism addressing the core fear of irreversible mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#662AB2] tracking-wide mb-8 border-b border-purple-100 pb-2">
          Key Features & Technical Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-neutral-200 p-6 rounded-2xl hover:border-[#662AB2] transition-colors bg-white">
            <Mic className="w-8 h-8 text-[#662AB2] mb-4" />
            <h4 className="font-bold text-neutral-800 mb-2 uppercase text-xs tracking-wider">Voice-Guided Input</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Removes cognitive load by letting the user speak actions instead of searching and tapping.
            </p>
          </div>
          <div className="border border-neutral-200 p-6 rounded-2xl hover:border-[#662AB2] transition-colors bg-white">
            <ShieldAlert className="w-8 h-8 text-[#662AB2] mb-4" />
            <h4 className="font-bold text-neutral-800 mb-2 uppercase text-xs tracking-wider">Verbal Confirmations</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Prevents accidental money transfers by requiring an explicit verbal "YES" before transactions.
            </p>
          </div>
          <div className="border border-neutral-200 p-6 rounded-2xl hover:border-[#662AB2] transition-colors bg-white">
            <Languages className="w-8 h-8 text-[#662AB2] mb-4" />
            <h4 className="font-bold text-neutral-800 mb-2 uppercase text-xs tracking-wider">Multi-Language</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Widens accessibility across India's regional linguistic diversity (Hindi, Marathi, Tamil, etc.).
            </p>
          </div>
          <div className="border border-neutral-200 p-6 rounded-2xl hover:border-[#662AB2] transition-colors bg-white">
            <Cpu className="w-8 h-8 text-[#662AB2] mb-4" />
            <h4 className="font-bold text-neutral-800 mb-2 uppercase text-xs tracking-wider">On-Device Edge AI</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Cuts latency, enables offline usability, and keeps voice data private on the device hardware.
            </p>
          </div>
        </div>

        {/* Process Flow comparison diagram */}
        <div className="mt-12 bg-neutral-50 border border-neutral-200 rounded-3xl p-8">
          <h3 className="font-display text-xl uppercase tracking-wider text-[#662AB2] mb-6">Linear Flow Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono font-bold text-neutral-400">Traditional UPI App</h4>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="bg-white border p-3 rounded-lg flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-400" /> Open app</div>
                <div className="bg-white border p-3 rounded-lg flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-400" /> Scan QR (Visual Alignment)</div>
                <div className="bg-white border p-3 rounded-lg flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-400" /> Enter Amount (Manual Typing)</div>
                <div className="bg-white border p-3 rounded-lg flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-400" /> Verify (Small green text)</div>
                <div className="bg-white border p-3 rounded-lg flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-400" /> Enter Pin & Wait</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono font-bold text-[#662AB2]">PayGO Accessibility Layer</h4>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="bg-white border border-[#662AB2]/45 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3"><Mic className="w-4 h-4 text-[#662AB2]" /> Speak "Pay Navneet"</div>
                  <span className="bg-purple-100 text-[#662AB2] px-2 py-0.5 rounded text-[10px]">ASR processing</span>
                </div>
                <div className="bg-white border border-[#662AB2]/45 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3"><Languages className="w-4 h-4 text-[#662AB2]" /> Dynamic Highlight Option</div>
                  <span className="bg-purple-100 text-[#662AB2] px-2 py-0.5 rounded text-[10px]">Visual Focus</span>
                </div>
                <div className="bg-white border border-[#662AB2]/45 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-600" /> User confirms verbally</div>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px]">Verbal Confirmation</span>
                </div>
                <div className="bg-white border border-[#662AB2]/45 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-neutral-600" /> Input UPI PIN securely</div>
                  <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px]">Banking Secure SDK</span>
                </div>
                <div className="bg-white border border-[#662AB2]/45 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-600" /> Finished with Success Voice</div>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px]">Clear Audio Feedback</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-neutral-500 text-xs mt-6 leading-relaxed">
            * PayGO integrates with banking-grade authenticated UPI APIs via SDK. It acts as an interaction layer on top of existing fintech rails instead of rebuilding a proprietary banking network.
          </p>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <blockquote className="border-t border-b border-purple-100 py-10">
          <p className="font-serif text-2xl md:text-3xl italic text-[#662AB2] leading-relaxed">
            "PayGO optimizes for certainty rather than speed — turning a payment into a guided conversation where the system confirms user intent before executing anything."
          </p>
        </blockquote>
      </section>

      {/* Interactive Figma Embed */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#662AB2] tracking-wide mb-6">
          Interactive Prototype
        </h2>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-purple-100 pointer-events-auto z-10">
          <iframe 
            style={{ border: "none" }} 
            width="100%" 
            height="100%"
            src="https://embed.figma.com/proto/wtZu0RcNmbq6g7W1cWxNIn/XYZ_PayGO?node-id=1-393&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A340&embed-host=share"
            allowFullScreen
            allow="clipboard-write; gamepad; vr; gyroscope; accelerometer"
            className="w-full h-full relative pointer-events-auto z-20"
          ></iframe>
        </div>
      </section>

      {/* Project Outcomes */}
      <section className="max-w-5xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-2xl font-display uppercase text-[#662AB2]">Designed Outcomes</h3>
          <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
            PayGO is architected to tackle mis-tap risk, double-entry issues, and banking anxiety for non-digital natives. The linearly structured screens feature extremely large font settings, color contrasts exceeding standard WCAG AA specifications, and localized text.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-display uppercase text-[#662AB2]">Next Steps & UX Expansion</h3>
          <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
            Future updates include physical usability test groups with elderly and blind users. Recording these sessions will enable refined audio parameters, conversational speeds, and physical screen layouts.
          </p>
        </div>
      </section>

      {/* Mockup Showcase */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1B998B] tracking-wide mb-8">
          App Mockups
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl bg-white/60 border border-teal-100 shadow-md p-6 md:p-10">
          <img
            src="/mockups/paygo.png"
            alt="PayGo App Mockups"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="paygo" accentColor="#1B998B" />

      {/* Recommendations Section */}
      <Recommendations currentId="paygo" />
    </div>
  );
};
