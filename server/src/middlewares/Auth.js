const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to validate API key
const API_KEY = "your-secret-api-key"; // Store this securely

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware to validate JWT token
const JWT_SECRET = "your-jwt-secret"; // Store this securely
const jwtMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Token will be like 'Bearer + token'

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = decoded;
      next();
    });
  } else {
    req.user = null; // No token means no user
    next();
  }
};

/**
 * @description Checks for User after Jwt Authentication
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {any} next
 */
const checkUser = async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { jwt: jwtMiddleware, apiKey: apiKeyMiddleware, checkUser };
