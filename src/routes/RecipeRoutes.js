const express = require('express');
const controller = require("../controllers/RecipeController");
const multipart = require("../middlewares/Multipart");
const authenticate = require("../middlewares/Authenticate");

const router = express.Router();

router.post("/upload", multipart.create("recipes").single("photo"), controller.upload);
router.post("/create", controller.create);
router.get("/list", authenticate, controller.list);
router.get("/detail", authenticate, controller.detail);
router.delete("/delete/:id", controller.delete);
router.get("/filterList", authenticate, controller.filterList);

module.exports = router;