const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Header se token nikalo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user id request me attach
    req.user = decoded;

    next(); // ✅ allow access
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
