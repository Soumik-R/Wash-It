const express = require("express");
const { assignOrdersToAgent } = require("../controllers/batchingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/assign", authMiddleware, assignOrdersToAgent);

module.exports = router;
