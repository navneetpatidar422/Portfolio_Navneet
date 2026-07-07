import { Recommendations } from "./Recommendations";
import { Link } from "react-router";
import { ArrowLeft, Lock, Calculator, Database, Star, Sparkles, ShieldAlert, LayoutDashboard, Quote, Linkedin, ArrowDown, ScanLine, ShoppingCart, Receipt, CreditCard, PackageCheck, BookOpen } from "lucide-react";
import { ProjectReview } from "./ProjectReview";

export const Retail_ManagementCaseStudy = () => {
  return (
    <div className="bg-transparent min-h-screen text-[#1C1C1A] selection:bg-[#C5A059] selection:text-white font-body pt-24 pb-16">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#6A6A66] hover:text-[#1E352F] font-bold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16 animate-fadeIn">
        <div className="flex flex-wrap items-center gap-3 mb-4 font-body">
          <span className="bg-[#1E352F] text-[#FBFBFA] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded">FIRST FREELANCE PAID PROJECT</span>
          <span className="bg-[#EAE6DC] text-[#1E352F] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" /> CONFIDENTIAL
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-[#1E352F] mb-6 leading-none">
          Jewellery Retail MANAGEMENT SYSTEM
        </h1>
        <p className="text-xl md:text-2xl font-serif text-[#6A6A66] max-w-3xl leading-relaxed italic">
          Digitizing pricing, inventory, billing, employee operations, and customer experiences for a confidential client.
        </p>

        {/* Metadata Details Table */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-8 mt-8 border-t border-[#1E352F]/10">
          <div>
            <span className="text-[#6A6A66] text-xs uppercase tracking-widest block mb-1">Role</span>
            <span className="font-semibold text-[#1E352F]">Solo Product & UI/UX Designer</span>
          </div>
          <div>
            <span className="text-[#6A6A66] text-xs uppercase tracking-widest block mb-1">Client</span>
            <span className="font-semibold text-[#1E352F]">Confidential / Freelance</span>
          </div>
          <div>
            <span className="text-[#6A6A66] text-xs uppercase tracking-widest block mb-1">Industry</span>
            <span className="font-semibold text-[#1E352F]">Jewellery Retail Operations</span>
          </div>
          <div>
            <span className="text-[#6A6A66] text-xs uppercase tracking-widest block mb-1">Platform</span>
            <span className="font-semibold text-[#1E352F]">Mobile (Android & iOS)</span>
          </div>
          <div>
            <span className="text-[#6A6A66] text-xs uppercase tracking-widest block mb-1">Timeline</span>
            <span className="font-semibold text-[#1E352F]">2026</span>
          </div>
        
        </div>
      </header>

      {/* Confidentiality Notice */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="bg-[#1E352F] text-[#FBFBFA] p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-6 h-6 text-[#C5A059]" />
            <h3 className="text-lg font-bold uppercase tracking-wider font-display text-[#C5A059]">Confidentiality Notice</h3>
          </div>
          <p className="text-[#EAE6DC] leading-relaxed text-sm md:text-base">
            This project was delivered for a private client under a confidentiality agreement. To respect the client's privacy, product identity, interface designs, business workflows, proprietary assets, and implementation details have been intentionally omitted. 
          </p>
          <p className="text-[#EAE6DC] leading-relaxed text-sm md:text-base mt-3">
            This page focuses on my product thinking, UX strategy, system design, and the high-level capabilities I designed without revealing confidential information.
          </p>
        </div>
      </section>

      {/* Executive Summary & Problem */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display uppercase text-[#1E352F] tracking-wide border-b border-[#1E352F]/10 pb-2">
            Executive Summary
          </h2>
          <p className="text-neutral-700 leading-relaxed text-lg">
            This confidential mobile platform was designed for a Jewellery Retail business seeking to modernize manual operational workflows. The product combines pricing automation, inventory management, employee administration, and customer engagement into a single operational ecosystem.
          </p>
          <p className="text-neutral-700 leading-relaxed text-lg">
            My responsibility was to design an intuitive, scalable user experience capable of simplifying complex day-to-day operations while reducing manual effort across the organization. Rather than replacing existing business processes, the solution digitized them through carefully designed workflows that reduced operational friction and created a stronger foundation for future growth.
          </p>
        </div>
        <div className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
          <h2 className="text-2xl font-display uppercase text-[#1E352F] tracking-wide border-b border-[#1E352F]/10 pb-2">
            The Problem
          </h2>
          <p className="text-neutral-600 leading-relaxed text-sm">
            The client relied on multiple disconnected manual processes for pricing, inventory tracking, employee administration, and customer management. These workflows slowed daily operations, increased the likelihood of human error, and made onboarding new employees unnecessarily complex.
          </p>
          <p className="text-neutral-600 leading-relaxed text-sm">
            The challenge wasn't simply building another business application—it was designing an operational experience that employees could adopt naturally without disrupting existing workflows.
          </p>
        </div>
      </section>

      {/* Visual representation of features (Clean Blueprint Layout) */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1E352F] tracking-wide mb-8 border-b border-[#1E352F]/10 pb-2">
          Designed Capabilities & Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Intelligent Pricing Engine</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed a pricing workflow capable of automatically calculating final product pricing using configurable business rules, reducing manual effort while improving operational consistency.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Centralized Inventory</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed an inventory system supporting bulk imports, real-time stock visibility, and automatic product status updates after successful transactions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Customer Selection Workspace</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed a temporary product collection experience allowing staff to organize customer selections before purchase decisions, improving customer conversations while reducing repetitive searches.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Contextual AI Assistant</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed an AI-powered guidance experience that helps employees quickly understand workflows, locate information, and reduce onboarding time.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Employee Administration</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed secure onboarding and role management workflows for operational staff, simplifying account creation, permission management, and daily administration.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#1E352F]/5 text-[#C5A059] rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E352F] mb-3 uppercase tracking-wide">Operational Dashboard</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Designed a centralized workspace providing visibility into operational activities while simplifying day-to-day business management through a clean and scalable interface.
            </p>
          </div>

        </div>
      </section>

      {/* Custom Interactive Swatch Visualization (Design System) */}
      <section className="max-w-5xl mx-auto px-6 mb-20 bg-[#F4F0EA] p-8 md:p-12 rounded-3xl border border-neutral-200">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl font-display uppercase text-[#1E352F] tracking-wide mb-3">
            Design System
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            The visual language combines premium, trustworthy colors with high-contrast neutral surfaces to create a modern enterprise interface that remains comfortable during extended daily usage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Swatch 1 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#1E352F]" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Primary Green</span>
              <span className="block font-bold text-[#1E352F] font-mono">#1E352F</span>
              <span className="text-[10px] text-neutral-500">App headers & core branding</span>
            </div>
          </div>
          {/* Swatch 2 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#C5A059]" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Accent Gold</span>
              <span className="block font-bold text-[#1E352F] font-mono">#C5A059</span>
              <span className="text-[10px] text-neutral-500">CTA highlights & badges</span>
            </div>
          </div>
          {/* Swatch 3 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#FBFBFA] border border-neutral-200" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Canvas Light</span>
              <span className="block font-bold text-[#1E352F] font-mono">#FBFBFA</span>
              <span className="text-[10px] text-neutral-500">Neutral canvas background</span>
            </div>
          </div>
          {/* Swatch 4 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#FFFFFF] border border-neutral-200" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Surface Card</span>
              <span className="block font-bold text-[#1E352F] font-mono">#FFFFFF</span>
              <span className="text-[10px] text-neutral-500">Tables, cards & dialogs</span>
            </div>
          </div>
          {/* Swatch 5 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#1C1C1A]" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Text Ink</span>
              <span className="block font-bold text-[#1E352F] font-mono">#1C1C1A</span>
              <span className="text-[10px] text-neutral-500">Headings & primary weights</span>
            </div>
          </div>
          {/* Swatch 6 */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#6A6A66]" />
            <div>
              <span className="text-xs uppercase text-[#6A6A66] font-mono">Text Secondary</span>
              <span className="block font-bold text-[#1E352F] font-mono">#6A6A66</span>
              <span className="text-[10px] text-neutral-500">Labels, sub-details & tags</span>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1E352F] tracking-wide mb-6 border-b border-[#1E352F]/10 pb-2">
          Project Outcomes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 leading-relaxed text-lg">
          <div>
            <p className="mb-4">
              The final design consolidated multiple operational workflows into a single digital platform, reducing process complexity while creating a consistent experience for employees.
            </p>
          </div>
          <div>
            <p className="mb-4">
              The solution established a scalable UX foundation capable of supporting future operational growth, faster employee onboarding, and improved operational efficiency. Because the project was delivered under a confidentiality agreement, implementation metrics and interface visuals cannot be publicly disclosed.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── User Flow ───────── */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="mb-10">
          <h2 className="text-3xl font-display uppercase text-[#1E352F] tracking-wide mb-3 border-b border-[#1E352F]/10 pb-2">
            Core User Flow
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">
            The primary operational journey from employee login to automated sales record — every step designed to minimise friction and maximise speed.
          </p>
        </div>

        {/* Flow steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#1E352F] via-[#C5A059] to-[#1E352F] opacity-20 rounded-full hidden md:block" />

          {/* Steps list */}
          <div className="space-y-3">
            {[
              { icon: Lock,          label: "Login",                           desc: "Secure employee authentication",                       phase: "Entry" },
              { icon: LayoutDashboard, label: "Dashboard",                     desc: "View live Gold / Silver / Diamond rates",               phase: "Awareness" },
              { icon: ScanLine,      label: "Scan Jewellery Tag / OCR",        desc: "Camera scan or manual tag entry",                     phase: "Discovery" },
              { icon: Database,      label: "Product Details Retrieved",        desc: "Formulae applied automatically to fetched data",       phase: "Processing" },
              { icon: ShoppingCart,  label: "Add to Wishlist",                 desc: "Optional — continue scanning more products",           phase: "Selection", optional: true },
              { icon: Star,          label: "Customer Finalizes Selection",     desc: "Staff confirms items with customer",                  phase: "Decision" },
              { icon: Receipt,       label: "Generate Bill",                   desc: "System compiles selected items into invoice",          phase: "Billing" },
              { icon: Calculator,    label: "Automatic Price Calculation",      desc: "Tax, making charges, stone weight auto-applied",      phase: "Calculation" },
              { icon: CreditCard,    label: "Payment Completed",               desc: "Multiple payment mode support",                       phase: "Checkout" },
              { icon: PackageCheck,  label: "Inventory Updated Automatically",  desc: "Sold items deducted from live stock in real-time",    phase: "Sync" },
              { icon: BookOpen,      label: "Sales Record Saved",              desc: "Transaction archived for reporting & analytics",      phase: "Archive" },
            ].map((step, i, arr) => (
              <div key={step.label}>
                <div className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-[#1E352F]/[0.03] transition-colors duration-300 cursor-default">
                  {/* Node */}
                  <div className="relative flex flex-col items-center shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#1E352F]/10 group-hover:border-[#C5A059] shadow-sm flex items-center justify-center text-[#1E352F] group-hover:text-[#C5A059] transition-all duration-300 shrink-0">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="pt-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-[#1E352F] text-base leading-tight">{step.label}</h4>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#1E352F]/10 text-[#6A6A66] bg-white">{step.phase}</span>
                      {step.optional && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">Optional</span>
                      )}
                    </div>
                    <p className="text-neutral-500 text-sm leading-snug">{step.desc}</p>
                  </div>

                  {/* Step number */}
                  <div className="hidden sm:flex items-center justify-end shrink-0 min-w-[2rem] pt-2">
                    <span className="text-3xl font-display font-black text-[#1E352F]/5 group-hover:text-[#C5A059]/20 transition-colors select-none">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Connector arrow between steps */}
                {i < arr.length - 1 && (
                  <div className="flex items-center justify-start pl-[22px] py-1">
                    <div className="flex flex-col items-center gap-[2px]">
                      <div className="w-[2px] h-3 bg-[#1E352F]/10 rounded-full" />
                      <ArrowDown className="w-3 h-3 text-[#C5A059]/60" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Client Testimonial ───────── */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-display uppercase text-[#1E352F] tracking-wide mb-8 border-b border-[#1E352F]/10 pb-2">
          Feedback from Client
        </h2>
        <div className="relative overflow-hidden rounded-3xl bg-[#1E352F] p-8 md:p-12 shadow-xl">
          {/* Decorative background quotation mark */}
          <div className="absolute top-4 right-6 text-[180px] font-serif leading-none text-white/5 select-none pointer-events-none">&ldquo;</div>

          {/* Gold accent top bar */}
          <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-[#C5A059] to-transparent rounded-tr-full" />

          <div className="relative z-10">
            {/* Quote icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <Quote className="w-5 h-5 text-[#C5A059]" />
            </div>

            {/* Quote text */}
            <blockquote className="text-[#EAE6DC] text-xl md:text-2xl font-serif italic leading-relaxed mb-10 max-w-3xl">
              &ldquo;Thank you for your excellent UI/UX consultation for our Jewellery Pricing Application. Your insights, attention to detail, and user-centric approach have significantly improved the product's overall experience. We truly appreciate your valuable contribution and look forward to working with you again.&rdquo;
            </blockquote>

            {/* Author row */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar monogram */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C5A059] to-amber-300 flex items-center justify-center font-display font-black text-[#1E352F] text-sm tracking-wider shadow-lg">
                  DK
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-tight">Divyansh Kotnala</h4>
                  <p className="text-[#C5A059] text-[10px] font-mono uppercase tracking-widest mt-0.5">Director and founder - Kotnala Consultancy</p>
                </div>
              </div>

              {/* LinkedIn link */}
              <a
                href="https://www.linkedin.com/in/divyanshkotnala/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-mono uppercase tracking-widest"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current stroke-none" />
                View on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Review */}
      <ProjectReview projectId="Retail_Management" accentColor="#D4AF37" />

      {/* Recommendations Section */}
      <Recommendations currentId="Retail_Management" />
    </div>
  );
};
