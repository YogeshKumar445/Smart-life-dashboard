const express = require("express");
const router = express.Router();
const Health = require("../models/Health");
const Dashboard = require("../models/Dashboard");
const protect = require("../middleware/authMiddleware");

// ADD health entry
router.post("/", protect, async (req, res) => {
  const { steps, calories, sleep } = req.body;

  await Health.create({
    user: req.user._id,
    steps,
    calories,
    sleep,
  });

  // calculate health score (latest entry)
  const latest = await Health.findOne({ user: req.user._id }).sort({ createdAt: -1 });

  const stepScore = Math.min((latest.steps / 10000) * 40, 40);
  const calorieScore = Math.min((latest.calories / 500) * 30, 30);
  const sleepScore = Math.min((latest.sleep / 8) * 30, 30);

  const totalScore = Math.round(stepScore + calorieScore + sleepScore);

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { health: totalScore }
  );

  res.json({ message: "Health data added" });
});

// GET weekly health trend
router.get("/weekly", protect, async (req, res) => {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 6);

  const data = await Health.aggregate([
    {
      $match: {
        user: req.user._id,
        date: { $gte: last7Days },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        avgSteps: { $avg: "$steps" },
      },
    },
  ]);

  const daysMap = {
    1: "Sun",
    2: "Mon",
    3: "Tue",
    4: "Wed",
    5: "Thu",
    6: "Fri",
    7: "Sat",
  };

  const formatted = Object.keys(daysMap).map((dayNum) => {
    const found = data.find((d) => d._id === parseInt(dayNum));
    return {
      day: daysMap[dayNum],
      steps: found ? Math.round(found.avgSteps) : 0,
    };
  });

  res.json(formatted);
});

module.exports = router;
