const express = require("express");
const CreateError = require("http-errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require("./initDB")();

// Initialize Route
const StockRoute = require("./Routes/Stock.route");
app.use("/stocks", StockRoute);

// For unknown routes
app.use((req, res, next) => {
  next(CreateError(404, "Not Found"));
});

// handling all HTTP Errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + ".....");
  console.assert();
});
