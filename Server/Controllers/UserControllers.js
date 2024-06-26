const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const { User } = require("../Models/UserModel.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, level, birthDay, phone, isAdmin } =
    req.body;

  if (
    !(
      name ||
      username ||
      email ||
      password ||
      level ||
      birthDay ||
      phone ||
      isAdmin
    )
  ) {
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
    level,
    birthDay,
    phone,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      level: user.level,
      birthDay: user.birthDay,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user),
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
        level: user.level,
        birthDay: user.birthDay,
        phone: user.phone,
        uploads: user.uploads,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        token: generateToken(user),
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
  const { name, username, level, phone, email } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    if (level) user.level = level;
    if (phone) user.phone = phone;

    user = await user.save();

    return res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;

  try {
    // Step 2: Find the user by their ID (assuming req.user contains the authenticated user's ID)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Step 4: Validate the new password (add your own validation logic)
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }

    user.password = newPassword;

    await user.save();

    // Step 6: Respond to the client
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchUserInfoFromUpload = asyncHandler(async (req, res) => {
  try {
    const { uploadId } = req.params;

    // Find the user associated with the given upload ID
    const user = await User.findOne({ "uploads._id": uploadId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found for the given upload ID" });
    }

    const userInfo = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ user });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  editUserInfo,
  fetchUserInfoFromUpload,
  getUserById,
  changeUserPassword,
};
