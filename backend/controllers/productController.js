import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc ---- Fetch All Products
//@route --- GET /api/products
//@access --- Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc ---- Fetch Single Product
//@route --- GET /api/products/:id
//@access --- Public
const getProductsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductsById };
