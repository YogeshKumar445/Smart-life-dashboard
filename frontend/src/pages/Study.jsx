import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  addStudyHours,
  getStudyWeekly,
  getStudyTotal,
} from "../api/api";
import StudyLineChart from "../components/StudyLineChart";

const Study = () => {
  const [hours, setHours] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const weekly = await getStudyWeekly();
      const total = await getStudyTotal();

      setWeeklyData(weekly);
      setTotalHours(total.total);
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await addStudyHours(Number(hours));
    setHours("");

    const weekly = await getStudyWeekly();
    const total = await getStudyTotal();

    setWeeklyData(weekly);
    setTotalHours(total.total);
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Study Tracker</h2>

      {/* TOTAL HOURS CARD */}
      <div className="bg-indigo-100 p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-indigo-700">
          Total Study Hours
        </h3>
        <p className="text-4xl font-bold text-indigo-900 mt-2">
          {totalHours} hrs
        </p>
      </div>

      {/* ADD FORM */}
      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input
          type="number"
          placeholder="Enter hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />
        <button className="bg-blue-600 text-white px-6 rounded-lg hover:scale-105 transition">
          Add
        </button>
      </form>

      {/* LINE CHART */}
      {weeklyData.length > 0 && (
        <StudyLineChart data={weeklyData} />
      )}
    </DashboardLayout>
  );
};

export default Study;
