const express = require('express');
const controller = require("../controllers/RecipeController");
const multipart = require("../middlewares/Multipart");
const authenticate = require("../middlewares/Authenticate");

const router = express.Router();

router.post("/upload", authenticate, multipart.create("recipes").single("photo"), controller.upload);
router.post("/create", authenticate, controller.create);
router.get("/list", authenticate, controller.list);
router.delete("/delete", authenticate, controller.delete);

module.exports = router;