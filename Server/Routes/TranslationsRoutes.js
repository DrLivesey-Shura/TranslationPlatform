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
const routes = new Router();

// Add routes
routes.post("/", createTranslationDemand);
routes.get("/", getAllTranslationDemands);
routes.get("/:id", getTranslationDemandById);
routes.get("/user/:id", getUserTranslationDemand);
routes.put("/:id", updateTranslationDemandById);
routes.delete("/:id", deleteTranslationDemandById);

routes.post("/pay/:translationDemandId", initiatePayment);
routes.put("/pay/:translationDemandId", adminValidateTranslationDemand);
routes.post(
  "/pay/proof/:translationDemandId",
  uploadMiddleware.single("photo"),
  paymentProof
);

module.exports = routes;
