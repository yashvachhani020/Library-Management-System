import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (data) {
      setProfile({
        name: data.name,
        email: data.email,
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ ...profile, role: "user" })
    );
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header
        title="User Profile"
        subtitle="Manage your account"
        rightAction={
          <button
            onClick={() => navigate("/user-dashboard")}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
          >
            Back
          </button>
        }
      />

      <main className="p-8 max-w-3xl mx-auto w-full">
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 space-y-6">

          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black border border-white/20"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={profile.email}
              disabled
              className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 text-gray-400"
            />
          </div>

          <button
            onClick={saveProfile}
            className="bg-emerald-600 hover:bg-emerald-700 transition px-6 py-3 rounded-xl font-semibold"
          >
            Save Changes
          </button>

        </div>
      </main>
    </div>
  );
}

export default UserProfile;
