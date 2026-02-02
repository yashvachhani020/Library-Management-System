import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const role = useLocation().state?.role;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Allowed email domains (professional touch)
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "college.edu",
  ];

  const isValidEmail = (email) => {
    const domain = email.split("@")[1];
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      allowedDomains.includes(domain)
    );
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setError(
        "Please use a valid email (Gmail, Yahoo, Outlook, or College ID)"
      );
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // Save profile info (frontend simulation)
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        email,
        role,
        name: role === "admin" ? "Library Admin" : "Library User",
      })
    );

    role === "admin"
      ? navigate("/admin-dashboard")
      : navigate("/user-dashboard");
  };

  const handleGoogleLogin = () => {
    // Simulated Google login
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        email: "googleuser@gmail.com",
        role,
        name: "Google User",
        provider: "google",
      })
    );

    role === "admin"
      ? navigate("/admin-dashboard")
      : navigate("/user-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <div className="bg-slate-900/80 p-8 rounded-2xl w-full max-w-md border border-white/10">

        <h2 className="text-2xl font-bold text-center mb-6">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* Email Login */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 rounded-lg bg-black border border-white/20 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-5 rounded-lg bg-black border border-white/20 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold mb-4"
        >
          Login with Email
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black hover:bg-gray-200 transition py-3 rounded-xl font-semibold"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}

export default Login;
