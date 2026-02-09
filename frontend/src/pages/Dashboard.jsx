import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!data) return <h2>Loading dashboard...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>{data.message}</p>

      {/* ✅ SAFE ACCESS */}
      {data.user && (
        <p>
          <b>User ID:</b> {data.user.id}
        </p>
      )}

      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
