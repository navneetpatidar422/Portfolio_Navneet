import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Linkedin, PenSquare, Star, X, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { submitToBackend } from "../../utils/formSubmit";

const testimonials = [
  {
    step: "01",
    quote: "Navneet demonstrated strong creativity, an excellent eye for design, and remarkable attention to detail throughout. He made valuable contributions across logo design and social media creatives, consistently delivering thoughtful, user-centric work with professionalism and ownership. He was a pleasure to work with..",
    author: "Avishek Somani",
    role: "Managing Partner - Vedam Advisors",
    initial: "AS",
    linkedin: "https://www.linkedin.com/in/avisheksomani/"
  },
  {
    step: "02",
    quote: "Thank you for your excellent UI/UX consultation for our Jewellery Pricing Application. Your insights, attention to detail, and user-centric approach have significantly improved the product's overall experience. We truly appreciate your valuable contribution and look forward to working with you again.",
    author: "Divyansh Kotnala",
    role: "Director and founder - Kotnala Consultancy",
    initial: "DK",
    linkedin: "https://www.linkedin.com/in/divyanshkotnala/"
  },
  {
    step: "03",
    quote: "Navneet consistently delivered high-quality visual assets that strengthened our brand presence across social media. Beyond graphic design, he contributed thoughtful UI/UX suggestions that helped us refine the overall user experience. His creativity, responsiveness, and collaborative approach made him a valuable part of the team.",
    author: "Dheeraj Rajput",
    role: "Founder - InstantAI",
    initial: "DR",
    linkedin: "https://www.linkedin.com/in/dheeraj-rajput/"
  }
];

export const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    quote: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.quote) {
      toast.error("Please fill in your name and review message.");
      return;
    }

    setIsSubmitting(true);
    await submitToBackend({
      type: "review",
      name: reviewForm.name,
      role: reviewForm.role || "Client / Collaborator",
      quote: reviewForm.quote,
      rating: reviewForm.rating
    });

    const newReview = {
      id: Math.random().toString(36).substring(2, 9),
      author: reviewForm.name,
      role: reviewForm.role || "Client / Collaborator",
      quote: reviewForm.quote,
      rating: reviewForm.rating,
      createdAt: new Date().toISOString()
    };

    const existing = localStorage.getItem("portfolio_reviews");
    const reviewsList = existing ? JSON.parse(existing) : [];
    reviewsList.push(newReview);
    localStorage.setItem("portfolio_reviews", JSON.stringify(reviewsList));

    setIsSubmitting(false);
    setIsModalOpen(false);
    toast.success("Thank you for writing a review! Your feedback has been submitted.");
    setReviewForm({ name: "", role: "", quote: "", rating: 5 });
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6 bg-transparent text-foreground border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6 relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-emerald-500/20 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-subheading font-bold tracking-widest uppercase text-emerald-500">
              Reviews &amp; Endorsements
            </span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-anton uppercase tracking-tight text-neutral-900 dark:text-white transition-colors duration-500"
          >
            Words from People I've Worked With
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }} 
            className="text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto text-lg font-body font-light leading-relaxed transition-colors duration-500"
          >
            Real feedback from clients, teammates, and collaborators across freelance projects, internships, and competitions.
          </motion.p>

          {/* Write a Review Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-4 flex justify-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative px-7 py-3.5 bg-[#111111] dark:bg-white text-white dark:text-black text-xs font-subheading font-bold uppercase tracking-widest rounded-full overflow-hidden group cursor-pointer transition-colors duration-300 shadow-lg border border-black/10 dark:border-white/10"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <PenSquare className="w-4 h-4" />
                <span>Write a Review</span>
              </span>
              <div className="absolute inset-0 bg-[#10B981] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />
            </button>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-[1200px] mx-auto relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full p-8 pt-10 rounded-[2rem] bg-white dark:bg-[#0E0E0E] border border-neutral-200 dark:border-white/10 hover:border-emerald-500/50 transition-all duration-700 flex flex-col justify-between items-start text-left group-hover:-translate-y-2 relative overflow-hidden shadow-lg">
                
                {/* Step Number */}
                <div className="absolute top-6 right-8 font-mono text-5xl font-bold text-neutral-100 dark:text-neutral-800/20 group-hover:text-emerald-500/10 transition-colors duration-500 select-none">
                  {t.step}
                </div>

                <div className="w-full">
                  {/* Icon / Rating */}
                  <div className="w-14 h-14 mb-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative z-10 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Quote className="w-6 h-6 stroke-1" />
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-7 font-body font-light italic mb-8 relative z-10">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info & LinkedIn Link */}
                <div className="w-full flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-white/5 relative z-10">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800">
                      <AvatarFallback className="text-neutral-600 dark:text-neutral-300 font-bold text-xs uppercase group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        {t.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-neutral-900 dark:text-white text-sm font-bold tracking-tight">{t.author}</h4>
                      <p className="text-[#111111] dark:text-neutral-300 group-hover:text-emerald-500 text-[10px] font-subheading font-bold uppercase tracking-widest transition-colors duration-300">{t.role}</p>
                    </div>
                  </div>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-neutral-400 hover:text-emerald-500 transition-colors duration-300 shrink-0"
                      title="View LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 fill-current stroke-none" />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-[#121214] rounded-[2.5rem] p-8 md:p-10 border border-black/10 dark:border-white/10 shadow-2xl text-foreground cursor-default overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-subheading font-bold uppercase tracking-widest text-emerald-500">
                  Share Your Feedback
                </span>
                <h3 className="text-2xl md:text-3xl font-anton uppercase text-neutral-900 dark:text-white mt-1">
                  Write a Review
                </h3>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="rev-name" className="text-xs font-subheading font-bold uppercase text-neutral-500 dark:text-neutral-400">
                    Your Name *
                  </Label>
                  <Input
                    id="rev-name"
                    placeholder="e.g. Alex Morgan"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="mt-1.5 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus-visible:border-emerald-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="rev-role" className="text-xs font-subheading font-bold uppercase text-neutral-500 dark:text-neutral-400">
                    Company / Role
                  </Label>
                  <Input
                    id="rev-role"
                    placeholder="e.g. Founder at TechCorp"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    className="mt-1.5 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus-visible:border-emerald-500 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="rev-quote" className="text-xs font-subheading font-bold uppercase text-neutral-500 dark:text-neutral-400">
                    Your Review / Testimonial *
                  </Label>
                  <Textarea
                    id="rev-quote"
                    placeholder="Share your experience working with Navneet..."
                    rows={4}
                    value={reviewForm.quote}
                    onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                    className="mt-1.5 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus-visible:border-emerald-500 rounded-xl resize-none"
                  />
                </div>

                {/* Rating Stars */}
                <div>
                  <Label className="text-xs font-subheading font-bold uppercase text-neutral-500 dark:text-neutral-400">
                    Rating
                  </Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewForm.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300 dark:text-neutral-700"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full h-14 bg-[#111111] dark:bg-white text-white dark:text-black font-subheading font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden group cursor-pointer transition-colors duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                      <Send className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-[#10B981] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};