import { motion } from "motion/react";
import { ArrowUpRight, Linkedin, Mail, FileText, Instagram } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";

const WHATSAPP_URL = "https://wa.link/vgmz7y";
const RESUME_URL = "https://drive.google.com/file/d/1QdAJZCM7EbsIQdZQW7AT6J8Gr7H3ErP1/view?usp=sharing";

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
    <footer className="text-white relative overflow-hidden bg-transparent">
      {/* Solid Footer Background: Only covers the lower section of the footer */}
      <div className="absolute top-[200px] sm:top-[260px] md:top-[320px] lg:top-[360px] bottom-0 left-0 right-0 bg-[#0E0E0E] z-0" />

      {/* Mountain View Header Backdrop */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] overflow-hidden select-none pointer-events-none z-[1]">
        {/* Mountain Image */}
        <img
          src="/mountains.png"
          alt="Dark Mountain Landscape"
          className="w-full h-full object-cover object-top block opacity-95"
        />

        {/* Bottom Black Gradient: Fades lower trees seamlessly into footer background #0E0E0E */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0E0E0E]/70 to-[#0E0E0E]" />
      </div>

      {/* Main Footer Content: Positioned over the lower dark gradient (Starting from the Blue Line in Sketch) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-36 sm:-mt-48 md:-mt-60 lg:-mt-72 pb-8">
        


        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand + tagline */}
          <div className="md:col-span-4 space-y-6">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-block"
            >
              <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center font-display text-xl font-bold select-none cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300">
                NP
              </div>
            </a>

            <div>
              <p className="text-neutral-200 text-xl font-display font-bold tracking-tight mb-1">
                Navneet Patidar
              </p>
              <p className="text-neutral-400 text-sm font-mono uppercase tracking-widest">
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
                  className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-6">Sitemap</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    className="text-neutral-300 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit cursor-pointer"
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
                  className="text-neutral-300 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-6">Projects</h4>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-300 hover:text-white text-sm transition-colors flex items-center gap-1.5 group w-fit"
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
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-6">Let's Connect</h4>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
              </svg>
              Chat on WhatsApp
            </motion.a>

            <motion.a
              href="mailto:designer.navneet.patidar@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 border border-white/10 text-neutral-300 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              Send an Email
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Navneet Patidar. All Rights Reserved.
          </p>
          <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
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
