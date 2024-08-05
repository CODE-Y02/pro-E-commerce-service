const mongoose = require("mongoose");

const { DB_NAME, MONGODB_URI } = require("../config");

const connectDB = async () => {
  try {
    console.log(MONGODB_URI);

    const connectionInstance = await mongoose.connect(
      // `mongodb://root:password@localhost:27017`
      MONGODB_URI
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
