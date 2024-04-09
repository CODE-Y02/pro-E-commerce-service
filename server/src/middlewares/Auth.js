const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function for API key authentication
const authenticateWithAPIKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== "your_api_key") {
    return res.status(401).json({ message: "API key is required and invalid" });
  }

  next();
};

// Middleware function for JWT authentication
const authenticateWithJWT = async (req) => {
  const token = req.headers.authorization || "";

  try {
    if (!token) {
      // If no token is provided, return an empty context
      return {};
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Fetch user data based on the user ID
    const user = await User.findById(userId); // Implement this function to fetch user data from database

    // Attach user information to the context
    return { user };
  } catch (error) {
    // If token verification fails or user is not found, return an empty context
    return {};
  }
};

module.exports = { authenticateWithJWT, authenticateWithAPIKey };
