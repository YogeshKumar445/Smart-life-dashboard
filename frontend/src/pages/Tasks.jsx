import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "../api/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await createTask({ title });
    setTitle("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTask(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Task Manager</h2>

      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input
          className="flex-1 p-3 rounded-lg border"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="bg-indigo-600 text-white px-6 rounded-lg hover:scale-105 transition">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 rounded-xl shadow flex justify-between items-center transition-all ${
              task.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <div>
              <p
                className={`font-semibold ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleToggle(task._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                ✓
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
