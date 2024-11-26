const mongoose = require("mongoose");
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, );
      console.log("db connected successfully");
    } catch (err) {
      console.error("db connection error:", err.message);
      process.exit(1); 
    }
  };

  module.exports = connectDB