const express = require("express");
const {
  addCity,
  getActiveCities,
  checkCity
} = require("../controllers/cityController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.post("/add", authMiddleware, addCity);

// Public
router.get("/", getActiveCities);
router.get("/active", getActiveCities);
router.get("/check/:city", checkCity);

module.exports = router;
