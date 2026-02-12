import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, 
  Camera, Save, Bell, Lock, BookOpen, Clock 
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  
  // Mock state for form fields
  const [formData, setFormData] = useState({
    name: user?.name || "System Administrator",
    email: user?.email || "admin@lms.com",
    phone: "+91 98765 43210",
    location: "Gujarat, India",
    bio: "Senior Librarian managing the central repository.",
    role: "Administrator"
  });

  return (
    <Layout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        
        {/* --- HEADER BANNER --- */}
        <div className="relative mb-20">
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-lg relative overflow-hidden">
             {/* Decorative Circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Profile Picture Card */}
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-slate-900 border-4 border-slate-950 flex items-center justify-center text-4xl font-bold text-blue-500 overflow-hidden shadow-2xl">
                {/* Fallback Initials or Image */}
                <div className="bg-slate-800 w-full h-full flex items-center justify-center">
                   {formData.name.substring(0,2).toUpperCase()}
                </div>
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition shadow-lg border border-slate-900">
                <Camera size={14} />
              </button>
            </div>
            
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-white">{formData.name}</h1>
              <div className="flex items-center gap-3 text-slate-400 text-sm mt-1">
                <span className="flex items-center gap-1"><Shield size={14} className="text-emerald-400" /> {user?.role || "Admin"} Account</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="flex items-center gap-1"><MapPin size={14} /> {formData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Sidebar Info */}
          <div className="space-y-6">
            
            {/* Quick Stats Card */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Activity Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">124</div>
                  <div className="text-xs text-slate-500">Books Issued</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-center">
                  <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-xs text-slate-500">Pending Return</div>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Details</h3>
               
               <div className="flex items-center gap-4 text-slate-300">
                 <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                   <Mail size={18} />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500">Email Address</div>
                   <div className="font-medium">{formData.email}</div>
                 </div>
               </div>

               <div className="flex items-center gap-4 text-slate-300">
                 <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                   <Phone size={18} />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500">Phone Number</div>
                   <div className="font-medium">{formData.phone}</div>
                 </div>
               </div>

               <div className="flex items-center gap-4 text-slate-300">
                 <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                   <Calendar size={18} />
                 </div>
                 <div>
                   <div className="text-xs text-slate-500">Joined Date</div>
                   <div className="font-medium">March 14, 2024</div>
                 </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Edit Profile Section */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User size={20} className="text-blue-500" /> Edit Profile
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition flex items-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Role / Job Title</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 opacity-60 cursor-not-allowed"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Bio / About</label>
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Notification Settings */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Bell size={18} className="text-amber-500" /> Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-sm text-slate-300">Email Alerts</span>
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-sm text-slate-300">SMS Notifications</span>
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-rose-500" /> Security
                </h3>
                <div className="space-y-4">
                  <button className="w-full py-3 bg-slate-950 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition text-left px-4 flex justify-between items-center group">
                    Change Password
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded group-hover:bg-slate-700">Update</span>
                  </button>
                  <button className="w-full py-3 bg-slate-950 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition text-left px-4 flex justify-between items-center group">
                    Two-Factor Auth
                    <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded">Enabled</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}