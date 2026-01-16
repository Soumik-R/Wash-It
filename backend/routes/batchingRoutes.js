const express = require("express");
const { assignOrdersToAgent } = require("../controllers/batchingController");

const router = express.Router();

// Public route for testing
router.post("/assign", assignOrdersToAgent);

module.exports = router;
