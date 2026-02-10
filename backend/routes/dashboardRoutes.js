const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", authMiddleware, (req, res) => {
  res.json({
    total: 12,
    completed: 7,
    pending: 5,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;
