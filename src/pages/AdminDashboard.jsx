import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useLibrary } from "../context/LibraryContext";
import { Book, Users, AlertCircle, Plus, Calendar, Trash2, Layers, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { books, transactions, addBook, deleteBook } = useLibrary();
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "General", quantity: 10 });
  
  // 1. Get Category from URL
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentCategory = searchParams.get("cat") || "trending";

  // Stats Calculations
  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
  const activeIssues = transactions.filter(t => t.status === "Active").length;
  const lowStock = books.filter(b => b.quantity < 5).length;

  // Filter books for the specific category view
  const categoryBooks = books.filter(b => b.category === currentCategory);

  const handleAdd = () => {
    if (!newBook.title || !newBook.author) return;
    addBook(newBook);
    setNewBook({ title: "", author: "", category: "General", quantity: 10 });
    alert("Inventory updated successfully!");
  };

  return (
    <Layout>
      {/* --- HEADER --- */}
      <div className="mb-8 flex justify-between items-end animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {currentCategory === "trending" ? "Admin Command Center" : `Managing ${currentCategory}`}
          </h1>
          <p className="text-slate-400 mt-1">
            {currentCategory === "trending" 
              ? "Monitor circulation, inventory, and member activity." 
              : `Total ${categoryBooks.length} titles in this collection.`}
          </p>
        </div>
        
        {/* Back Button (Only visible when inside a category) */}
        {currentCategory !== "trending" && (
          <button 
            onClick={() => navigate("/admin?cat=trending")}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Overview
          </button>
        )}
      </div>

      {/* ==================================================================================
          VIEW 1: DASHBOARD OVERVIEW (Trending)
          Shows: Stats, Logs, Add Inventory
         ================================================================================== */}
      {currentCategory === "trending" ? (
        <>
          {/* STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <StatCard title="Total Inventory" value={totalBooks} icon={Book} color="blue" />
            <StatCard title="Active Issues" value={activeIssues} icon={Users} color="amber" />
            <StatCard title="Low Stock Alerts" value={lowStock} icon={AlertCircle} color="rose" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
            
            {/* RECENT ACTIVITY LOG */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/10 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" /> Recent Circulation Log
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[500px]">
                 {transactions.length === 0 ? (
                   <div className="text-center py-12 text-slate-500">No recent transactions found.</div>
                 ) : (
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="text-xs text-slate-500 uppercase border-b border-white/5 bg-white/5">
                         <th className="px-6 py-4 font-semibold">User</th>
                         <th className="px-6 py-4 font-semibold">Book</th>
                         <th className="px-6 py-4 font-semibold">Date</th>
                         <th className="px-6 py-4 font-semibold">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                       {transactions.slice().reverse().map((log) => (
                         <tr key={log.id} className="hover:bg-white/5 transition">
                           <td className="px-6 py-4">
                             <div className="font-medium text-white">{log.userName}</div>
                             <div className="text-xs text-slate-500">{log.userId}</div>
                           </td>
                           <td className="px-6 py-4 text-slate-300">{log.bookTitle}</td>
                           <td className="px-6 py-4 text-slate-400 text-sm">{log.issueDate}</td>
                           <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               log.status === 'Active' 
                                 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                 : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                             }`}>
                               {log.status}
                             </span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 )}
              </div>
            </div>

            {/* ADD BOOK WIDGET */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Plus size={18} className="text-emerald-500" /> Quick Add Inventory
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Book Title</label>
                    <input 
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                      value={newBook.title}
                      onChange={e => setNewBook({...newBook, title: e.target.value})}
                      placeholder="e.g. The Great Gatsby"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Author</label>
                    <input 
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                      value={newBook.author}
                      onChange={e => setNewBook({...newBook, author: e.target.value})}
                      placeholder="e.g. F. Scott Fitzgerald"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Category</label>
                      <select 
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                          value={newBook.category}
                          onChange={e => setNewBook({...newBook, category: e.target.value})}
                      >
                        <option>General</option>
                        <option>Tech</option>
                        <option>Sci-Fi</option>
                        <option>History</option>
                      </select>
                    </div>
                    <div className="w-24">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Qty</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                        value={newBook.quantity}
                        onChange={e => setNewBook({...newBook, quantity: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAdd}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20 mt-2"
                  >
                    Add to Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ==================================================================================
           VIEW 2: CATEGORY MANAGEMENT (e.g., Tech, Sci-Fi)
           Shows: List of books in that category with Delete options
           ================================================================================== */
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden animate-fade-in">
           <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-blue-500" /> {currentCategory} Inventory
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-white/5">
              {categoryBooks.length} Books
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {categoryBooks.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p>No books found in this category.</p>
              </div>
            ) : (
              categoryBooks.map((book) => (
                <div key={book.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition group">
                  <div className="flex items-center gap-6">
                    {/* Mini Cover Icon */}
                    <div className="w-12 h-16 bg-slate-800 rounded-lg flex items-center justify-center border border-white/5 text-slate-600">
                      <Book size={20} />
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white text-lg">{book.title}</h4>
                      <p className="text-sm text-slate-400">{book.author}</p>
                      
                      {/* Stock Indicator */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${book.quantity > 5 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wide ${book.quantity > 5 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {book.quantity} Copies Left
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button 
                    onClick={() => {
                      if(window.confirm(`Delete "${book.title}" from library?`)) {
                        deleteBook(book.id);
                      }
                    }}
                    className="p-3 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}