const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const User = require("../Models/UserModel.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, pic } = req.body;

  if (!(name || username || email || password)) {
    res.status(400);
    throw new Error("Please Enter All The Fields!");
  }
  const userExistsByUsername = await User.findOne({ username });
  const userExistsByEmail = await User.findOne({ email });

  if (userExistsByUsername) {
    res.status(409);
    throw new Error(`User with username '${username}' already exists`);
  }

  if (userExistsByEmail) {
    res.status(408);
    throw new Error(`User with email '${email}' already exists`);
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create a User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (user) {
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (passwordIsCorrect) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid User Email");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

const editUserInfo = async (req, res) => {
  const { name, email, pic } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (pic) user.pic = pic;

    user = await user.save();

    return res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, editUserInfo };
