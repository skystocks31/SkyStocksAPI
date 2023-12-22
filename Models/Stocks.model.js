const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    stopLoss: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    strategy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("stock", StockSchema);
module.exports = Stock;
