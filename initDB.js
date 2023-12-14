const { default: mongoose } = require("mongoose");
const dotEnv = require("dotenv").config();

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      writeConcern: { w: 'majority' },
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
