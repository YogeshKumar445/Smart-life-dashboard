import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.log(err);
        logout();
      }
    };

    fetchData();
  }, []);

  if (!stats) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Smart Life Dashboard</h1>
        <button onClick={logout} className="bg-white text-indigo-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-black p-6 rounded-xl">
          <h3>Total Tasks</h3>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white text-black p-6 rounded-xl">
          <h3>Completed</h3>
          <p className="text-4xl font-bold">{stats.completed}</p>
        </div>

        <div className="bg-white text-black p-6 rounded-xl">
          <h3>Pending</h3>
          <p className="text-4xl font-bold">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
