import Layout from "../components/Layout";
import CategorySection from "../components/CategorySection";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer"; 
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext"; // Import Auth to check user ID
import { BookOpen, Clock, CheckCircle, Search, Grid, Sparkles, Layers } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function UserDashboard() {
  const { books, transactions } = useLibrary(); // Import transactions
  const { user } = useAuth(); // Get current user
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  
  const currentCategory = searchParams.get("cat") || "trending";
  
  // BUG FIX: Count active transactions for THIS user
  const myIssued = transactions.filter(t => 
    t.userId === user?.email && t.status === "Active"
  ).length;

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {currentCategory === "trending" ? (
              <><Sparkles className="text-yellow-400" /> Trending Library</>
            ) : (
              <><Layers className="text-blue-400" /> {currentCategory} Collection</>
            )}
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            {currentCategory === "trending" 
              ? "Explore our most popular categories." 
              : `Browsing ${filteredBooks.filter(b => b.category === currentCategory).length} books in this category.`}
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
          <input 
            placeholder="Search library..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* STATS */}
      {!searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Books</p>
              {/* This will now update correctly! */}
              <h3 className="text-2xl font-bold text-white mt-1">{myIssued}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <BookOpen size={20} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Return Due</p>
              <h3 className="text-2xl font-bold text-white mt-1">Feb 28</h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400">
              <Clock size={20} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Fine Status</p>
              {/* Currency Change */}
              <h3 className="text-2xl font-bold text-white mt-1">₹0.00</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="min-h-[50vh]">
        {searchTerm ? (
           <CategorySection title="Search Results" books={filteredBooks} />
        ) : (
          <>
            {currentCategory === "trending" ? (
              <div className="space-y-8 animate-slide-up">
                <CategorySection title="Hot in Technology" books={filteredBooks.filter(b => b.category === "Tech")} />
                <CategorySection title="Sci-Fi Blockbusters" books={filteredBooks.filter(b => b.category === "Sci-Fi")} />
                <CategorySection title="Timeless History" books={filteredBooks.filter(b => b.category === "History")} />
                <CategorySection title="Popular General" books={filteredBooks.filter(b => b.category === "General")} />
              </div>
            ) : (
              <div className="animate-fade-in">
                {filteredBooks.filter(b => b.category === currentCategory).length === 0 ? (
                  <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
                    <Grid size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No books found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredBooks
                      .filter(b => b.category === currentCategory)
                      .map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </Layout>
  );
}