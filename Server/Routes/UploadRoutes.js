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
  uploadTrasnlatedFile,
  downloadTranslatedUpload,
} = require("../Controllers/UploadsControllers");
const uploadTranslatedMiddleware = require("../Middleware/MulterMiddlewareTrans");

const routes = new Router();

// Add routes
routes.get("/", fetchUploads);
routes.get("/file/:fileId", fetchUploadById);
routes.get("/:userId", userUploads);
routes.post("/", uploadMiddleware.single("file"), uploadFile);
routes.get("/download/:filename", downloadUpload);
routes.delete("/delete/:uploadId", deleteUpload);

routes.post(
  "/translated-upload",
  uploadTranslatedMiddleware.single("file"),
  uploadTrasnlatedFile
);
routes.get("/download-translated/:filename", downloadTranslatedUpload);

module.exports = routes;
