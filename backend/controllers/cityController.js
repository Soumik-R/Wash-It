const City = require("../models/City");

// Add city (Admin)
exports.addCity = async (req, res) => {
  try {
    const { name } = req.body;

    const city = await City.create({ name });
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get active cities (Public)
exports.getActiveCities = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check city availability
exports.checkCity = async (req, res) => {
  try {
    const { city } = req.params;

    const found = await City.findOne({ name: city, isActive: true });

    if (!found) {
      return res.status(404).json({
        available: false,
        message: "Service not available in this city"
      });
    }

    res.json({ available: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
