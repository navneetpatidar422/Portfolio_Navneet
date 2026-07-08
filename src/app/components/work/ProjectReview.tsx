import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";
import { submitToBackend } from "../../utils/formSubmit";

interface ProjectReviewProps {
  projectId: string;
  accentColor?: string;
}

export const ProjectReview = ({ projectId, accentColor = "#6d28d9" }: ProjectReviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please give a star rating before submitting.");
      return;
    }
    if (!text.trim()) {
      toast.error("Please write your feedback.");
      return;
    }

    setIsSubmitting(true);

    // 1. Submit to Google Sheets (if configured)
    await submitToBackend({
      type: "review",
      projectId,
      rating,
      text: text.trim(),
      name: name.trim() || "Anonymous",
      email: email.trim() || ""
    });

    // 2. Save to localStorage fallback for Admin Dashboard
    const review = {
      id: Math.random().toString(36).substring(2, 9),
      projectId,
      rating,
      text: text.trim(),
      name: name.trim() || "Anonymous",
      email: email.trim() || "",
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("portfolio_project_reviews");
    const reviews = existing ? JSON.parse(existing) : [];
    reviews.push(review);
    localStorage.setItem("portfolio_project_reviews", JSON.stringify(reviews));

    setIsSubmitting(false);
    toast.success("Thank you for your review! 🙏");
    setRating(0);
    setName("");
    setEmail("");
    setText("");
    setIsOpen(false);
  };

  const isDarkPage = projectId === "isro";

  return (
    <section className="max-w-5xl mx-auto px-6 mb-24">
      {/* Trigger Card */}
      <div className={`border border-dashed rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        isDarkPage 
          ? "border-neutral-850 bg-[#0d0d12]" 
          : "border-neutral-200 dark:border-neutral-800 bg-transparent"
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl shadow-sm border ${
            isDarkPage 
              ? "bg-neutral-900 border-neutral-800 text-white" 
              : "bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-white"
          }`}>
            <MessageSquare className="w-6 h-6 text-inherit" />
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-1 ${
              isDarkPage ? "text-white" : "text-neutral-900 dark:text-white"
            }`}>
              What did you think?
            </h3>
            <p className={`text-sm leading-relaxed max-w-sm ${
              isDarkPage ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-450"
            }`}>
              Every perspective helps me become a better designer.
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          style={isDarkPage ? { backgroundColor: accentColor } : undefined}
          className={`shrink-0 px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all ${
            isDarkPage 
              ? "text-white hover:brightness-115" 
              : "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200"
          }`}
        >
          Write Review
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — doubles as scrollable container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto pt-20 pb-8"
            >
              {/* Modal Card — click stops backdrop dismiss */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative mx-auto mb-8 w-[calc(100%-2rem)] md:w-[520px] bg-white dark:bg-neutral-900 rounded-[2rem] shadow-2xl border border-neutral-100 dark:border-neutral-800 text-foreground transition-colors duration-500 overflow-hidden"
              >
                {/* Sticky Header — always visible, close button always reachable */}
                <div className="sticky top-0 z-10 bg-white dark:bg-neutral-900 px-8 pt-8 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">What did you think?</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">Every perspective helps me become a better designer.</p>
                </div>

                {/* Scrollable Form Body */}
                <div className="px-8 pb-8 pt-5">
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Star Rating */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 block">
                        Your Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-neutral-200 fill-neutral-200 dark:text-neutral-700 dark:fill-neutral-700"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 block">
                        Your Name <span className="normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Anonymous"
                        className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 block">
                        Your Email <span className="normal-case tracking-normal">(optional — so I can thank you!)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 block">
                        Your Feedback *
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What did you think about this project? What stood out?"
                        rows={4}
                        className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 bg-neutral-950 dark:!bg-neutral-100 text-white dark:!text-neutral-950 font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:!bg-neutral-200 transition-colors disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="text-inherit">Submitting...</span>
                      ) : (
                        <>
                          <span className="text-inherit">Submit Review</span>
                          <Send className="w-4 h-4 text-inherit" />
                        </>
                      )}
                    </motion.button>

                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
