const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
const CORS_URL = process.env.CORS_URL || "*";
const NODE_ENV = process.env.NODE_ENV || "local";

// DB config
const DB_NAME = process.env.DB_NAME || "lifestyle-ecomm";
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGO_PASS = process.env.MONGO_PASSWORD || "password";

const MONGODB_URI =
  process.env.MONGODB_URI ??
  `mongodb://${process.env.MONGO_USER}:${MONGO_PASS}@localhost:${MONGODB_PORT}`;

// Redis Config

// keys

// Secrets

module.exports = {
  PORT,
  CORS_URL,
  NODE_ENV,
  DB_NAME,
  MONGODB_URI,
};
