const express = require("express");
const router = express.Router();

const joinController = require("../controllers/joinController");
router.get("/join-club", joinController.join_get);
router.post("/join-club", joinController.join_post)

module.exports = router;