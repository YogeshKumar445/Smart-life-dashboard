import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#4F46E5",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
];

const FinanceCategoryPie = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h3 className="text-xl font-bold mb-4">Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceCategoryPie;
