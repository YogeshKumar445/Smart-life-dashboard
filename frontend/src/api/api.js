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
// ================= TASKS =================
export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  return res.json();
};

export const toggleTask = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// ================= TASK STATS =================
export const getTaskStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/tasks/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// ================= STUDY WEEKLY =================
export const getStudyWeekly = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/dashboard/study-weekly", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};


