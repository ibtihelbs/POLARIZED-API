const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    img: {
      type: String,
      required: [true, "Image URL is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    tags: {
      type: [String], // Array of strings
    },
    images: {
      type: [String], // Array of strings
    },
    inStock: {
      type: Boolean,
      default: true,
      index: true, // Index for faster querying
    },
    category: {
      type: String, // Array of categories
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
    },
    sales: {
      type: Number,
      default: 0, // Percentage of sales
      min: 0, // Minimum value for sales percentage
      max: 100, // Maximum value for sales percentage
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
