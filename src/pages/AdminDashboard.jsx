import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import { useLibrary } from "../context/LibraryContext";
// Fixed: Removed 'Calendar' from imports
import { Book, Users, AlertCircle, Plus, Layers, CheckCircle, UserPlus, Trash2, Clock } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdminDashboard() {
  const { books, transactions, addBook, deleteBook, issueBook } = useLibrary(); 
  
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "General", quantity: 10 });
  const [issueData, setIssueData] = useState({ studentName: "", bookId: "" });

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("cat") || "trending";

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

  const handleIssueBook = () => {
    if (!issueData.studentName || !issueData.bookId) {
      alert("Please enter student name and select a book.");
      return;
    }
    // Find book to get current details (title, ID)
    const bookToIssue = books.find(b => b.id === parseInt(issueData.bookId));
    
    if (bookToIssue && bookToIssue.quantity > 0) {
      const transaction = {
         id: Date.now(),
         bookId: bookToIssue.id,
         bookTitle: bookToIssue.title,
         userName: issueData.studentName,
         userId: `STU-${Math.floor(Math.random() * 1000)}`,
         issueDate: new Date().toLocaleDateString(),
         status: "Active"
      };

      issueBook(transaction); // Context now handles stock update!
      setIssueData({ studentName: "", bookId: "" });
      alert(`Book "${bookToIssue.title}" issued to ${issueData.studentName}. Stock updated.`);
    } else {
      alert("Book not found or out of stock.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        
        {/* HEADER */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {currentCategory === "trending" ? "Admin Command Center" : `${currentCategory} Manager`}
          </h1>
          <p className="text-slate-400 mt-1">
            {currentCategory === "trending" 
              ? "Monitor circulation, inventory, and member activity." 
              : `Managing ${categoryBooks.length} titles in the ${currentCategory} collection.`}
          </p>
        </div>

        {/* MAIN CONTENT */}
        {currentCategory === "trending" ? (
          <div className="space-y-8 flex-1">
            
            {/* 1. STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <StatCard title="Total Inventory" value={totalBooks} icon={Book} color="blue" />
              <StatCard title="Active Issues" value={activeIssues} icon={Users} color="amber" />
              <StatCard title="Low Stock Alerts" value={lowStock} icon={AlertCircle} color="rose" />
            </div>

            {/* 2. OPERATIONAL ROW */}
            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
              
              {/* CIRCULATION DESK */}
              <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-500" /> Circulation Desk
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Student Name</label>
                    <input 
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                      placeholder="e.g. John Doe"
                      value={issueData.studentName}
                      onChange={(e) => setIssueData({...issueData, studentName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Select Book</label>
                    <select 
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 mt-1"
                      value={issueData.bookId}
                      onChange={(e) => setIssueData({...issueData, bookId: e.target.value})}
                    >
                      <option value="">-- Choose Book --</option>
                      {books.map(b => (
                        <option key={b.id} value={b.id} disabled={b.quantity === 0}>
                          {b.title} {b.quantity === 0 ? "(Out of Stock)" : `(Qty: ${b.quantity})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleIssueBook}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Confirm Issue
                </button>
              </div>

              {/* QUICK ADD INVENTORY */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Plus size={18} className="text-purple-500" /> Add New Title
                </h3>
                <div className="space-y-4">
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm"
                    placeholder="Book Title"
                    value={newBook.title}
                    onChange={e => setNewBook({...newBook, title: e.target.value})}
                  />
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm"
                    placeholder="Author Name"
                    value={newBook.author}
                    onChange={e => setNewBook({...newBook, author: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <select 
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm"
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
                      className="w-20 bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm"
                      value={newBook.quantity}
                      onChange={e => setNewBook({...newBook, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <button 
                    onClick={handleAddInventory}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition"
                  >
                    Add Stock
                  </button>
                </div>
              </div>
            </div>

            {/* 3. DETAILED ISSUE HISTORY TABLE */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
               <div className="p-6 border-b border-white/10 bg-slate-900/50">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock size={18} className="text-slate-400" /> Issue History Log
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-950/50 text-slate-200 uppercase text-xs font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Book Title</th>
                        <th className="px-6 py-4">Student Name</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No transactions found.</td>
                        </tr>
                      ) : (
                        transactions.map((log) => (
                          <tr key={log.id} className="hover:bg-white/5 transition">
                            <td className="px-6 py-4 font-mono text-slate-500">{log.issueDate}</td>
                            <td className="px-6 py-4 font-bold text-white">{log.bookTitle}</td>
                            <td className="px-6 py-4 text-blue-400">{log.userName}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
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
        ) : (
          /* CATEGORY VIEW (Unchanged) */
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden animate-fade-in flex-1">
             <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers size={18} className="text-blue-500" /> {currentCategory} Inventory
              </h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-white/5">
                {categoryBooks.length} Books
              </span>
            </div>
             <div className="divide-y divide-white/5">
                {categoryBooks.length === 0 ? (
                    <div className="p-10 text-center text-slate-500">No books found in this category.</div>
                ) : categoryBooks.map((book) => (
                  <div key={book.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-12 bg-slate-800 rounded flex items-center justify-center text-slate-600"><Book size={16}/></div>
                      <div>
                        <div className="text-white font-bold">{book.title}</div>
                        <div className="text-slate-500 text-sm">{book.author}</div>
                      </div>
                    </div>
                    <button 
                        onClick={() => deleteBook(book.id)} 
                        className="flex items-center gap-2 text-rose-500 hover:text-rose-400 text-sm font-bold bg-rose-500/10 px-3 py-2 rounded-lg transition"
                    >
                        <Trash2 size={16} /> Remove
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}