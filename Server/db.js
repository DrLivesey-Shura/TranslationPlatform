const mongoose = require("mongoose");
const colors = require("colors");

// Mongo DB Connections
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then((response) => {
      console.log("MongoDB Connection Succeeded.".cyan.underline);
    })
    .catch((error) => {
      console.log("Error in DB connection: ");
    });
};

module.exports = connectDB;
