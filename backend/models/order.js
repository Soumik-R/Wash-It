const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  city: String,

  clothes: [
    {
      clothType: String,
      washType: String,
      quantity: Number
    }
  ],

  price: Number,

  priority: {
    type: Number, // 1 = Express, 2 = Normal
    default: 2
  },

  pickupTime: Date,
  deliveryTime: Date,

  status: {
    type: String,
    enum: ["Pending", "Picked", "Washing", "Out for Delivery", "Delivered"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
