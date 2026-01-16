const express = require("express");
const { optimizeRoute } = require("../controllers/routeController");

const router = express.Router();

// Public route for testing/optimization
router.post("/optimize", optimizeRoute);

module.exports = router;
