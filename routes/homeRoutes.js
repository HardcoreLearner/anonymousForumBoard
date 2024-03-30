const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
router.get("/", homeController.home_get);
router.post("/", homeController.new_message)

module.exports = router;