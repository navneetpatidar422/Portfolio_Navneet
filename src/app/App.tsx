import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CreativeLoader } from "./components/shared/CreativeLoader";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/home/Hero";
import { Work } from "./components/home/Work";
import { GraphicDesign } from "./components/home/GraphicDesign";
import { WhyIDesign } from "./components/home/WhyIDesign";
import { Skills } from "./components/home/Skills";
import { AboutMe } from "./components/home/AboutMe";
import { Testimonials } from "./components/home/Testimonials";
import { Contact } from "./components/home/Contact";
import { Admin } from "./components/home/Admin";
import { AdminReviews } from "./components/admin/AdminReviews";
import { BackToTop } from "./components/shared/BackToTop";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { CustomCursor } from "./components/shared/CustomCursor";
import { Toaster } from "./components/ui/sonner";

// Import Case Study Pages
import { Retail_ManagementCaseStudy } from "./components/work/Retail_ManagementCaseStudy";
import { PaygoCaseStudy } from "./components/work/PaygoCaseStudy";
import { BharatVibeCaseStudy } from "./components/work/BharatVibeCaseStudy";
import { FlashbackCaseStudy } from "./components/work/FlashbackCaseStudy";
import { AmazonCaseStudy } from "./components/work/AmazonCaseStudy";
import { IsroCaseStudy } from "./components/work/IsroCaseStudy";

function MainHome() {
  return (
    <>
      <Hero />
      <Work />
      <GraphicDesign />
      <WhyIDesign />
      <Skills />
      <AboutMe />
      <Testimonials />
      <Contact />
    </>
  );
}

function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden">
      {/* Base Background (luminous white/light-gray in light mode, obsidian slate in dark mode) */}
      <div className="absolute inset-0 bg-[#FAFAFC] dark:bg-[#08090C] transition-colors duration-500" />
      
      {/* Luminous White & Silver Animated Fluid Gradients */}
      <motion.div 
          animate={{ 
              x: [0, 90, -40, 0],
              y: [0, -90, 40, 0],
              scale: [1, 1.35, 0.85, 1],
              opacity: [0.6, 0.85, 0.6, 0.6]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-white via-slate-100/90 to-neutral-200/50 dark:from-purple-950/25 dark:via-indigo-900/20 dark:to-slate-900/20 rounded-full blur-[100px] mix-blend-normal dark:mix-blend-screen"
      />
      <motion.div 
          animate={{ 
              x: [0, -70, 50, 0],
              y: [0, 80, -30, 0],
              scale: [1, 1.25, 0.9, 1],
              opacity: [0.5, 0.8, 0.5, 0.5]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-20%] w-[800px] h-[800px] bg-gradient-to-tr from-sky-50/70 via-white to-slate-100/60 dark:from-blue-950/25 dark:via-purple-900/20 dark:to-indigo-950/20 rounded-full blur-[90px] mix-blend-normal dark:mix-blend-screen"
      />
       <motion.div 
          animate={{ 
              x: [0, 50, -50, 0],
              y: [0, 30, -30, 0],
              scale: [1, 1.2, 0.85, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] left-[25%] w-[500px] h-[500px] bg-gradient-to-br from-white via-neutral-100/80 to-slate-200/40 dark:from-fuchsia-950/15 dark:via-violet-900/15 dark:to-purple-950/10 rounded-full blur-[70px] mix-blend-normal dark:mix-blend-screen"
      />

      {/* Desktop-Only SVG Animated High-Frequency Grain Filter */}
      <svg className="hidden md:block absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="animated-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="5" stitchTiles="stitch">
            <animate attributeName="baseFrequency" values="0.80; 0.92; 0.78; 0.88; 0.80" dur="2.2s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Primary High-Visibility Animated Grain Layer (Desktop Only for GPU smoothness) */}
      <div 
        className="hidden md:block absolute -inset-[100%] w-[300%] h-[300%] opacity-[0.48] dark:opacity-[0.38] pointer-events-none animate-grain mix-blend-darken dark:mix-blend-overlay contrast-150 brightness-95"
        style={{ filter: "url(#animated-grain-filter)" }}
      />
      
      {/* High-Performance Mobile Paper Grain Layer (Ultra-smooth 120fps on Android & iOS) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.16] dark:opacity-[0.18] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />

      {/* Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
    </div>
  );
}


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen text-foreground font-body relative transition-colors duration-500">
        <AnimatePresence mode="wait">
          {loading && (
            <CreativeLoader onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        <ScrollToTop />
        <BackToTop />
        <CustomCursor />
        <GlobalBackground />
        <Navbar />
        <div className="relative z-10">
          <main>
            <Routes>
              <Route path="/" element={<MainHome />} />
              <Route path="/work" element={<div className="pt-16"><Work /></div>} />
              <Route path="/work/Retail_Management" element={<Retail_ManagementCaseStudy />} />
              <Route path="/work/paygo" element={<PaygoCaseStudy />} />
              <Route path="/work/bharatvibe" element={<BharatVibeCaseStudy />} />
              <Route path="/work/flashback" element={<FlashbackCaseStudy />} />
              <Route path="/work/amazon" element={<AmazonCaseStudy />} />
              <Route path="/work/isro" element={<IsroCaseStudy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
