import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

const importData = async () => {
  dotenv.config();
  connectDB();

  try {
    console.log("Deleting All Data".green.inverse);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Deleted All Data".green.inverse);

    const insertedUsers = await User.insertMany(users);

    const adminUserId = insertedUsers[0]._id;

    const addedUserProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    await Product.insertMany(addedUserProducts);

    console.log("Data inserted Successfully".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  dotenv.config();
  connectDB();

  try {
    console.log("Deleting All Data".green.inverse);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Deleted All Data".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
