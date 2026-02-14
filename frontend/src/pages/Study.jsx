import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { addStudyHours, getStudyWeekly } from "../api/api";
import StudyBarChart from "../components/StudyBarChart";

const Study = () => {
  const [hours, setHours] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    const data = await getStudyWeekly();
    setWeeklyData(data);
  };

  fetchData();
}, []);


  const handleAdd = async (e) => {
    e.preventDefault();
    await addStudyHours(Number(hours));
    setHours("");
    fetchData();
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Study Tracker</h2>

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

      {weeklyData && <StudyBarChart data={weeklyData} />}
    </DashboardLayout>
  );
};

export default Study;
