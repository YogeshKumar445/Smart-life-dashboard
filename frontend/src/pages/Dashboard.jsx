import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data.message))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>
      <p>{data}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
