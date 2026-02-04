import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, ArrowRight, Key } from "lucide-react"; // REMOVED 'Lock'

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return alert("Please enter a valid email address.");
    if (password.length < 4) return alert("Password must be at least 4 characters.");
    
    login(email, role);
    navigate(role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">LMS Login</h2>
          <p className="text-slate-400">Select your role and sign in</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl mb-6 border border-slate-800">
          {["user", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all ${
                role === r 
                ? "bg-slate-800 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-4">
            Sign In <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}