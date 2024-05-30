const { Router } = require("express");
const uploadMiddleware = require("../Middleware/MulterMiddleware");
const {
  createTranslationDemand,
  getAllTranslationDemands,
  getTranslationDemandById,
  updateTranslationDemandById,
  deleteTranslationDemandById,
  getUserTranslationDemand,
} = require("../Controllers/TranslationsRequestsControllers");
const {
  initiatePayment,
  adminValidateTranslationDemand,
  paymentProof,
} = require("../Controllers/PaymentControllers");
const { isAdmin, isAuth } = require("../utils/utils");
const routes = new Router();

// Add routes
routes.post("/", isAuth, createTranslationDemand);
routes.get("/", isAuth, isAdmin, getAllTranslationDemands);
routes.get("/:id", isAuth, getTranslationDemandById);
routes.get("/user/:id", isAuth, getUserTranslationDemand);
routes.put("/:id", isAuth, updateTranslationDemandById);
routes.delete("/:id", isAuth, deleteTranslationDemandById);

routes.post("/pay/:translationDemandId", isAuth, initiatePayment);
routes.put("/pay/:translationDemandId", isAuth, adminValidateTranslationDemand);
routes.post(
  "/pay/proof/:translationDemandId",
  uploadMiddleware.single("photo"),
  paymentProof
);

module.exports = routes;
