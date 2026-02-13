const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard");
const protect = require("../middleware/authMiddleware");

// GET Dashboard Stats
router.get("/stats", protect, async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ user: req.user._id });

    if (!dashboard) {
      dashboard = await Dashboard.create({
        user: req.user._id,
      });
    }

    res.json(dashboard);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// GET weekly study data
router.get("/study-weekly", protect, async (req, res) => {
  // Example dummy weekly data (later we can make dynamic)
  const weeklyData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 3 },
  ];

  res.json(weeklyData);
});


module.exports = router;
