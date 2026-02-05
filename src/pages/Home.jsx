import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, Library, Book } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-blue-500/30 font-sans">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Library className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">LMS<span className="text-blue-500">.Portal</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="hidden md:block text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            Librarian Access
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-white text-slate-950 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg shadow-white/5"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20 flex flex-col lg:flex-row items-center gap-16 md:gap-20">
        
        {/* LEFT: Search & Welcome (Public Access) */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Central Library.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Your gateway to knowledge. Search our extensive catalog of physical books, journals, and research papers.
          </p>

          {/* SEARCH BAR - The Core Feature */}
          <div className="relative max-w-lg mx-auto lg:mx-0 group">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
              <Search className="text-slate-400 ml-4" size={20} />
              <input 
                type="text" 
                placeholder="Search by Title, Author, or ISBN..." 
                className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder-slate-500 text-base"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20">
                Search
              </button>
            </div>
            <div className="mt-3 flex items-center gap-4 justify-center lg:justify-start text-xs text-slate-500 font-medium">
              <span>Popular:</span>
              <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">System Design</span>
              <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">Algorithms</span>
              <span className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">Fiction</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Featured Books Showcase (Not Admin Data) */}
        <div className="flex-1 relative w-full max-w-[500px]">
          {/* Glass Card Container */}
          <div className="relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-slate-100 font-semibold">
                <BookOpen size={18} className="text-blue-500" />
                <span>New Arrivals</span>
              </div>
              <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                Live Catalog
              </span>
            </div>

            {/* Book List (Static Showcase) */}
            <div className="space-y-4">
              <BookRow 
                title="The Pragmatic Programmer" 
                author="Andy Hunt" 
                tag="Tech"
                color="bg-purple-500" 
              />
              <BookRow 
                title="Clean Code" 
                author="Robert C. Martin" 
                tag="Engineering"
                color="bg-blue-500" 
              />
              <BookRow 
                title="Atomic Habits" 
                author="James Clear" 
                tag="Self-Help"
                color="bg-emerald-500" 
              />
              <BookRow 
                title="Dune" 
                author="Frank Herbert" 
                tag="Sci-Fi"
                color="bg-orange-500" 
              />
            </div>

            {/* Footer */}
            <button 
              onClick={() => navigate('/login')}
              className="w-full mt-6 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              View Full Catalog <ArrowRight size={16} />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl -z-10"></div>
        </div>

      </main>
    </div>
  );
};

// --- HELPER COMPONENT FOR BOOKS ---
const BookRow = ({ title, author, tag, color }) => (
  <div className="group flex items-center gap-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-blue-500/30 transition-all hover:bg-slate-800/50 cursor-pointer">
    {/* Fake Book Cover Icon */}
    <div className={`w-10 h-12 rounded-md ${color} bg-opacity-20 flex items-center justify-center border border-white/5`}>
      <Book size={16} className="text-slate-200" />
    </div>
    
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-slate-200 truncate group-hover:text-blue-400 transition-colors">
        {title}
      </h4>
      <p className="text-xs text-slate-500 truncate">{author}</p>
    </div>

    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
      {tag}
    </span>
  </div>
);

export default Home;