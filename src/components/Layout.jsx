import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Sun, Moon } from "lucide-react";

export default function Layout({ children }) {
  // Check memory for theme, default to dark
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  // Apply dark mode and save choice to memory
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* --- THE THEME TOGGLE TOP BAR --- */}
        {/* If you can't see this bar on your screen, the file hasn't saved or compiled! */}
        <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-end px-8 shrink-0 bg-white dark:bg-slate-900 transition-colors duration-300 z-10">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </div>
        
      </main>
    </div>
  );
}