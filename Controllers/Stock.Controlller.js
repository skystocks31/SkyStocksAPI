const CreateError = require("http-errors");
const mongoose = require("mongoose");

const Stock = require("../Models/Stocks.model");

module.exports = {
  getAllStocks: async (req, res, next) => {
    // * .find(query, projection)
    try {
      const results = await Stock.find({}, { __v: 0 }); //  To omit certain field
      //const results = await Stock.find({}, { name: 1, _id: 0 });  To get particular field
      //const results = await Stock.find({ price: 41 }, { __v: 0 }); Pass Query
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewStock: async (req, res, next) => {
    console.log(req.body);
    // ! Using async-await
    // ! Cleaner than Promises
    try {
      const stock = new Stock(req.body);
      stock.date = new Date();
      const result = await stock.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name == "ValidationError") {
        next(CreateError(422, error.message));
        return;
      }
    }

    // ! Using Promise
    // const stock = new Stock({
    //   name: req.body.name,
    //   price: req.body.price,
    // });
    // stock
    //   .save()
    //   .then((result) => {
    //     console.log(result);
    //     res.send(result);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  },

  findStockById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Stock.findById(id);
      // const results = await Stock.findOne({ _id: id });
      if (!result) {
        throw CreateError(404, "Product doesn't exists");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(CreateError(400, "Invalid product Id"));
        return;
      }
      next(error);
    }
  },

  updateStock: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await Stock.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw CreateError(404, "Product doesn't exists");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(CreateError(400, "Invalid product Id"));
        return;
      }
      next(error);
    }
  },

  deleteStock: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Stock.findByIdAndDelete(id);
      if (!result) {
        throw CreateError(404, "Product doesn't exists");
      }
      res.send(result);
    } catch (error) {
      //console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(CreateError(400, "Invalid product Id"));
        return;
      }
      next(error);
    }
  },
};
