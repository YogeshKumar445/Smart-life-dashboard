import DashboardLayout from "../layout/DashboardLayout";

const Tasks = () => {
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Task Manager</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <ul className="space-y-3">
          <li className="p-3 bg-gray-100 rounded-lg">
            ✅ Complete React Project
          </li>
          <li className="p-3 bg-gray-100 rounded-lg">
            📖 Study 2 Hours
          </li>
          <li className="p-3 bg-gray-100 rounded-lg">
            🏃 Workout 30 Minutes
          </li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
