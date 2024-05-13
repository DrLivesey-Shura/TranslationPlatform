const { Router } = require("express");
const uploadMiddleware = require("../Middleware/MulterMiddleware");
const { protect } = require("../Middleware/authMiddleware");
const {
  fetchUploads,
  uploadFile,
  userUploads,
  deleteUpload,
  fetchUploadById,
  downloadUpload,
} = require("../Controllers/UploadsControllers");

const routes = new Router();

// Add routes
routes.get("/", fetchUploads);
routes.get("/file/:fileId", fetchUploadById);
routes.get("/:userId", userUploads);
routes.post("/", uploadMiddleware.single("file"), uploadFile);
routes.delete("/delete/:uploadId", deleteUpload);

routes.get("/download/:filename", downloadUpload);

module.exports = routes;
