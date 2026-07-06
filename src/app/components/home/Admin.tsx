import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, MessageSquare, Star, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
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
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Export Excel/CSV
              </button>
              <button 
                onClick={clearMessages}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
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
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Export Excel/CSV
              </button>
              <button 
                onClick={clearReviews}
                className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
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
                      <td className="py-4 font-bold text-neutral-850 pr-4">{rev.name || "Anonymous"}</td>
                      <td className="py-4 text-center pr-4">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-amber-55/60 border border-amber-200/50 px-2 py-0.5 rounded text-amber-700">
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
