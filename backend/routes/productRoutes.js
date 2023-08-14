const express = require("express");
const products = require("../data/products");
const router = express.Router();
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//@desc ---- Fetch All Products
//@route --- GET /api/products
//@access --- Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//@desc ---- Fetch Single Product
//@route --- GET /api/products/:id
//@access --- Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
