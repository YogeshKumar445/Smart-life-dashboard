require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();
connectDB();

app.use(express.json());

// 🔥 INLINE REQUIRE (IMPORTANT)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Smart Life Dashboard Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
