const Order = require("../models/Order");
const DeliveryAgent = require("../models/DeliveryAgent");
const batchOrdersGreedy = require("../utils/orderBatching");

exports.assignOrdersToAgent = async (req, res) => {
  try {
    const { agentId } = req.body;

    const agent = await DeliveryAgent.findById(agentId);
    if (!agent || !agent.isAvailable) {
      return res.status(400).json({ message: "Agent not available" });
    }

    const orders = await Order.find({
      city: agent.city,
      status: "Pending"
    });

    const batchedOrders = batchOrdersGreedy(
      agent.currentLocation,
      orders
    );

    // Mark orders as picked
    const orderIds = batchedOrders.map(o => o._id);
    await Order.updateMany(
      { _id: { $in: orderIds } },
      { status: "Picked" }
    );

    agent.isAvailable = false;
    await agent.save();

    res.json({
      message: "Orders assigned successfully",
      orders: batchedOrders
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
