import { useTheme } from "../context/ThemeContext";

function Header({ title, subtitle, rightAction }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-8 py-5 border-b border-white/10 bg-black/40 backdrop-blur">

      <div>
        <h1 className="text-2xl font-bold text-blue-400">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          title="Toggle Theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {rightAction}
      </div>
    </header>
  );
}

export default Header;
