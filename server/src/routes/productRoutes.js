const express = require("express");
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

const cleanProduct = (body) => {
  const mrp = body.mrp === "" || body.mrp == null ? null : Number(body.mrp);
  const sellingPrice = body.sellingPrice === "" || body.sellingPrice == null ? null : Number(body.sellingPrice);
  if (mrp != null && (!Number.isFinite(mrp) || mrp < 0)) throw new Error("MRP must be a valid non-negative number.");
  if (sellingPrice != null && (!Number.isFinite(sellingPrice) || sellingPrice < 0)) throw new Error("Selling price must be a valid non-negative number.");
  if (mrp != null && sellingPrice != null && sellingPrice > mrp) throw new Error("Selling price cannot be higher than MRP.");
  return {
    name: String(body.name || "").trim(), sku: String(body.sku || "").trim().toUpperCase(),
    brand: String(body.brand || "").trim(), model: String(body.model || "").trim(),
    category: String(body.category || "Other").trim(), description: String(body.description || "").trim(),
    image: String(body.image || "").trim(), catalogPdf: String(body.catalogPdf || "").trim(),
    mrp, sellingPrice, isPublished: body.isPublished !== false && body.isPublished !== "false",
  };
};

router.get("/", async (_req, res) => {
  try {
    const products = await Product.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: products.map(p => ({ ...p, id: String(p._id), discountPercent: p.mrp > 0 && p.sellingPrice != null ? Math.round((p.mrp - p.sellingPrice) / p.mrp * 100) : 0 })) });
  } catch (error) {
    console.error("Public products error:", error);
    res.status(500).json({ success: false, message: "Unable to load products." });
  }
});

router.get("/admin", adminAuth, async (_req, res) => {
  try { res.json({ success: true, data: await Product.find().sort({ createdAt: -1 }).lean() }); }
  catch (error) { res.status(500).json({ success: false, message: "Unable to load product inventory." }); }
});

router.post("/", adminAuth, async (req, res) => {
  try {
    const data = cleanProduct(req.body);
    if (!data.name) return res.status(400).json({ success: false, message: "Product name is required." });
    if (data.sku && await Product.exists({ sku: data.sku })) return res.status(409).json({ success: false, message: "This SKU already exists." });
    const product = await Product.create(data);
    res.status(201).json({ success: true, data: { ...product.toObject(), id: String(product._id) } });
  } catch (error) { res.status(400).json({ success: false, message: error.message || "Unable to add product." }); }
});

router.put("/:id", adminAuth, async (req, res) => {
  try {
    const data = cleanProduct(req.body);
    if (!data.name) return res.status(400).json({ success: false, message: "Product name is required." });
    if (data.sku && await Product.exists({ sku: data.sku, _id: { $ne: req.params.id } })) return res.status(409).json({ success: false, message: "This SKU already exists." });
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    res.json({ success: true, data: { ...product.toObject(), id: String(product._id) } });
  } catch (error) { res.status(400).json({ success: false, message: error.message || "Unable to update product." }); }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    res.json({ success: true, message: "Product deleted." });
  } catch (_error) { res.status(400).json({ success: false, message: "Invalid product ID." }); }
});

module.exports = router;
