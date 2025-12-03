const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" }); // Adjust the path if your .env is not in the same folder

const { MONGODB_URL } = process.env;

console.log("MongoDB URL:", MONGODB_URL);

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("✅ DB Connection Success");
    })
    .catch((err) => {
      console.log("❌ DB Connection Failed");
      console.error(err);
      process.exit(1);
    });
};
