const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Dashboard = require("../models/Dashboard");
const protect = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE task
router.post("/", protect, async (req, res) => {
  const { title, priority, deadline } = req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    priority,
    deadline,
  });

  // update dashboard task count
  const completedCount = await Task.countDocuments({
    user: req.user._id,
    completed: true,
  });

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { tasks: completedCount }
  );

  res.json(task);
});

// TOGGLE complete
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = !task.completed;
  await task.save();

  const completedCount = await Task.countDocuments({
    user: req.user._id,
    completed: true,
  });

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { tasks: completedCount }
  );

  res.json(task);
});

// DELETE task
router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  const completedCount = await Task.countDocuments({
    user: req.user._id,
    completed: true,
  });

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { tasks: completedCount }
  );

  res.json({ message: "Task deleted" });
});

// GET task stats
router.get("/stats", protect, async (req, res) => {
  const completed = await Task.countDocuments({
    user: req.user._id,
    completed: true,
  });

  const pending = await Task.countDocuments({
    user: req.user._id,
    completed: false,
  });

  res.json({ completed, pending });
});


module.exports = router;
