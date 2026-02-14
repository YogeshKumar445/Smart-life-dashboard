import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FinanceChart = ({ income, expense }) => {
  const data = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h3 className="text-xl font-bold mb-4">Income vs Expense</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
