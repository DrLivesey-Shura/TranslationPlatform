const { Router } = require("express");
const uploadMiddleware = require("../Middleware/MulterMiddleware");
const { protect } = require("../Middleware/authMiddleware");
const {
  createTranslationDemand,
  getAllTranslationDemands,
  getTranslationDemandById,
  updateTranslationDemandById,
  deleteTranslationDemandById,
} = require("../Controllers/TranslationsRequestsControllers");
const routes = new Router();

// Add routes
routes.post("/translation-demands", createTranslationDemand);
routes.get("/translation-demands", getAllTranslationDemands);
routes.get("/translation-demands/:id", getTranslationDemandById);
routes.put("/translation-demands/:id", updateTranslationDemandById);
routes.delete("/translation-demands/:id", deleteTranslationDemandById);

module.exports = routes;
