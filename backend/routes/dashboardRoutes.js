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

module.exports = router;
