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
import { CloudShader } from "./components/ui/cloud-shader";

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
    <div className="fixed inset-0 pointer-events-none select-none z-[0] overflow-hidden">
      {/* Dynamic Cloud Shader Background (Faded to 50% intensity) */}
      <CloudShader 
        className="absolute inset-0 h-full w-full opacity-45 dark:opacity-20 transition-opacity duration-500" 
        speed={0.5}
        count={5}
        cloudColor="#fbf8f2"
        skyTopColor="#3876ba"
        skyBottomColor="#8cbfe8"
      />

      {/* Atmospheric overlay for theme adaptability and text contrast */}
      <div className="absolute inset-0 bg-white/60 dark:bg-[#08090C]/90 transition-colors duration-500" />
      
      {/* Luminous Hardware-Accelerated Fluid Gradients */}
      <motion.div 
          animate={{ 
              x: [0, 60, -30, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.3, 0.5, 0.3, 0.3]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-br from-white via-slate-100/90 to-neutral-200/50 dark:from-purple-950/20 dark:via-indigo-900/15 dark:to-slate-900/15 rounded-full blur-[45px] mix-blend-normal dark:mix-blend-screen pointer-events-none"
      />
      
      {/* Ultra High-Performance GPU Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10] dark:opacity-[0.14] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-70" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen text-foreground font-body relative transition-colors duration-500 overflow-x-clip w-full max-w-full">
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