const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/sign-up", authController.signup_get);
router.post("/sign-up", authController.signup_post);

router.get("/sign-in", authController.signin_get);

module.exports = router;