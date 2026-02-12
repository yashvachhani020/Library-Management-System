import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Zap, ShieldCheck, Globe, Users, Book } from "lucide-react";
import Footer from "../components/Footer"; 

export default function Home() {
  const navigate = useNavigate();

  // Hardcoded "Trending" preview for the landing page
  const trendingPreview = [
    { title: "The Pragmatic Programmer", author: "Andy Hunt", category: "TECH" },
    { title: "Clean Code", author: "Robert C. Martin", category: "ENG" },
    { title: "Atomic Habits", author: "James Clear", category: "SELF-HELP" },
    { title: "Dune", author: "Frank Herbert", category: "SCI-FI" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <BookOpen size={18} className="text-white" />
            </div>
            {/* CHANGED HERE: Full Title */}
            Library Management System
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button onClick={() => navigate("/login")} className="text-slate-400 hover:text-white transition hidden md:block">
              Librarian Access
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="bg-white text-slate-950 px-5 py-2 rounded-full hover:bg-blue-50 transition font-bold"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <header className="relative pt-16 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Welcome to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Central Library.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
              Your gateway to knowledge. Search our extensive catalog of physical books, journals, and digital assets instantly.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
              <span className="hover:text-blue-400 cursor-default transition">Popular:</span>
              <span className="hover:text-white cursor-pointer transition">System Design</span>
              <span className="hover:text-white cursor-pointer transition">Algorithms</span>
              <span className="hover:text-white cursor-pointer transition">Fiction</span>
            </div>
          </div>

          {/* RIGHT: TRENDING CARD */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl blur-2xl opacity-20" />
            
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="flex items-center gap-2 font-bold text-lg text-white">
                  <BookOpen size={18} className="text-blue-400" /> New Arrivals
                </h3>
                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                  Live Catalog
                </span>
              </div>

              <div className="space-y-3">
                {trendingPreview.map((book, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-white/5 hover:border-white/10 transition group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-white transition">
                        <Book size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-blue-400 transition">{book.title}</div>
                        <div className="text-xs text-slate-500">{book.author}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-900 border border-white/10 px-2 py-1 rounded">
                      {book.category}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate("/login")}
                className="w-full mt-6 py-3 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition flex items-center justify-center gap-2"
              >
                View Full Catalog <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* --- 3. FEATURES SECTION --- */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-blue-500/30 transition group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Availability</h3>
              <p className="text-slate-400 leading-relaxed">
                Check real-time stock status of any book. Our smart inventory system updates instantly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-emerald-500/30 transition group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Accounts</h3>
              <p className="text-slate-400 leading-relaxed">
                Your reading history and personal data are encrypted. Manage fines and due dates securely.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-purple-500/30 transition group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Access</h3>
              <p className="text-slate-400 leading-relaxed">
                Access the catalog 24/7. Reserve books online and pick them up at your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT & STATS --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering Learners</h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                LMS Pro was built to remove the friction between students and knowledge.
                We believe a library should be a dynamic engine of discovery, not just a warehouse.
              </p>
            </div>
            <button className="mt-8 flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition">
              Read our mission <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center">
              <div className="text-4xl font-bold text-white mb-1">15k+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Books</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-1">24/7</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Access</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center col-span-2">
              <div className="flex justify-center -space-x-4 mb-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-400">
                     <Users size={14} />
                   </div>
                 ))}
              </div>
              <div className="text-xl font-bold text-white">Trusted by 5,000+ Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <div className="max-w-7xl mx-auto px-6">
        <Footer />
      </div>

    </div>
  );
}