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
import { CursorRippleEffect } from "./components/shared/CursorRippleEffect";
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
      {/* Base Background (dynamic light/dark) */}
      <div className="absolute inset-0 bg-[#F4F0EA] dark:bg-[#0A0A0A] transition-colors duration-500" />
      
      {/* Animated Fluid Gradients */}
      <motion.div 
          animate={{ 
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.4, 0.8, 1],
              opacity: [0.4, 0.7, 0.4, 0.4]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-orange-300/40 to-amber-200/40 dark:from-purple-950/20 dark:to-indigo-900/20 rounded-full blur-[96px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
          animate={{ 
              x: [0, -80, 40, 0],
              y: [0, 90, -30, 0],
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.4, 0.6, 0.4, 0.4]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] bg-gradient-to-tr from-rose-300/40 to-orange-200/40 dark:from-blue-950/20 dark:to-purple-900/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
      />
       <motion.div 
          animate={{ 
              x: [0, 60, -60, 0],
              y: [0, 40, -40, 0],
              scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-gradient-to-br from-yellow-300/30 to-red-200/30 dark:from-fuchsia-950/15 dark:to-violet-900/15 rounded-full blur-[64px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Refined Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.04] mix-blend-darken dark:mix-blend-overlay" />
      
      {/* Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always default to light. Only apply dark if user explicitly chose it before.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen text-foreground selection:bg-foreground selection:text-background font-body relative transition-colors duration-500">
        <AnimatePresence mode="wait">
          {loading && (
            <CreativeLoader onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        <ScrollToTop />
        <BackToTop />
        <CustomCursor />
        <GlobalBackground />
        <CursorRippleEffect />
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
