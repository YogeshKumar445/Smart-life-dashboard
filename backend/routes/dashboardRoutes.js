const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({
    total: 12,
    completed: 7,
    pending: 5,
    user: req.user
  });
});

module.exports = router;
