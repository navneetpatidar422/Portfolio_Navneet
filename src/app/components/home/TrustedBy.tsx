import { motion } from "motion/react";

const companies = [
  { name: "Acme Corp", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Global Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Nebula", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Velocity", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Vertex", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Orbit", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  // Duplicate for seamless loop
  { name: "Acme Corp", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Global Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Nebula", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Velocity", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Vertex", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Orbit", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
];

export const TrustedBy = () => {
  return (
    <section className="py-12 bg-white border-y border-black/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* Gradient fade masks for the marquee */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-neutral-500 text-xs font-mono uppercase tracking-[0.2em]">Trusted by market leaders</p>
      </div>

      <div className="flex relative z-0">
        <motion.div 
            className="flex gap-16 md:gap-32 items-center flex-nowrap pl-16 md:pl-32"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 30, 
                ease: "linear", 
                repeat: Infinity 
            }}
        >
            {companies.map((company, index) => (
                <div key={index} className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default group">
                     {/* Using standard logos for demonstration, in a real project these would be local SVGs */}
                     <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-8 md:h-10 w-auto object-contain brightness-0 group-hover:brightness-100 transition-all duration-500"
                     />
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};