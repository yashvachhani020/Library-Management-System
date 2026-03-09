import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import { useLibrary } from "../context/LibraryContext";
import { Book, Users, AlertCircle, Plus, Layers, Trash2, Clock } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdminDashboard() {
  const { books, transactions, addBook, deleteBook } = useLibrary(); 
  
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "General", quantity: 10 });

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("cat") || "dashboard";

  // Calculate Stats
  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
  const activeIssues = transactions.filter(t => t.status === "Active").length;
  const lowStock = books.filter(b => b.quantity < 5).length;
  const categoryBooks = books.filter(b => b.category === currentCategory);

  const handleAddInventory = () => {
    if (!newBook.title || !newBook.author) return;
    addBook(newBook);
    setNewBook({ title: "", author: "", category: "General", quantity: 10 });
    alert("Inventory updated successfully!");
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        
        {/* HEADER */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
            {currentCategory === "dashboard" ? "Admin Command Center" : `${currentCategory} Manager`}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            {currentCategory === "dashboard" 
              ? "Monitor circulation, inventory, and member activity." 
              : `Managing ${categoryBooks.length} titles in the ${currentCategory} collection.`}
          </p>
        </div>

        {/* MAIN CONTENT */}
        {currentCategory === "dashboard" ? (
          <div className="space-y-8 flex-1">
            
            {/* STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <StatCard title="Total Inventory" value={totalBooks} icon={Book} color="blue" />
              <StatCard title="Active Issues" value={activeIssues} icon={Users} color="amber" />
              <StatCard title="Low Stock Alerts" value={lowStock} icon={AlertCircle} color="rose" />
            </div>

            {/* OPERATIONAL ROW */}
            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
              
              {/* TRANSACTION LOG (Monitoring Only) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden h-full shadow-sm dark:shadow-none transition-colors">
                   <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
                        <Clock size={18} className="text-slate-500 dark:text-slate-400" /> Recent Activity Log
                      </h3>
                    </div>
                    
                    <div className="overflow-x-auto max-h-[500px]">
                      <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-100 dark:bg-slate-950/50 text-slate-700 dark:text-slate-200 uppercase text-xs font-bold tracking-wider sticky top-0 transition-colors">
                          <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Book Title</th>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5 transition-colors">
                          {transactions.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No transactions found.</td>
                            </tr>
                          ) : (
                            transactions.map((log) => (
                              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                <td className="px-6 py-4 font-mono text-slate-500">{log.issue_date || log.issueDate}</td>
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white transition-colors">{log.book_title || log.bookTitle}</td>
                                <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium transition-colors">
                                    {log.student_name || log.studentName}
                                    <span className="block text-xs text-slate-500 dark:text-slate-600 transition-colors">{log.student_id || log.studentId}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                                    log.status === 'Active' 
                                      ? 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-500 dark:border-amber-500/20' 
                                      : 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-500 dark:border-blue-500/20'
                                  }`}>
                                    {log.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>

              {/* QUICK ADD (Inventory Management) */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-fit shadow-sm dark:shadow-none transition-colors">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
                  <Plus size={18} className="text-purple-600 dark:text-purple-500" /> Add New Title
                </h3>
                <div className="space-y-4">
                  <input 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Book Title"
                    value={newBook.title}
                    onChange={e => setNewBook({...newBook, title: e.target.value})}
                  />
                  <input 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Author Name"
                    value={newBook.author}
                    onChange={e => setNewBook({...newBook, author: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <select 
                        className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none transition-colors"
                        value={newBook.category}
                        onChange={e => setNewBook({...newBook, category: e.target.value})}
                    >
                      <option>General</option>
                      <option>Tech</option>
                      <option>Sci-Fi</option>
                      <option>History</option>
                    </select>
                    <input 
                      type="number"
                      className="w-20 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      value={newBook.quantity}
                      onChange={e => setNewBook({...newBook, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <button 
                    onClick={handleAddInventory}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20"
                  >
                    Add Stock
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* CATEGORY VIEW (Inventory Management) */
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden animate-fade-in flex-1 shadow-sm dark:shadow-none transition-colors">
             <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center transition-colors">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
                <Layers size={18} className="text-blue-600 dark:text-blue-500" /> {currentCategory} Inventory
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5 transition-colors">
                {categoryBooks.length} Books
              </span>
            </div>
             <div className="divide-y divide-slate-200 dark:divide-white/5 transition-colors">
                {categoryBooks.length === 0 ? (
                    <div className="p-10 text-center text-slate-500">No books found in this category.</div>
                ) : categoryBooks.map((book) => (
                  <div key={book.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400 dark:text-slate-600 transition-colors"><Book size={16}/></div>
                      <div>
                        <div className="text-slate-900 dark:text-white font-bold transition-colors">{book.title}</div>
                        <div className="text-slate-500 text-sm transition-colors">{book.author}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteBook(book.id)} className="flex items-center gap-2 text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-400 text-sm font-bold bg-rose-100 dark:bg-rose-500/10 px-3 py-2 rounded-lg transition hover:bg-rose-200 dark:hover:bg-rose-500/20">
                        <Trash2 size={16} /> Remove
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="mt-12 border-t border-slate-200 dark:border-white/10 pt-8 transition-colors duration-300">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}