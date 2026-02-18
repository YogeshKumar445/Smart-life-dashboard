import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { addHealth, getHealthWeekly } from "../api/api";
import HealthLineChart from "../components/HealthLineChart";

const Health = () => {
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [sleep, setSleep] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHealthWeekly();
      setWeeklyData(data);
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await addHealth({
      steps: Number(steps),
      calories: Number(calories),
      sleep: Number(sleep),
    });

    setSteps("");
    setCalories("");
    setSleep("");

    const data = await getHealthWeekly();
    setWeeklyData(data);
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Health Tracker</h2>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="Sleep Hours"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="p-3 border rounded-lg"
          required
        />

        <button className="bg-green-600 text-white rounded-lg hover:scale-105 transition">
          Add
        </button>
      </form>

      {weeklyData.length > 0 && (
        <HealthLineChart data={weeklyData} />
      )}
    </DashboardLayout>
  );
};

export default Health;
