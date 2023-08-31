import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc ---- Create New Order
//@route --- POST /api/orders
//@access --- Privet
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error("No Order Items");
  } else {
    const createdOrder = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.json(createdOrder);
  }
});

//@desc ---- Get Order By Id
//@route --- GET /api/orders/:id
//@access --- Privet
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  res.json(order);
});

export { addOrderItems, getOrderById };
