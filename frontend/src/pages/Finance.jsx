import DashboardLayout from "../layout/DashboardLayout";

const Finance = () => {
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Finance Overview</h2>
      <div className="bg-white p-6 rounded-xl shadow">
        <p>Income: ₹50,000</p>
        <p>Expenses: ₹38,000</p>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
