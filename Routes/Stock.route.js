const express = require("express");
const router = express.Router();

const StockController = require("../Controllers/Stock.Controlller");

router.get("/", StockController.getAllStocks);

router.post("/", StockController.createNewStock);

router.get("/:id", StockController.findStockById);

router.patch("/:id", StockController.updateStock);

router.delete("/:id", StockController.deleteStock);

module.exports = router;
