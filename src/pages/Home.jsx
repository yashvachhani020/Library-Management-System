import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Shield, Zap, Layout } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col selection:bg-blue-500/30">
      
      {/* --- Premium Background Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[130px] rounded-full pointer-events-none opacity-60" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none opacity-40" />

      {/* --- Navbar --- */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
               <BookOpen size={20} className="text-white" />
             </div>
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              LMS
            </span>
          </div>
          <button 
            onClick={() => navigate("/login")} 
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-full text-sm font-medium transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* --- Main Hero Content --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 py-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-8 shadow-glow">
          <Zap size={14} /> System v2.0
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          Library Management <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            System
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The central hub for managing your library's entire catalog, member database, and circulation records with enterprise-grade security.
        </p>
        
        {/* Login Action */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button 
            onClick={() => navigate("/login")}
            className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 text-lg"
          >
            Access Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Feature Grid (Visual Polish) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          <FeatureCard 
            icon={Shield} 
            title="Secure Access" 
            desc="Role-based authentication ensures data integrity and privacy."
          />
          <FeatureCard 
            icon={Layout} 
            title="Digital Catalog" 
            desc="Real-time searching and filtering of thousands of book records."
          />
          <FeatureCard 
            icon={Zap} 
            title="Fast Operations" 
            desc="Lightning fast issue and return processing for administrators."
          />
        </div>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm relative z-10">
        &copy; 2026 Library Management System.
      </footer>
    </div>
  );
}

// Simple Helper Component for the bottom cards
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-slate-900/60 transition duration-300">
      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-blue-400">
        <Icon size={20} />
      </div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}