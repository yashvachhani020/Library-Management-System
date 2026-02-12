import { LogOut, User, BookOpen, Globe, Cpu, BookMarked, History, Sparkles } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const isPanelAdmin = location.pathname.startsWith('/admin');
  const basePath = isPanelAdmin ? '/admin' : '/user';

  const categories = [
    { name: "Trending", id: "trending", icon: Sparkles },
    { name: "Technology", id: "Tech", icon: Cpu },
    { name: "Sci-Fi", id: "Sci-Fi", icon: Globe },
    { name: "History", id: "History", icon: History },
    { name: "General", id: "General", icon: BookMarked },
  ];

  const isActive = (catId) => {
    const params = new URLSearchParams(location.search);
    const currentCat = params.get("cat") || "trending";
    // Check if the parameter matches the category ID
    return currentCat === catId;
  };

  return (
    <aside className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      
      {/* Brand Header - FIXED: Shows User Dashboard correctly */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <BookOpen size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-white leading-tight">
            {isPanelAdmin ? "Admin Panel" : "User Dashboard"}
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        
        {/* Discover Section */}
        <div>
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Discover
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`${basePath}?cat=${cat.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(cat.id)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <cat.icon size={18} className={isActive(cat.id) ? "text-white" : "text-slate-500 group-hover:text-white"} />
                <span className="font-medium text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div>
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Account
          </p>
          <button
            onClick={() => navigate("/profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === "/profile"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <User size={18} />
            <span className="font-medium text-sm">My Profile</span>
          </button>
        </div>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}