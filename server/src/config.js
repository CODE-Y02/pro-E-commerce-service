const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
const CORS_URL = process.env.CORS_URL || "*";
const NODE_ENV = process.env.NODE_ENV || "local";

// DB config
const DB_NAME = process.env.DB_NAME || "";

// Redis Config

// keys

// Secrets

module.exports = {
  PORT,
  CORS_URL,
  NODE_ENV,
  DB_NAME,
};
