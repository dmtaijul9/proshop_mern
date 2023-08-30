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

export { authUser, getUserProfile, registerUser };