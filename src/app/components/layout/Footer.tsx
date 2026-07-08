import { motion } from "motion/react";
import { ArrowUpRight, Linkedin, Globe, Mail, MessageCircle, FileText, Instagram } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";

const WHATSAPP_URL = "https://wa.link/vgmz7y";
const RESUME_URL = "https://drive.google.com/file/d/1FXNe7o7wE_YJ577Rdg97g8CovU-QTllL/view?usp=sharing";

// Custom Behance Icon using the user-provided SVG
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 3333 3333" 
    shape-rendering="geometricPrecision" 
    text-rendering="geometricPrecision" 
    image-rendering="optimizeQuality" 
    fill-rule="evenodd" 
    clip-rule="evenodd"
    fill="currentColor"
    {...props}
  >
    <path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-408 1059c57 0 109 5 156 15s87 27 121 49c33 23 59 53 78 91 18 37 27 85 27 140 0 60-14 110-41 151-28 40-68 73-122 99 74 21 128 58 164 111s54 117 54 192c0 61-12 113-35 157-24 44-55 80-94 108s-85 49-136 62c-50 13-102 20-156 20H696V1060h563zm704 96h484v118h-484v-118zm108 890c36 35 87 52 154 52 48 0 90-12 124-36s55-50 63-77h209c-34 104-85 178-154 223s-153 67-250 67c-68 0-129-11-184-33s-101-53-140-93c-38-40-67-88-88-144-20-56-31-118-31-184 0-65 11-125 32-181 22-56 51-104 91-145 39-41 86-73 140-96 54-24 114-35 181-35 73 0 137 14 192 43 55 28 100 67 135 115s60 103 76 164 21 125 17 193h-624c0 68 23 133 59 167zm273-454c-28-31-76-48-134-48-38 0-69 6-94 19s-45 29-60 48-26 39-32 61c-6 21-10 40-11 57h387c-6-61-27-105-55-137zm-1118-50c47 0 85-11 116-33 30-22 45-58 45-108 0-28-5-51-15-69s-24-32-41-42-36-17-58-21-44-6-67-6H960v279h266zm14 508c26 0 50-2 73-8 24-5 44-13 62-25 17-12 32-27 43-48 11-20 16-46 16-77 0-61-17-105-52-132-34-26-80-39-137-39H960v329h281v1z"/>
  </svg>
);

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Visual Explorations", href: "#graphic-design" },
  { name: "How I Design", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const projectLinks = [
  { name: "PayGo", href: "/work/paygo" },
  { name: "BharatVibe", href: "/work/bharatvibe" },
  { name: "Flashback", href: "/work/flashback" },
  { name: "ISRO 2.0", href: "/work/isro" },
  { name: "Amazon Redesign", href: "/work/amazon" },
  { name: "Jewellery Retail MANAGEMENT SYSTEM", href: "/work/Retail_Management" },
];

const socials = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/navneet-patidar/" },
  { name: "Behance", icon: BehanceIcon, href: "https://www.behance.net/navneetpatidar" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/_navneetpatidar" },
  { name: "Email", icon: Mail, href: "mailto:designer.navneet.patidar@gmail.com" },
];

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-[#0E0E0E] text-white pt-20 pb-8 px-6 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand + tagline */}
          <div className="md:col-span-4 space-y-6">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-block"
            >
              <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center font-display text-xl font-bold select-none cursor-pointer">
                NP
              </div>
            </a>

            <div>
              <p className="text-neutral-300 text-xl font-display font-bold tracking-tight mb-1">
                Navneet Patidar
              </p>
              <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                UI/UX &amp; Product Designer
              </p>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Designing research-backed, accessible interfaces and engineering them cleanly.
              New Delhi, India.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  title={s.name}
                  className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono mb-6">Sitemap</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-amber-400 shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono mb-6">Projects</h4>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-amber-400 shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono mb-6">Let's Connect</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Available for full-time roles &amp; freelance collaborations.
            </p>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </motion.a>

            <motion.a
              href="mailto:designer.navneet.patidar@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 border border-white/10 text-neutral-300 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Send an Email
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-[10px] font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Navneet Patidar. All Rights Reserved.
          </p>
          <p className="text-neutral-600 text-[10px] font-mono uppercase tracking-widest">
            Designed with Passion &amp; Love by Navneet...
          </p>
        </div>

        {/* Scrolling marquee */}
        <div className="mt-12 select-none pointer-events-none overflow-hidden relative w-screen -ml-[calc(50vw-50%)]">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[1, 2, 3, 4].map((n) => (
              <h1 key={n} className="text-[12vw] leading-none font-display font-bold text-white/[0.03] tracking-tighter shrink-0 pr-8 uppercase">
                NAVNEET PATIDAR
              </h1>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
