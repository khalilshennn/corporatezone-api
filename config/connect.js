const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL);
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.hty68.mongodb.net/corporatezone`);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { connectDB };
