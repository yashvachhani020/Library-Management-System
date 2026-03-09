import React from 'react';

export default function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-500/20",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/20",
    amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20",
    rose: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-200 dark:border-rose-500/20",
  };

  const activeColor = colors[color] || colors.blue;

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition duration-300 group shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 transition-colors">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl border ${activeColor} group-hover:scale-110 transition-all duration-300`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}