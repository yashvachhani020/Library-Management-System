import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useLibrary } from "../context/LibraryContext";
import { BookOpen, Clock, CheckCircle, Search } from "lucide-react";

export default function UserDashboard() {
  const { books, toggleStatus } = useLibrary();
  const myIssued = books.filter(b => b.status === "Issued").length;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Student Portal</h1>
        <p className="text-slate-400 mt-1">Browse the catalog and manage your reading list.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="My Active Books" value={myIssued} icon={BookOpen} color="blue" />
        <StatCard title="Return Due Date" value="Feb 28" icon={Clock} color="amber" />
        <StatCard title="Pending Fines" value="$0.00" icon={CheckCircle} color="emerald" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
           <h3 className="text-lg font-bold text-white">Digital Catalog</h3>
           <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
             <input 
               placeholder="Search books..." 
               className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
             />
           </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {books.map(book => (
            <div key={book.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition duration-300 group relative overflow-hidden">
              <div className="mb-4 relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded uppercase">
                    {book.category}
                  </span>
                  {book.status === "Issued" && (
                     <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                       Rented
                     </span>
                  )}
                </div>
                <h4 className="font-bold text-lg text-white leading-tight mb-1">{book.title}</h4>
                <p className="text-sm text-slate-500">{book.author}</p>
              </div>
              
              <div className="relative z-10 pt-4 border-t border-slate-800/50">
                <button
                  onClick={() => toggleStatus(book.id)}
                  disabled={book.status === "Issued"}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                    book.status === "Available"
                      ? "bg-white text-slate-950 hover:bg-slate-200 shadow-lg shadow-white/10"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {book.status === "Available" ? "Issue Now" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}