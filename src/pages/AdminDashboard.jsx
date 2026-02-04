import { useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useLibrary } from "../context/LibraryContext";
import { Book, Users, AlertCircle, Plus, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const { books, addBook, deleteBook, getStats } = useLibrary();
  const stats = getStats();
  
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "General" });

  const handleAdd = () => {
    if (!newBook.title || !newBook.author) return;
    addBook(newBook);
    setNewBook({ title: "", author: "", category: "General" });
  };

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">System Overview</h1>
          <p className="text-slate-400 mt-1">Real-time analysis of library performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Collection" value={stats.total} icon={Book} color="blue" />
        <StatCard title="Books Issued" value={stats.issued} icon={Users} color="amber" />
        <StatCard title="Available Now" value={stats.available} icon={AlertCircle} color="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Book size={18} className="text-blue-500" /> Library Catalog
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              {books.length} Records
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[500px] p-2">
             {books.length === 0 ? (
               <div className="text-center py-12 text-slate-500">No books found.</div>
             ) : (
               books.map((book) => (
                <div key={book.id} className="p-4 mb-2 rounded-xl bg-slate-950/50 hover:bg-slate-800 transition flex items-center justify-between group border border-transparent hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                      {book.title.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{book.title}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{book.author} • {book.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      book.status === 'Available' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {book.status}
                    </span>
                    <button 
                      onClick={() => deleteBook(book.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete Book"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
             )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit sticky top-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Plus size={18} className="text-emerald-500" /> Add Resource
          </h3>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Book Title</label>
              <input 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none transition"
                value={newBook.title}
                onChange={e => setNewBook({...newBook, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Author Name</label>
              <input 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none transition"
                value={newBook.author}
                onChange={e => setNewBook({...newBook, author: e.target.value})}
              />
            </div>

            <div className="space-y-2">
               <label className="text-xs font-semibold text-slate-500 uppercase">Category</label>
               <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-1 focus:ring-blue-500 outline-none transition appearance-none"
                  value={newBook.category}
                  onChange={e => setNewBook({...newBook, category: e.target.value})}
               >
                 <option>General</option>
                 <option>Technology</option>
                 <option>Sci-Fi</option>
                 <option>History</option>
               </select>
            </div>
            
            <button 
              onClick={handleAdd}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} /> Add to Library
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}