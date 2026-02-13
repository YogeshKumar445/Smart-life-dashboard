import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/api";
import DashboardLayout from "../layout/DashboardLayout";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <p className="text-xl">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold">Health Score</h3>
          <p className="text-3xl text-indigo-600 mt-4">
            {stats.health}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold">Savings</h3>
          <p className="text-3xl text-green-600 mt-4">
            ₹{stats.savings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold">Tasks Done</h3>
          <p className="text-3xl text-purple-600 mt-4">
            {stats.tasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold">Study Hours</h3>
          <p className="text-3xl text-blue-600 mt-4">
            {stats.studyHours}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
