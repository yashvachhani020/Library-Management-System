function DashboardCard({ title, value, description, accent = "blue" }) {
  const accentMap = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/10 shadow-md hover:shadow-xl transition">
      <h3 className={`text-lg font-semibold mb-1 ${accentMap[accent]}`}>
        {title}
      </h3>
      <p className="text-2xl font-bold mb-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default DashboardCard;
