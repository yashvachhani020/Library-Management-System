import React, { useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { useLibrary } from "../context/LibraryContext"; 
import { useAuth } from "../context/AuthContext";
import { Search, Book, AlertCircle, BookOpen, Clock, CheckCircle, RotateCcw, PlusCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function UserDashboard() {
  const { books, transactions, borrowBook, returnBook } = useLibrary(); 
  const { user } = useAuth(); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get("cat") || "dashboard";

  // 1. FILTER: My Active Books
  const myIssuedBooks = transactions.filter(
    (t) => user && (t.student_id === user.studentId || t.studentId === user.studentId) && t.status === "Active"
  );
  
  // 2. HELPER: Check if I already have this book
  const doIHaveBook = (bookId) => {
    return myIssuedBooks.some(t => t.book_id === bookId || t.bookId === bookId);
  };

  // 3. FILTER: Catalog
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "dashboard" || 
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // --- HANDLERS ---
  const handleBorrow = async (book) => {
    if (!user) return;
    const result = await borrowBook(book.id, user.studentId, user.name);
    if (result.success) {
      alert(`Success! You have borrowed "${book.title}". Please collect it from the counter.`);
    }
  };

  const handleReturn = async (bookId) => {
    if (!window.confirm("Confirm return?")) return;
    const result = await returnBook(bookId, user.studentId);
    if (result.success) {
      alert("Book returned successfully!");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        
        {/* --- MY LIBRARY ACTIVITY --- */}
        <div className="mb-12 animate-fade-in border-b border-slate-200 dark:border-white/10 pb-12 transition-colors duration-300">
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors duration-300">
             <BookOpen size={24} className="text-blue-600 dark:text-blue-500" /> My Active Loans
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {/* COUNT CARD */}
             <div className="bg-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-600/20 relative overflow-hidden h-40 flex flex-col justify-center">
               <div className="relative z-10">
                 <div className="text-4xl font-bold text-white mb-1">{myIssuedBooks.length}</div>
                 <div className="text-sm text-blue-100 font-medium">Books Currently Borrowed</div>
                 <div className="text-[10px] text-blue-200 mt-2 bg-blue-700/50 inline-block px-2 py-1 rounded font-mono">
                   User: {user?.name}
                 </div>
               </div>
               <Book className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-500 opacity-50 rotate-12" />
             </div>

             {/* ACTIVE LOANS LIST */}
             <div className="md:col-span-3">
               {myIssuedBooks.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {myIssuedBooks.map((t) => (
                     <div key={t.id} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition min-h-[160px] shadow-sm dark:shadow-none">
                       <div>
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 transition-colors" title={t.book_title}>{t.book_title || t.bookTitle}</h4>
                           <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20 uppercase font-bold transition-colors">Active</span>
                         </div>
                         <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-2 transition-colors">
                           <Clock size={12} /> Issued: {t.issue_date || t.issueDate}
                         </p>
                       </div>
                       
                       {/* RETURN BUTTON */}
                       <button 
                         onClick={() => handleReturn(t.book_id || t.bookId)}
                         className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 dark:hover:bg-rose-600 text-slate-700 dark:text-white hover:text-white text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                       >
                         <RotateCcw size={12} className="group-hover:-rotate-90 transition-transform" /> Return Book
                       </button>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="h-40 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-slate-500 text-sm border-dashed transition-colors shadow-sm dark:shadow-none">
                   <BookOpen size={24} className="mb-2 opacity-50" />
                   <span>You have no active loans. Go borrow a book!</span>
                 </div>
               )}
             </div>
           </div>
        </div>

        {/* --- CATALOG SECTION --- */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
            {selectedCategory === "dashboard" ? "Library Catalog" : `${selectedCategory} Collection`}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">Browse and borrow books directly.</p>
        </div>

        {/* --- SEARCH --- */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by Title or Author..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm dark:shadow-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- BOOK GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-up flex-1">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const alreadyBorrowed = doIHaveBook(book.id);
              const outOfStock = book.quantity < 1;
              const canBorrow = !alreadyBorrowed && !outOfStock;

              return (
                <div key={book.id} className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-sm dark:shadow-none">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-white/5 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">
                      <Book size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-white/5 transition-colors">
                      {book.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 transition-colors">{book.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors">{book.author}</p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-200 dark:border-white/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${outOfStock ? "bg-rose-500" : "bg-emerald-500"}`} />
                        <span className={`text-xs font-bold uppercase ${outOfStock ? "text-rose-600 dark:text-rose-500" : "text-emerald-600 dark:text-emerald-500"}`}>
                          {outOfStock ? "Out of Stock" : "Available"}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-500 font-mono transition-colors">Qty: {book.quantity}</span>
                    </div>

                    {/* BORROW BUTTON */}
                    <button
                      onClick={() => handleBorrow(book)}
                      disabled={!canBorrow}
                      className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                        alreadyBorrowed 
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-transparent"
                          : outOfStock 
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-transparent" 
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20"
                      }`}
                    >
                      {alreadyBorrowed ? (
                        <> <CheckCircle size={16} /> Borrowed </>
                      ) : outOfStock ? (
                        <> <AlertCircle size={16} /> Out of Stock </>
                      ) : (
                        <> <PlusCircle size={16} /> Borrow Now </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">No books found</h3>
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-slate-200 dark:border-white/10 pt-8 transition-colors duration-300">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}