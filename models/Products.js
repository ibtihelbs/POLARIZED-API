const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);
