import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">

      {/* Header */}
      <header className="py-6 text-center border-b border-white/10">
        <h1 className="text-3xl font-bold text-blue-400">
          Library Management System
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Digital Knowledge • Smart Library
        </p>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              A <span className="text-blue-500">Smart</span><br />
              Library<br />
              Experience
            </h2>

            <p className="text-gray-400 mb-8 max-w-lg">
              Manage books, members, issuing, and returning using a modern
              digital library management system.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  navigate("/login", { state: { role: "admin" } })
                }
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Admin Login
              </button>

              <button
                onClick={() =>
                  navigate("/login", { state: { role: "user" } })
                }
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                User Login
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="bg-slate-900/70 rounded-2xl p-4 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="Books"
              className="rounded-xl w-full"
            />
            <p className="text-center text-gray-400 text-sm mt-3">
              Knowledge is power. Libraries empower minds.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
