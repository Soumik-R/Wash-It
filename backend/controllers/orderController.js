const Order = require("../models/Order");
const City = require("../models/city");
const Service = require("../models/Service");
const { addOrderToQueue } = require("../utils/orderScheduler");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { clothes, city, pickupTime, deliveryTime, isExpress } = req.body;

    // 1. Check city availability
    const cityAvailable = await City.findOne({ name: city, isActive: true });
    if (!cityAvailable) {
      return res.status(400).json({
        message: "Service not available in this city"
      });
    }

    // 2. Calculate price
    let totalPrice = 0;

    for (let item of clothes) {
      const service = await Service.findOne({
        clothType: item.clothType,
        washType: item.washType
      });

      if (!service) {
        return res.status(400).json({
          message: `Service not found for ${item.clothType} - ${item.washType}`
        });
      }

      totalPrice += service.basePrice * item.quantity;
    }

    // 3. Priority logic
    const priority = isExpress ? 1 : 2;

    // 4. Save order
    const order = await Order.create({
      userId: req.user.id,
      city,
      clothes,
      price: totalPrice,
      priority,
      pickupTime,
      deliveryTime
    });

    // Add order to priority queue
    addOrderToQueue(order);

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
