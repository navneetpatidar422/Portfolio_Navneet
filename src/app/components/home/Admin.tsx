import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, MessageSquare, Star, Trash2, ArrowLeft, Shield, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

interface Review {
  id: string;
  projectId: string;
  rating: number;
  text: string;
  name: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  description: string;
  createdAt: string;
}

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Check session authentication status
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Load local reviews
    const storedReviews = localStorage.getItem("portfolio_project_reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }

    // Load local contact messages
    const storedMessages = localStorage.getItem("portfolio_contact_messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput === "navneetpatidar422@gmail.com" && passwordInput === "DPK@422#") {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      toast.success("Successfully authenticated!");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setEmailInput("");
    setPasswordInput("");
    toast.success("Logged out successfully");
  };

  const clearReviews = () => {
    if (window.confirm("Are you sure you want to delete all reviews?")) {
      localStorage.removeItem("portfolio_project_reviews");
      setReviews([]);
    }
  };

  const clearMessages = () => {
    if (window.confirm("Are you sure you want to delete all messages?")) {
      localStorage.removeItem("portfolio_contact_messages");
      setMessages([]);
    }
  };

  const exportToCSV = (data: any[], fileName: string, headers: string[]) => {
    if (data.length === 0) {
      alert("No data available to export!");
      return;
    }

    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        // Clean values to avoid CSV breakage
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex flex-col justify-center items-center p-6 md:p-12 pt-28">
        <div className="max-w-md w-full bg-white border border-black/5 shadow-xl rounded-[2rem] p-8 md:p-10 space-y-6 relative overflow-hidden">
          
          {/* Subtle Abstract Glow */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center space-y-2 animate-fadeIn">
            <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-tight pt-2">Admin Security</h1>
            <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">Sign in to access dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@example.com"
                className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm bg-neutral-50 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-neutral-200 rounded-xl pl-4 pr-10 py-3 text-sm bg-neutral-50 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 bg-neutral-950 text-white font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-md mt-6 cursor-pointer"
            >
              Authenticate <Shield className="w-4 h-4" />
            </motion.button>
          </form>

          <div className="border-t border-black/5 pt-4 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Portfolio
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#111111] p-6 md:p-12 pt-28">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 pb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black mb-3">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-500 text-sm mt-1">Review feedback and messages collected locally.</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-250 text-neutral-600 hover:text-red-600 hover:bg-red-50/50 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm self-start md:self-center"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </motion.button>
        </div>

        {/* Contact Form Submissions */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Contact Form Submissions ({messages.length})
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => exportToCSV(messages, "contact_messages", ["name", "email", "description", "createdAt"])}
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export Excel/CSV
              </button>
              <button 
                onClick={clearMessages}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>
          </div>

          {messages.length === 0 ? (
            <p className="text-neutral-400 text-sm italic py-4">No contact messages submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {messages.map(msg => (
                    <tr key={msg.id} className="hover:bg-neutral-50/50">
                      <td className="py-4 font-bold text-neutral-900 pr-4">{msg.name}</td>
                      <td className="py-4 text-purple-600 font-medium pr-4">{msg.email}</td>
                      <td className="py-4 text-neutral-600 pr-4 max-w-xs md:max-w-md truncate md:whitespace-normal">{msg.description}</td>
                      <td className="py-4 text-neutral-400 text-xs text-right whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Case Study Reviews */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Project Reviews & Ratings ({reviews.length})
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => exportToCSV(reviews, "project_reviews", ["projectId", "name", "rating", "text", "createdAt"])}
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export Excel/CSV
              </button>
              <button 
                onClick={clearReviews}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>
          </div>

          {reviews.length === 0 ? (
            <p className="text-neutral-400 text-sm italic py-4">No reviews submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Project</th>
                    <th className="pb-3 font-semibold">Reviewer</th>
                    <th className="pb-3 font-semibold text-center">Rating</th>
                    <th className="pb-3 font-semibold">Feedback</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {reviews.map(rev => (
                    <tr key={rev.id} className="hover:bg-neutral-50/50">
                      <td className="py-4 font-mono text-xs font-bold text-neutral-900 pr-4 uppercase">{rev.projectId}</td>
                      <td className="py-4 font-bold text-neutral-800 pr-4">{rev.name || "Anonymous"}</td>
                      <td className="py-4 text-center pr-4">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded text-amber-700">
                          {rev.rating} <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        </span>
                      </td>
                      <td className="py-4 text-neutral-600 pr-4 max-w-xs truncate md:whitespace-normal">{rev.text}</td>
                      <td className="py-4 text-neutral-400 text-xs text-right whitespace-nowrap">{new Date(rev.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
