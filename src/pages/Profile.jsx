import Layout from "../components/Layout"; // <--- USES LAYOUT, NOT HEADER
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-slate-400 mb-8">Manage your personal profile and security.</p>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 relative z-10">
            <div className="relative">
              <img 
                src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                alt="Profile" 
                className="w-28 h-28 rounded-full border-4 border-slate-800 shadow-xl" 
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
            </div>
            
            <div className="text-center sm:text-left mt-2">
              <h2 className="text-3xl font-bold text-white">{user?.name || "Guest User"}</h2>
              <p className="text-slate-400 font-medium mb-3">{user?.email || "No email"}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                <Shield size={12} /> {user?.role || "Guest"} Access
              </div>
            </div>
          </div>

          <div className="grid gap-6 max-w-2xl relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                <User size={14} /> Display Name
              </label>
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 font-medium">
                {user?.name}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 font-medium">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}