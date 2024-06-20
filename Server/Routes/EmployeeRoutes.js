const { Router } = require("express");

const { isAuth, isAdmin } = require("../utils/utils");
const {
  getAllEmployes,
  newEmpolye,
  deleteEmployee,
} = require("../Controllers/EmployeControllers");

const routes = new Router();

// Add routes
routes.post("/", isAuth, isAdmin, newEmpolye);
routes.get("/", isAuth, isAdmin, getAllEmployes);
routes.delete("/:id", isAuth, isAdmin, deleteEmployee);

module.exports = routes;
