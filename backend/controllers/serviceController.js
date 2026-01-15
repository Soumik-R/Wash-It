const Service = require("../models/Service");

// Add service (Admin)
exports.addService = async (req, res) => {
  try {
    const { clothType, washType, basePrice } = req.body;

    const service = await Service.create({
      clothType,
      washType,
      basePrice
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
