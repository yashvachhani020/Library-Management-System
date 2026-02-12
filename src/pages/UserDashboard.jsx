import React, { useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { useLibrary } from "../context/LibraryContext";
import { Search, Book, AlertCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom"; // Added useSearchParams

export default function UserDashboard() {
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  
  // FIXED: Get category from URL (Sidebar) instead of local state
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("cat") || "All";

  // Filter Logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if category matches OR if "All" (or "trending") is selected
    const matchesCategory =
      selectedCategory === "All" || 
      selectedCategory === "trending" || 
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">
            {selectedCategory === "All" || selectedCategory === "trending" 
              ? "Digital Catalog" 
              : `${selectedCategory} Collection`}
          </h1>
          <p className="text-slate-400">
            Browse the library collection. Contact the librarian to issue a book.
          </p>
        </div>

        {/* --- SEARCH BAR ONLY (Removed Category Buttons) --- */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search by Title or Author..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- BOOK GRID (READ ONLY) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-up flex-1">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-slate-900/50 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 border border-white/5 group-hover:text-blue-500 transition">
                    <Book size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-2 py-1 rounded border border-white/5">
                    {book.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{book.author}</p>

                {/* STATUS BADGE */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        book.quantity > 0 ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase ${
                        book.quantity > 0 ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {book.quantity > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Qty: {book.quantity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">No books found</h3>
              <p className="text-slate-400">Try adjusting your search filters.</p>
            </div>
          )}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-auto border-t border-white/10 pt-8">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}