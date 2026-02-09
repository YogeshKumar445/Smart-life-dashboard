import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchDashboard();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!data) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold text-indigo-600">
          Smart Life Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </nav>
      <h1 className="text-3xl font-bold text-blue-600">
  Tailwind Working ✅
</h1>


      <div className="p-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Welcome 👋</h2>

          {/* ✅ SAFE ACCESS */}
          {data.user && (
            <p>
              <b>User ID:</b> {data.user.id}
            </p>
          )}
        </div>
      </div>
    </div>
   


  );
}

export default Dashboard;
