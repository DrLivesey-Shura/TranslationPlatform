const { Router } = require("express");
const routes = new Router();
const { isAuth } = require("../utils/utils");
const { generateToken, processPayment } = require("../Controllers/braintree");

routes.get("/getToken/:userId", isAuth, generateToken);
routes.post("/payment/:userId", isAuth, processPayment);

module.exports = routes;
