const express = require("express");
const connectDB = require("./db.js");
const UserRoutes = require("./Routes/UserRoutes.js");
const UploadRoutes = require("./Routes/UploadRoutes.js");
const TranslationsRoutes = require("./Routes/TranslationsRoutes.js");
const BraintreeRoutes = require("./Routes/braintree.js");
const app = express();
const cors = require("cors");
const colors = require("colors");

require("dotenv").config();

// Mongo DB Connections
connectDB();

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/braintree", BraintreeRoutes);
app.use("/user", UserRoutes);
app.use("/upload", UploadRoutes);
app.use("/translation-demands", TranslationsRoutes);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: ".yellow.bold + PORT.yellow.bold);
});
