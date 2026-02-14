import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  addFinance,
  getFinanceSummary,
  getCategorySummary,
} from "../api/api";
import FinanceChart from "../components/FinanceChart";
import FinanceCategoryPie from "../components/FinanceCategoryPie";

const Finance = () => {
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [categoryData, setCategoryData] = useState([]);

  // Fetch both summary + category data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const summaryData = await getFinanceSummary();
        const categorySummary = await getCategorySummary();

        setSummary(summaryData);
        setCategoryData(categorySummary);
      } catch (error) {
        console.error("Finance fetch error:", error);
      }
    };

    fetchAll();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await addFinance({
        type,
        category,
        amount: Number(amount),
      });

      setCategory("");
      setAmount("");

      // Refresh data
      const summaryData = await getFinanceSummary();
      const categorySummary = await getCategorySummary();

      setSummary(summaryData);
      setCategoryData(categorySummary);
    } catch (error) {
      console.error("Add finance error:", error);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Finance Tracker</h2>

      {/* ===== ADD FORM ===== */}
      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
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

      {/* ===== INCOME vs EXPENSE CHART ===== */}
      <FinanceChart
        income={summary.income}
        expense={summary.expense}
      />

      {/* ===== CATEGORY PIE CHART ===== */}
      {categoryData.length > 0 && (
        <FinanceCategoryPie data={categoryData} />
      )}
    </DashboardLayout>
  );
};

export default Finance;
