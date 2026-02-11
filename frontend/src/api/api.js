const API_URL = "http://localhost:5000/api";

// ================= LOGIN =================
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// ================= REGISTER =================
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  return res.json();
};

// ================= DASHBOARD STATS =================
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
