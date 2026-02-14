const express = require("express");
const router = express.Router();
const Study = require("../models/Study");
const Dashboard = require("../models/Dashboard");
const protect = require("../middleware/authMiddleware");

// ADD study hours
router.post("/", protect, async (req, res) => {
  const { hours } = req.body;

  await Study.create({
    user: req.user._id,
    hours,
  });

  // update total study hours in dashboard
  const total = await Study.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: null, totalHours: { $sum: "$hours" } } },
  ]);

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { studyHours: total[0]?.totalHours || 0 }
  );

  res.json({ message: "Study hours added" });
});

// GET weekly study data
router.get("/weekly", protect, async (req, res) => {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 6);

  const data = await Study.aggregate([
    {
      $match: {
        user: req.user._id,
        date: { $gte: last7Days },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        totalHours: { $sum: "$hours" },
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
      hours: found ? found.totalHours : 0,
    };
  });

  res.json(formatted);
});

module.exports = router;
