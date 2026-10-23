const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 180 },
  sku: { type: String, trim: true, uppercase: true, default: "" },
  brand: { type: String, trim: true, default: "" },
  model: { type: String, trim: true, default: "" },
  category: { type: String, required: true, trim: true, default: "Other" },
  description: { type: String, trim: true, default: "" },
  image: { type: String, trim: true, default: "" },
  catalogPdf: { type: String, trim: true, default: "" },
  mrp: { type: Number, min: 0, default: null },
  sellingPrice: { type: Number, min: 0, default: null },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
