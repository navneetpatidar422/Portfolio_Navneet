import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
];

const WHATSAPP_URL = "https://wa.link/vgmz7y";
const RESUME_URL = "https://drive.google.com/file/d/1QdAJZCM7EbsIQdZQW7AT6J8Gr7H3ErP1/view?usp=sharing";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === "#home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("#")) {
      const sectionId = href.slice(1);
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    } else {
      navigate(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "bg-[#F7F4EE]/85 backdrop-blur-xl border-b border-black/5 py-4" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Wordmark logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group cursor-pointer select-none">
          <div className="flex flex-col">
            <span className="text-black font-display tracking-widest text-2xl font-bold leading-none transition-colors uppercase">
              Navneet Patidar
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest leading-none mt-1">
              UI/UX &amp; Product Design
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {/* Work + About + Resume pill */}
          <div className="flex items-center gap-1 bg-neutral-900/5 px-2 py-1.5 rounded-full border border-black/5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-5 py-2 text-xs font-bold text-neutral-600 uppercase tracking-widest group overflow-hidden rounded-full transition-colors"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                <div className="absolute inset-0 bg-neutral-900 rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
              </a>
            ))}
            {/* Resume inside the same pill */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center px-5 py-2 text-xs font-bold text-neutral-600 uppercase tracking-widest group overflow-hidden rounded-full transition-colors"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Resume</span>
              <div className="absolute inset-0 bg-neutral-900 rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-0" />
            </a>
          </div>

          {/* Let's Talk → WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden group shadow-sm hover:shadow"
          >
            <span className="relative z-10 transition-colors duration-300">Let's Talk</span>
            <div className="absolute inset-0 bg-[#25D366] rounded-full translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Scroll progress underline bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-purple-600 transition-all duration-75" 
          style={{ width: `${scrollProgress}%` }} 
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
            className="fixed inset-0 z-30 bg-[#F7F4EE] pt-32 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {[...navLinks, { name: "Contact", href: "#contact" }].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-5xl font-display font-black text-black tracking-tight hover:text-amber-800 transition-colors uppercase cursor-pointer"
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
                className="text-5xl font-display font-black text-black tracking-tight hover:text-amber-800 transition-colors uppercase cursor-pointer"
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
            
            <div className="text-neutral-400 text-xs font-mono uppercase tracking-widest border-t border-black/5 pt-6">
              NAVNEET PATIDAR
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
