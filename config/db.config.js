const { mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const chalk = require("chalk");

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;

const connectDB = async () => {
  mongoose
    .connect(db.url)
    .then(() => {
      console.log(chalk.bgGreen("Successfully connected to DB."));
    })
    .catch((err) => {
      console.log(chalk.bgRed("DB Connection error", err));

      process.exit();
    });
};

db.connectDB = connectDB;

module.exports = db;
