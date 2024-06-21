const jwt = require("jsonwebtoken");
const Admins = require("../models/adminModel");

const checkIfAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, "WeddingPlannerSecretKey");

    const admin = await Admins.findById(decoded.userID);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(400).json({ message: "Invalid token." });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { checkIfAdmin };
