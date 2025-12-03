const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // Get token from cookies, body, or headers
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please log in again.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
