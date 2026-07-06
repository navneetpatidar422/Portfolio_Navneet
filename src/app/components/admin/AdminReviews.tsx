import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, Star, Trash2, RefreshCw } from "lucide-react";

interface Review {
  id: string;
  projectId: string;
  rating: number;
  text: string;
  name: string;
  createdAt: string;
}

export const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = () => {
    const data = localStorage.getItem("portfolio_project_reviews");
    setReviews(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem("portfolio_project_reviews", JSON.stringify(updated));
  };

  const exportCSV = () => {
    const header = ["ID", "Project", "Rating", "Name", "Review", "Date"];
    const rows = reviews.map((r) => [
      r.id,
      r.projectId,
      r.rating,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.text.replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString(),
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-reviews-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const projectColors: Record<string, string> = {
    paygo: "#1B998B",
    flashback: "#900C3F",
    bharatvibe: "#FF6B35",
    isro: "#2563EB",
    amazon: "#FF9900",
    pratham: "#D4AF37",
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Project Reviews</h1>
            <p className="text-neutral-500 text-sm mt-1">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""} collected
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={load}
              className="flex items-center gap-2 px-5 py-2.5 border border-neutral-300 rounded-full text-sm font-bold hover:bg-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={exportCSV}
              disabled={reviews.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white rounded-full text-sm font-bold disabled:opacity-40 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </motion.button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-32 text-neutral-400">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No reviews yet</p>
            <p className="text-sm mt-1">Reviews will appear here once visitors submit them.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews
              .slice()
              .reverse()
              .map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 md:items-start shadow-sm"
                >
                  {/* Project Badge */}
                  <div className="shrink-0">
                    <span
                      className="inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor: projectColors[review.projectId] ?? "#555",
                      }}
                    >
                      {review.projectId}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-neutral-200 fill-neutral-200"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-neutral-400">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-2">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="font-semibold text-neutral-600">{review.name}</span>
                      <span>·</span>
                      <span>{new Date(review.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="shrink-0 p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-neutral-400 transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
