import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MiniFinanceChart = ({ income, expense }) => {
  const data = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold mb-4">Finance Overview</h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="amount" fill="#10B981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniFinanceChart;
