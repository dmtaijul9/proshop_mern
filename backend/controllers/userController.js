import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//@desc ---- Register a new user
//@route ---  POST /api/users
//@access --- Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User alread exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc ---- Auth User & get token
//@route ---  POST /api/users/login
//@access --- Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  if (user && isPasswordMatched) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc ---- Auth User profile
//@route ---  GET /api/users/profile
//@access --- Privet
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc ---- Update user profile
//@route ---  PUT /api/users/profile
//@access --- Privet
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = generateToken(updatedUser._id);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc ---- Get all users
//@route ---  PUT /api/users
//@access --- Privet/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

//@desc ---- Delete a user
//@route ---  DELETE /api/users/:id
//@access --- Privet/Admin
const deleteUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("Users not found");
  }
  await User.findByIdAndDelete(req.params.id);
  res.json("Users deleted successfully");
});

//@desc ---- Get user by id
//@route ---  GET /api/users/:id
//@access --- Privet/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("Users not found");
  }
  res.json(user);
});

//@desc ---- Update user
//@route ---  PUT /api/users/:id
//@access --- Privet/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUserController,
  getUserById,
  updateUser,
};
