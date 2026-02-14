const express = require("express");
const router = express.Router();
const Finance = require("../models/Finance");
const Dashboard = require("../models/Dashboard");
const protect = require("../middleware/authMiddleware");

// ADD finance entry
router.post("/", protect, async (req, res) => {
  const { type, category, amount } = req.body;

  await Finance.create({
    user: req.user._id,
    type,
    category,
    amount,
  });

  // calculate savings
  const summary = await Finance.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  summary.forEach((item) => {
    if (item._id === "Income") income = item.total;
    if (item._id === "Expense") expense = item.total;
  });

  const savings = income - expense;

  await Dashboard.findOneAndUpdate(
    { user: req.user._id },
    { savings }
  );

  res.json({ message: "Finance entry added" });
});

// GET finance summary
router.get("/summary", protect, async (req, res) => {
  const summary = await Finance.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  summary.forEach((item) => {
    if (item._id === "Income") income = item.total;
    if (item._id === "Expense") expense = item.total;
  });

  res.json({ income, expense });
});

module.exports = router;
