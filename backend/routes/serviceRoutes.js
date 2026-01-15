const express = require("express");
const {
  addService,
  getServices
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.post("/add", authMiddleware, addService);

// Public
router.get("/", getServices);

module.exports = router;
