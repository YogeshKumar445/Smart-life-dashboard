import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { addFinance, getFinanceSummary } from "../api/api";
import FinanceChart from "../components/FinanceChart";

const Finance = () => {
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  
useEffect(() => {
  const fetchSummary = async () => {
    const data = await getFinanceSummary();
    setSummary(data);
  };

  fetchSummary();
}, []);


  const handleAdd = async (e) => {
    e.preventDefault();

    await addFinance({
      type,
      category,
      amount: Number(amount),
    });

    setCategory("");
    setAmount("");
    fetchSummary();
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Finance Tracker</h2>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />

        <button className="bg-green-600 text-white rounded-lg hover:scale-105 transition">
          Add
        </button>
      </form>

      <FinanceChart income={summary.income} expense={summary.expense} />
    </DashboardLayout>
  );
};

export default Finance;
