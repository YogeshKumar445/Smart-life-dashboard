require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();          // ✅ pehle app banao

// ✅ CORS after app initialization
app.use(cors({
  origin: "http://localhost:5173"
}));

connectDB();

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Smart Life Dashboard Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
