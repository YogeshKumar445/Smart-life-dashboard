import DashboardLayout from "../layout/DashboardLayout";

const Health = () => {
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Health Tracker</h2>
      <div className="bg-white p-6 rounded-xl shadow">
        <p>Steps: 7,500</p>
        <p>Calories: 1,800</p>
      </div>
    </DashboardLayout>
  );
};

export default Health;
