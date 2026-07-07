import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
];

const WHATSAPP_URL = "https://wa.link/vgmz7y";
const RESUME_URL = "https://drive.google.com/file/d/1QdAJZCM7EbsIQdZQW7AT6J8Gr7H3ErP1/view?usp=sharing";

const getProgressBarColor = (pathname: string): string => {
  if (pathname.includes("/work/paygo")) return "#662AB2"; // Violet
  if (pathname.includes("/work/isro")) return "#2563EB"; // Royal Blue
  if (pathname.includes("/work/Retail_Management")) return "#C5A059"; // Gold
  if (pathname.includes("/work/bharatvibe")) return "#FF6B35"; // Orange
  if (pathname.includes("/work/flashback")) return "#900C3F"; // Maroon
  if (pathname.includes("/work/amazon")) return "#FF9900"; // Amazon Orange
  return "#7c3aed"; // Default Purple-600
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: href } });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClickMobile = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: href } });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); // Wait for mobile slideout animation to finish
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "bg-background/85 dark:bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-4" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Wordmark logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group cursor-pointer select-none">
          <div className="flex flex-col">
            <span className="text-foreground font-display tracking-widest text-2xl font-bold leading-none transition-colors uppercase">
              Navneet Patidar
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest leading-none mt-1">
              UI/UX &amp; Product Design
            </span>
          </div>
        </a>

        {/* Desktop Controls (Nav + Theme Toggle + Let's Talk) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Work + About + Resume pill */}
          <div className="flex items-center gap-1 bg-neutral-900/5 dark:bg-white/5 px-2 py-1.5 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-5 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest group overflow-hidden rounded-full transition-colors"
              >
                <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  {link.name}
                </span>
                <div className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100 rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
              </a>
            ))}
            {/* Resume inside the same pill */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center px-5 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest group overflow-hidden rounded-full transition-colors"
            >
              <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">Resume</span>
              <div className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100 rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
            </a>
          </div>

          {/* Theme Toggle — Creative Pill */}
          <motion.button
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="relative flex items-center cursor-pointer focus:outline-none"
            whileTap={{ scale: 0.94 }}
            aria-label="Toggle theme"
          >
            {/* Track — h-10 to match Let's Talk button height */}
            <motion.div
              animate={{
                backgroundColor: isDarkMode ? "#1e1b4b" : "#fef3c7",
                borderColor: isDarkMode ? "#4338ca" : "#f59e0b",
              }}
              transition={{ duration: 0.4 }}
              className="relative w-[4.5rem] h-10 rounded-full border-2 flex items-center px-1 overflow-hidden"
            >
              {/* Stars in dark mode */}
              <motion.div
                animate={{ opacity: isDarkMode ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-end pr-3 gap-1 pointer-events-none"
              >
                <span className="w-[3px] h-[3px] rounded-full bg-white/80 block" />
                <span className="w-[2px] h-[2px] rounded-full bg-white/60 block" />
                <span className="w-[2px] h-[2px] rounded-full bg-white/40 block" />
              </motion.div>

              {/* Sliding Knob */}
              <motion.div
                animate={{ x: isDarkMode ? 34 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-10 w-7 h-7 rounded-full shadow-md flex items-center justify-center shrink-0"
                style={{ background: isDarkMode ? "#818cf8" : "#f59e0b" }}
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 0 : 360 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {isDarkMode
                    ? <Moon className="w-4 h-4 text-white" />
                    : <Sun className="w-4 h-4 text-white" />
                  }
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.button>

          {/* Let's Talk → WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 py-3 bg-black dark:bg-[#F7F4EE] text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden group shadow-sm hover:shadow"
          >
            <span className="relative z-10 transition-colors duration-300">Let's Talk</span>
            <div className="absolute inset-0 bg-[#25D366] rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle — Pill */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
            className="relative flex items-center cursor-pointer focus:outline-none"
          >
            <motion.div
              animate={{
                backgroundColor: isDarkMode ? "#1e1b4b" : "#fef3c7",
                borderColor: isDarkMode ? "#4338ca" : "#f59e0b",
              }}
              transition={{ duration: 0.4 }}
              className="relative w-[3.5rem] h-8 rounded-full border-2 flex items-center px-0.5 overflow-hidden"
            >
              <motion.div
                animate={{ opacity: isDarkMode ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-end pr-2 gap-0.5 pointer-events-none"
              >
                <span className="w-[3px] h-[3px] rounded-full bg-white/70 block" />
                <span className="w-[2px] h-[2px] rounded-full bg-white/50 block" />
              </motion.div>
              <motion.div
                animate={{ x: isDarkMode ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="relative z-10 w-6 h-6 rounded-full shadow flex items-center justify-center shrink-0"
                style={{ background: isDarkMode ? "#818cf8" : "#f59e0b" }}
              >
                <motion.div animate={{ rotate: isDarkMode ? 0 : 360 }} transition={{ duration: 0.5 }}>
                  {isDarkMode ? <Moon className="w-3.5 h-3.5 text-white" /> : <Sun className="w-3.5 h-3.5 text-white" />}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.button>

          <button
            className="text-foreground p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Scroll progress underline bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px]" 
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: getProgressBarColor(location.pathname),
            transition: "width 75ms linear, background-color 500ms ease"
          }} 
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-background dark:bg-[#0A0A0A] pt-32 px-6 md:hidden flex flex-col justify-between pb-12 transition-colors duration-500"
          >
            <div className="flex flex-col gap-6">
              {[...navLinks, { name: "Contact", href: "#contact" }].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClickMobile(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-5xl font-display font-black text-foreground tracking-tight hover:text-amber-800 transition-colors uppercase cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Resume mobile */}
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-display font-black text-foreground tracking-tight hover:text-amber-800 transition-colors uppercase cursor-pointer"
              >
                Resume
              </motion.a>

              {/* Let's Talk mobile */}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-base font-bold uppercase tracking-widest rounded-2xl shadow-md w-fit"
              >
                Let's Talk on WhatsApp
              </motion.a>
            </div>
            
            <div className="text-neutral-400 text-xs font-mono uppercase tracking-widest border-t border-black/5 dark:border-white/5 pt-6">
              NAVNEET PATIDAR
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
