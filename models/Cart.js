const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});
module.exports = mongoose.model("Cart", CartSchema);
