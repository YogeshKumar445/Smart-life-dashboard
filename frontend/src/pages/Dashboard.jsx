import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Navbar */}
      <div className="bg-white/90 backdrop-blur shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Smart Life Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-8 text-white">
          <h2 className="text-3xl font-semibold mb-1">
            Welcome back 👋
          </h2>
          <p className="text-white/80">
            Here is your smart life overview
          </p>
        </div>

        {/* States */}
        {loading && (
          <p className="text-white text-lg">Loading dashboard...</p>
        )}

        {error && (
          <p className="text-red-200 text-lg">{error}</p>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-500">Total Tasks</p>
              <h3 className="text-4xl font-bold text-indigo-600 mt-2">
                {stats.total}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-500">Completed</p>
              <h3 className="text-4xl font-bold text-green-600 mt-2">
                {stats.completed}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-500">Pending</p>
              <h3 className="text-4xl font-bold text-yellow-500 mt-2">
                {stats.pending}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
