const { Router } = require("express");
const uploadMiddleware = require("../Middleware/MulterMiddleware");
const { protect } = require("../Middleware/authMiddleware");
const {
  createTranslationDemand,
  getAllTranslationDemands,
  getTranslationDemandById,
  updateTranslationDemandById,
  deleteTranslationDemandById,
  getUserTranslationDemand,
} = require("../Controllers/TranslationsRequestsControllers");
const routes = new Router();

// Add routes
routes.post("/", createTranslationDemand);
routes.get("/", getAllTranslationDemands);
routes.get("/:id", getTranslationDemandById);
routes.get("/user/:id", getUserTranslationDemand);
routes.put("/:id", updateTranslationDemandById);
routes.delete("/:id", deleteTranslationDemandById);

module.exports = routes;
