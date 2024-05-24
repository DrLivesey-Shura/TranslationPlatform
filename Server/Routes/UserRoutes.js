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

const routes = new Router();

// Add routes
routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/", getAllUsers);
routes.get("/:id", getUserById);
routes.put("/:id", editUserInfo);
routes.put("/change-password/:id", changeUserPassword);
routes.get("/byupload/:uploadId", fetchUserInfoFromUpload);

module.exports = routes;
