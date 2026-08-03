import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
];

const WHATSAPP_URL = "https://wa.link/vgmz7y";
const EMAIL_URL = "mailto:designer.navneet.patidar@gmail.com";
const PHONE_URL = "tel:+917878913449";
const RESUME_URL = "https://drive.google.com/file/d/1QdAJZCM7EbsIQdZQW7AT6J8Gr7H3ErP1/view?usp=sharing";

const getProgressBarColor = (pathname: string): string => {
  if (pathname.includes("/work/paygo")) return "#662AB2";
  if (pathname.includes("/work/isro")) return "#2563EB";
  if (pathname.includes("/work/Retail_Management")) return "#C5A059";
  if (pathname.includes("/work/bharatvibe")) return "#FF6B35";
  if (pathname.includes("/work/flashback")) return "#900C3F";
  if (pathname.includes("/work/amazon")) return "#FF9900";
  return "#10B981"; // Emerald
};

// Official WhatsApp SVG icon (exact match from Footer)
const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    className={className}
  >
    <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
  </svg>
);

export const Navbar = ({ isAppLoading = false }: { isAppLoading?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTalkHovered, setIsTalkHovered] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTalkClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector("#contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const contactTarget = document.querySelector("#contact");
          if (contactTarget) contactTarget.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }, 300);
  };

  const handleNavClickMobile = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      if (href === "#home" || href === "/") {
        if (location.pathname !== "/") {
          navigate("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: href } });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      {/* Floating Pill Navbar Container (Futuristic Capsule Unfolding Entrance) */}
      <motion.nav
        className="fixed top-4 left-4 right-4 sm:left-6 sm:right-6 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-50"
        initial={{ y: -80, scaleX: 0.3, scaleY: 0.6, opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          y: isAppLoading ? -80 : 0, 
          scaleX: isAppLoading ? 0.3 : 1,
          scaleY: isAppLoading ? 0.6 : 1,
          opacity: isAppLoading ? 0 : 1,
          filter: isAppLoading ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 110,
          damping: 16,
          delay: isAppLoading ? 0 : 0.4
        }}
      >
        <div 
          className={`relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-black/8 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all duration-300 overflow-hidden ${
            isScrolled ? "shadow-xl border-black/15 dark:border-white/20" : ""
          }`}
        >
          {/* Liquid Shimmer Sweeping Light Effect on Entrance */}
          {!isAppLoading && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-emerald-400/30 to-transparent pointer-events-none z-20 transform -skew-x-12"
            />
          )}

          {/* Scroll Progress Fill Background Layer (Navbar cell fills with project custom brand color on scroll) */}
          <div 
            className="absolute inset-y-0 left-0 rounded-full pointer-events-none transition-all duration-300 ease-out z-0 opacity-85 dark:opacity-90"
            style={{
              width: `${scrollProgress}%`,
              backgroundColor: getProgressBarColor(location.pathname),
            }}
          />

          {/* Left Side: Favicon Image with Thin Green Border */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer select-none shrink-0 relative z-10"
            title="Navneet Patidar"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-emerald-500 ring-offset-1 ring-offset-white dark:ring-offset-neutral-900 overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src="/portfolio-favicon.png"
                alt="Navneet Patidar Favicon"
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          {/* Center Nav Links directly inside outer pill */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 relative z-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-5 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-widest group overflow-hidden rounded-full transition-colors cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  {link.name}
                </span>
                <div className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
              </a>
            ))}
            {/* Resume Link with Slide-Up Fill */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-5 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-widest group overflow-hidden rounded-full transition-colors cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                Resume
              </span>
              <div className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
            </a>
          </div>

          {/* Right Side: Expandable "LET'S TALK" Option with FIXED HEIGHT & NO VERTICAL MOVEMENT */}
          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <div
              className="relative shrink-0"
              onMouseEnter={() => setIsTalkHovered(true)}
              onMouseLeave={() => setIsTalkHovered(false)}
            >
              <div
                className="flex items-center h-10 bg-[#111111] dark:bg-white text-white dark:text-black rounded-full px-5 border border-black/10 dark:border-white/20 shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Main Label - Fixed Height & Alignment */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold font-anton tracking-wider uppercase whitespace-nowrap hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors cursor-pointer flex items-center h-full"
                >
                  LET'S TALK
                </a>

                {/* Hover Reveal Action Icons: Official WhatsApp SVG, Email, Phone */}
                <AnimatePresence>
                  {isTalkHovered ? (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex items-center gap-1.5 pl-2.5 ml-2.5 border-l border-white/20 dark:border-black/20 h-full overflow-hidden shrink-0"
                    >
                      {/* Official Real WhatsApp Icon Link */}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat on WhatsApp"
                        className="w-7 h-7 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all transform hover:scale-110 shadow-sm cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </a>

                      {/* Email Icon Link */}
                      <a
                        href={EMAIL_URL}
                        title="Send Email"
                        className="w-7 h-7 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all transform hover:scale-110 shadow-sm cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>

                      {/* Phone Contact No Icon Link */}
                      <a
                        href={PHONE_URL}
                        title="Call Phone (+91 78789 13449)"
                        className="w-7 h-7 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all transform hover:scale-110 shadow-sm cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.span 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-2 shrink-0"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              className="md:hidden p-1.5 text-slate-800 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/98 dark:bg-[#0A0A0A]/98 backdrop-blur-md pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {[...navLinks, { name: "Contact", href: "#contact" }].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClickMobile(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="text-4xl font-anton text-foreground tracking-wide hover:text-emerald-600 transition-colors uppercase cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Resume */}
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="text-4xl font-anton text-foreground tracking-wide hover:text-emerald-600 transition-colors uppercase cursor-pointer"
              >
                Resume
              </motion.a>

              {/* Quick Contact Links on Mobile Menu */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 mt-4"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md cursor-pointer transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={EMAIL_URL}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md cursor-pointer transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a
                  href={PHONE_URL}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md cursor-pointer transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              </motion.div>
            </div>

            <div className="text-neutral-400 text-xs font-mono uppercase tracking-widest border-t border-black/10 dark:border-white/10 pt-6">
              NAVNEET PATIDAR • UI/UX &amp; PRODUCT DESIGNER
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
