import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getDashboardStats, getTaskStats } from "../api/api";
import TaskPieChart from "../components/TaskPieChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [taskStats, setTaskStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardStats();
        const taskData = await getTaskStats();

        setStats(dashboardData);
        setTaskStats(taskData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Health */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
          <h3 className="text-gray-500 font-semibold">Health Score</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-3">
            {stats.health}
          </p>
        </div>

        {/* Savings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
          <h3 className="text-gray-500 font-semibold">Savings</h3>
          <p className="text-3xl font-bold text-green-600 mt-3">
            ₹{stats.savings}
          </p>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
          <h3 className="text-gray-500 font-semibold">Tasks Completed</h3>
          <p className="text-3xl font-bold text-purple-600 mt-3">
            {stats.tasks}
          </p>
        </div>

        {/* Study Hours */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
          <h3 className="text-gray-500 font-semibold">Study Hours</h3>
          <p className="text-3xl font-bold text-blue-600 mt-3">
            {stats.studyHours}
          </p>
        </div>
      </div>

      {/* ===== CHART SECTION ===== */}
      {taskStats && (
        <div className="mt-10">
          <TaskPieChart
            completed={taskStats.completed}
            pending={taskStats.pending}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
