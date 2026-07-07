import { motion } from "motion/react";

const galleryItems = [
  { id: 1, image: "/gallery/bumrah.jpg", size: "aspect-square" },
  { id: 2, image: "/gallery/king-kohli.jpg", size: "aspect-[3/4]" },
  { id: 3, image: "/gallery/maverick.jpg", size: "aspect-[3/4]" },
  { id: 4, image: "/gallery/champions.jpg", size: "aspect-[3/4]" },
  { id: 5, image: "/gallery/vedam-logo.jpg", size: "aspect-square" },
  { id: 6, image: "/gallery/jadeja.png", size: "aspect-video" },
  { id: 7, image: "/gallery/boom-boom.jpg", size: "aspect-square" },
];

export const GraphicDesign = () => {
  return (
    <section id="graphic-design" className="py-24 lg:py-32 px-6 bg-transparent text-foreground relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium leading-tight text-neutral-900 dark:text-white tracking-tight uppercase transition-colors duration-500">
            Visual<br />Explorations.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light max-w-2xl transition-colors duration-500">
            A curated gallery of my graphic design work — posters, brand identities, and digital art.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid shadow-sm border border-black/5 dark:border-white/5 transition-colors duration-500"
            >
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={item.image} 
                  alt="Graphic design work"
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
