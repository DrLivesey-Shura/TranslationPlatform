const { Router } = require("express");
const uploadMiddleware = require("../Middleware/MulterMiddleware");
const { protect } = require("../Middleware/authMiddleware");
const {
  fetchUploads,
  uploadFile,
  userUploads,
  deleteUpload,
} = require("../Controllers/UploadsControllers");

const routes = new Router();

// Add routes
routes.get("/", fetchUploads);
routes.post("/", uploadMiddleware.single("photo"), uploadFile);
routes.delete("/delete/:uploadId", deleteUpload);
routes.get("/:userId", userUploads);

module.exports = routes;
