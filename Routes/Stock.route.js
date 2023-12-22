const express = require("express");
const router = express.Router();

const StockController = require("../Controllers/Stock.Controlller");
const AuthMiddleware = require("../Middlewares/authMiddleware");

router.get("/", AuthMiddleware.APIauth, StockController.getAllStocks);

router.post("/", AuthMiddleware.APIauth, StockController.createNewStock);

router.get("/:id", AuthMiddleware.APIauth, StockController.findStockById);

router.put("/:id", AuthMiddleware.APIauth, StockController.updateStock);

router.delete("/:id", AuthMiddleware.APIauth, StockController.deleteStock);

module.exports = router;
