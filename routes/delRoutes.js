const express = require("express");
const router = express.Router();
const delController = require("../controllers/delController");

router.get("/delete/:id", delController.deleteMessage);

module.exports = router;