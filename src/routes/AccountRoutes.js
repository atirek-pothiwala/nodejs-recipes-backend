const express = require("express");
const controller = require("../controllers/AccountController");
const multipart = require("../middlewares/Multipart");
const authenticate = require("../middlewares/Authenticate");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", authenticate, controller.detail);
router.post("/upload", authenticate, multipart.create("accounts").single("photo"), controller.upload);
router.put("/profile", authenticate, controller.update);
router.delete("/delete", authenticate, controller.delete);
router.post("/changePassword", authenticate, controller.changePassword);

module.exports = router;