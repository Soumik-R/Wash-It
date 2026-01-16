const express = require("express");
const { processNextOrder } = require("../utils/orderScheduler");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/next", authMiddleware, (req, res) => {
  const nextOrder = processNextOrder();

  if (!nextOrder) {
    return res.json({ message: "No orders in queue" });
  }

  res.json(nextOrder);
});

module.exports = router;
