const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  editUserInfo,
  fetchUserInfoFromUpload,
  getUserById,
  changeUserPassword,
} = require("../Controllers/UserControllers");
const { protect } = require("../Middleware/authMiddleware");
const { isAuth, isAdmin } = require("../utils/utils");

const routes = new Router();

// Add routes
routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/", isAuth, isAdmin, getAllUsers);
routes.get("/:id", isAuth, getUserById);
routes.put("/:id", isAuth, editUserInfo);
routes.put("/change-password/:id", isAuth, changeUserPassword);
routes.get("/byupload/:uploadId", isAuth, fetchUserInfoFromUpload);

module.exports = routes;
