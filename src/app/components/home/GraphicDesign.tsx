import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const galleryItems = [
  { id: 1, image: "/gallery/bumrah.jpg" },
  { id: 2, image: "/gallery/king-kohli.jpg" },
  { id: 3, image: "/gallery/maverick.jpg" },
  { id: 4, image: "/gallery/champions.jpg" },
  { id: 5, image: "/gallery/vedam-logo.jpg" },
  { id: 6, image: "/gallery/jadeja.png" },
  { id: 7, image: "/gallery/boom-boom.jpg" },
];

export const GraphicDesign = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Triple items for seamless infinite horizontal loop
  const marqueeItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <section id="graphic-design" className="py-24 lg:py-32 bg-transparent text-foreground relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12 lg:mb-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-12 bg-emerald-500 transition-colors duration-500" />
            <span className="text-emerald-500 font-subheading font-bold uppercase tracking-widest text-xs transition-colors duration-500">
              Graphic Design
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-anton uppercase leading-tight text-neutral-900 dark:text-white tracking-tight transition-colors duration-500">
            Visual Explorations
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-body font-light max-w-xl transition-colors duration-500">
            A continuous gallery of posters, brand identities, and digital artwork.
          </p>
        </motion.div>

      </div>

      {/* Horizontally Infinite Unstoppable Marquee Container (Uniform Height, Natural Width) */}
      <div className="w-full overflow-hidden py-4 select-none">
        <motion.div 
          className="flex gap-6 w-max"
          animate={{
            x: ["-33.333%", "0%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 55,
              ease: "linear"
            }
          }}
        >
          {marqueeItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(item.image)}
              className="relative shrink-0 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 h-[280px] sm:h-[340px] md:h-[420px] transition-transform duration-300"
            >
              <img 
                src={item.image} 
                alt="Graphic design visual"
                loading="lazy"
                className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-emerald-500 transition-colors flex items-center justify-center cursor-pointer backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-auto max-h-[85vh] flex items-center justify-center p-6">
                <img
                  src={selectedImage}
                  alt="Graphic design visual preview"
                  className="max-h-[80vh] w-auto object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
