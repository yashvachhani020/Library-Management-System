import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AdminProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Library Administrator",
    email: "admin@library.com",
    role: "System Admin",
    lastLogin: "29 Jan 2026",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Admin profile updated successfully (frontend demo)");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header
        title="Admin Profile"
        subtitle="Administrator account settings"
        rightAction={
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        }
      />

      <main className="p-8 max-w-3xl mx-auto w-full">
        <div className="bg-slate-900/80 rounded-2xl p-8 border border-white/10 space-y-6">

          <h2 className="text-2xl font-bold text-blue-400">
            Edit Admin Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-400">Admin Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Role</label>
              <input
                value={profile.role}
                disabled
                className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Last Login</label>
              <input
                value={profile.lastLogin}
                disabled
                className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminProfile;
