const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", authController.register_get);
router.post("/register", authController.register_post);

router.get("/login", authController.login_get);

module.exports = router;