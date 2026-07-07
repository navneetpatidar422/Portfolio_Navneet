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

    // 2. Save submission to local storage fallback for Admin Dashboard Excel export
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

  return (
    <section className="max-w-5xl mx-auto px-6 mb-24">
      {/* Trigger */}
      <div className="border border-dashed border-neutral-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-neutral-200 dark:border-none shadow-sm">
            <MessageSquare className="w-6 h-6 text-[#000000]" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-neutral-900 mb-1">What did you think?</h3>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              Every perspective helps me become a better designer.
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="shrink-0 px-8 py-3 bg-neutral-950 text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all"
        >
          Write Review
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-full md:w-[520px] bg-white dark:bg-neutral-900 rounded-[2rem] shadow-2xl border border-neutral-100 dark:border-neutral-800 p-8 md:p-10 text-foreground transition-colors duration-500"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold tracking-tight">What did you think?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Every perspective helps me become a better designer.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 block">
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
                              : "text-neutral-200 fill-neutral-200 dark:text-neutral-800 dark:fill-neutral-800"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 block">
                    Your Name <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-foreground focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 block">
                    Your Email <span className="normal-case tracking-normal">(optional — so I can thank you!)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-foreground focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all"
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 block">
                    Your Feedback *
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What did you think about this project? What stood out?"
                    rows={4}
                    className="w-full border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-950 text-foreground focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-neutral-900 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 bg-neutral-950 dark:bg-[#FAF9F5] text-white dark:text-black font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Review <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
