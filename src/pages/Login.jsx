import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, ArrowRight, Key } from "lucide-react"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // RESTORED: Role state
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 1) return setError("Please enter your password.");
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // SECURITY CHECK: Ensure the database role matches the selected toggle
        if (data.user.role !== role) {
          setError(`Access Denied: Your account is not registered as an ${role === 'admin' ? 'Administrator' : 'User'}.`);
          return;
        }

        login(data.user); 
        navigate(data.user.role === "admin" ? "/admin" : "/user");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server. Is Backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">LMS Login</h2>
          <p className="text-slate-400">Select your role and sign in</p>
        </div>

        {/* RESTORED: Role Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl mb-6 border border-slate-800">
          {["user", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all ${
                role === r 
                ? "bg-slate-800 text-white shadow-sm border border-slate-700" 
                : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center animate-fade-in">
            {error}
          </div>
        )}

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

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-blue-400 hover:text-blue-300 font-bold transition">
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}