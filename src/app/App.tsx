import { useState, lazy, Suspense } from "react";
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
import { BackToTop } from "./components/shared/BackToTop";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { ThankYou } from "./components/home/ThankYou";
import { SectionTicker } from "./components/shared/SectionTicker";

// Code Split Heavy Routes using Lazy Loading & Suspense
const Retail_ManagementCaseStudy = lazy(() => import("./components/work/Retail_ManagementCaseStudy").then(m => ({ default: m.Retail_ManagementCaseStudy })));
const PaygoCaseStudy = lazy(() => import("./components/work/PaygoCaseStudy").then(m => ({ default: m.PaygoCaseStudy })));
const BharatVibeCaseStudy = lazy(() => import("./components/work/BharatVibeCaseStudy").then(m => ({ default: m.BharatVibeCaseStudy })));
const FlashbackCaseStudy = lazy(() => import("./components/work/FlashbackCaseStudy").then(m => ({ default: m.FlashbackCaseStudy })));
const AmazonCaseStudy = lazy(() => import("./components/work/AmazonCaseStudy").then(m => ({ default: m.AmazonCaseStudy })));
const IsroCaseStudy = lazy(() => import("./components/work/IsroCaseStudy").then(m => ({ default: m.IsroCaseStudy })));
const Admin = lazy(() => import("./components/home/Admin").then(m => ({ default: m.Admin })));
const AdminReviews = lazy(() => import("./components/admin/AdminReviews").then(m => ({ default: m.AdminReviews })));

function MainHome() {
  return (
    <>
      <Hero />
      
      <SectionTicker 
        items={["FEATURED CASE STUDIES", "PRODUCT DESIGN", "UI/UX ARCHITECTURE", "SELECTED WORKS"]} 
      />
      <Work />
      
      <SectionTicker 
        items={["VISUAL EXPLORATIONS", "GRAPHIC DESIGN", "BRANDING & POSTERS", "CREATIVE MARQUEE"]} 
        reverse 
      />
      <GraphicDesign />
      
      <SectionTicker 
        items={["DESIGN PHILOSOPHY", "HUMAN-CENTERED INTENT", "INTERFACE TRANSLATION LAYER", "DESIGN MINDSET"]} 
      />
      <WhyIDesign />
      
      <SectionTicker 
        items={["TECHNICAL SKILLS", "DESIGN SYSTEMS", "PROTOTYPING & MOTION", "THE TOOLKIT"]} 
        reverse 
      />
      <Skills />
      
      <SectionTicker 
        items={["ABOUT NAVNEET", "THE DESIGNER BEHIND THE WORK", "JOURNEY & EXPERIENCE", "CRAFT & VISION"]} 
      />
      <AboutMe />
      
      <SectionTicker 
        items={["CLIENT ENDORSEMENTS", "WORDS FROM COLLABORATORS", "TESTIMONIALS & REVIEWS", "FEEDBACK"]} 
        reverse 
      />
      <Testimonials />
      
      <ThankYou />
      <Contact />
    </>
  );
}

function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#FAFAFC] dark:bg-[#08090C] transition-colors duration-500" />
      
      {/* Luminous Hardware-Accelerated Smooth Fluid Gradients */}
      <motion.div 
          animate={{ 
              x: [0, 60, -30, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.5, 0.7, 0.5, 0.5]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-br from-white via-slate-100/90 to-neutral-200/50 dark:from-purple-950/20 dark:via-indigo-900/15 dark:to-slate-900/15 rounded-full blur-[45px] mix-blend-normal dark:mix-blend-screen pointer-events-none"
      />
      <motion.div 
          animate={{ 
              x: [0, -50, 40, 0],
              y: [0, 60, -20, 0],
              scale: [1, 1.1, 0.95, 1],
              opacity: [0.4, 0.65, 0.4, 0.4]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-[-10%] right-[-20%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-tr from-sky-50/70 via-white to-slate-100/60 dark:from-blue-950/20 dark:via-purple-900/15 dark:to-indigo-950/15 rounded-full blur-[40px] mix-blend-normal dark:mix-blend-screen pointer-events-none"
      />
      <motion.div 
          animate={{ 
              x: [0, 30, -30, 0],
              y: [0, 20, -20, 0],
              scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="hidden md:block absolute top-[35%] left-[25%] w-[400px] h-[400px] bg-gradient-to-br from-white via-neutral-100/80 to-slate-200/40 dark:from-fuchsia-950/10 dark:via-violet-900/10 dark:to-purple-950/10 rounded-full blur-[30px] mix-blend-normal dark:mix-blend-screen pointer-events-none"
      />
      
      {/* Ultra High-Performance GPU Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] dark:opacity-[0.14] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />

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
        <GlobalBackground />
        <Navbar isAppLoading={loading} />
        <div className="relative z-10">
          <main>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;

