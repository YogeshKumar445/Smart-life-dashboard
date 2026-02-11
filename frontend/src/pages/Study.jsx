import DashboardLayout from "../layout/DashboardLayout";

const Study = () => {
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Study Tracker</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <p className="mb-2">📚 Subjects Completed: 5</p>
        <p className="mb-2">⏳ Hours Studied Today: 3</p>
        <p>🎯 Weekly Goal: 20 Hours</p>
      </div>
    </DashboardLayout>
  );
};

export default Study;
