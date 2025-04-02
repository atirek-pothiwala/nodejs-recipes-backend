const express = require("express");
const cors = require("cors");

const AccountRoutes = require("./routes/AccountRoutes");
const RecipeRoutes = require("./routes/RecipeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// APIs
app.use("/api/accounts", AccountRoutes);
app.use("/api/recipes", RecipeRoutes);

module.exports = app