import React from "react";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Dummy data (baad me API se aa jayega)
  const stats = [
    { title: "Total Tasks", value: 12, color: "bg-blue-500" },
    { title: "Completed", value: 7, color: "bg-green-500" },
    { title: "Pending", value: 5, color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Smart Life Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Welcome */}
        <h2 className="text-2xl font-semibold mb-1">
          Welcome back 👋
        </h2>
        <p className="text-gray-600 mb-6">
          Here is your smart life overview
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white p-6 rounded-xl shadow-lg`}
            >
              <p className="text-lg">{item.title}</p>
              <h3 className="text-4xl font-bold mt-2">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
