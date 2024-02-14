const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  editUserInfo,
  fetchUserInfoFromUpload,
} = require("../Controllers/UserControllers");
const { protect } = require("../Middleware/authMiddleware");

const routes = new Router();

// Add routes
routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/", getAllUsers);
routes.put("/:id", editUserInfo);
routes.get("/byupload/:uploadId", fetchUserInfoFromUpload);

module.exports = routes;
