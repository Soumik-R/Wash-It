const express = require("express");
const { optimizeRoute } = require("../controllers/routeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/optimize", authMiddleware, optimizeRoute);

module.exports = router;
