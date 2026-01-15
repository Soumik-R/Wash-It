const express = require("express");
const { createOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createOrder);

module.exports = router;
