const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const XLSX = require("xlsx");
const AdmZip = require("adm-zip");
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
const uploadRoot = path.join(__dirname, "..", "..", "uploads", "product-imports");
const finalRoot = path.join(__dirname, "..", "..", "uploads", "products");
const allowedCategories = new Set([
  "CCTV Surveillance", "Access Control", "Biometric", "Networking",
  "Fire Alarm", "EPABX / Intercom", "Power Backup", "IT Hardware", "Other",
]);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(uploadRoot, "incoming");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${path.extname(file.originalname).toLowerCase()}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024, files: 3 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const field = file.fieldname;
    const ok = field === "spreadsheet" ? [".xlsx", ".xls", ".csv"].includes(ext)
      : ["imagesZip", "catalogsZip"].includes(field) && ext === ".zip";
    cb(ok ? null : new Error("Excel/CSV file aur images/catalogs ke liye ZIP files hi upload karein."), ok);
  },
});

function cleanName(value) {
  return path.basename(String(value || "").trim()).replace(/[\\/]/g, "").toLowerCase();
}
function numberOrNull(value) {
  if (value === undefined || value === null || String(value).trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}
function getValue(row, ...names) {
  const keys = Object.keys(row);
  for (const name of names) {
    const key = keys.find(k => String(k).trim().toLowerCase() === name.toLowerCase());
    if (key !== undefined) return row[key];
  }
  return "";
}
function readZipIndex(zipPath, kind) {
  if (!zipPath) return { zip: null, index: new Map(), errors: [] };
  const zip = new AdmZip(zipPath);
  const index = new Map();
  const errors = [];
  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;
    const raw = entry.entryName.replace(/\\/g, "/");
    if (raw.startsWith("/") || raw.split("/").includes("..")) {
      errors.push(`${kind} ZIP mein unsafe path mila: ${raw}`);
      continue;
    }
    const base = cleanName(path.posix.basename(raw));
    if (!base) continue;
    const ext = path.extname(base);
    const valid = kind === "image" ? [".jpg", ".jpeg", ".png", ".webp"].includes(ext) : ext === ".pdf";
    if (!valid) continue;
    if (!index.has(base)) index.set(base, entry);
  }
  return { zip, index, errors };
}
function readSheet(filePath) {
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return sheet ? XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false }) : [];
}
function normalizeRow(row, line, imageIndex, pdfIndex) {
  const sku = String(getValue(row, "SKU", "Product SKU")).trim().toUpperCase();
  const name = String(getValue(row, "Product Name", "Name")).trim();
  const brand = String(getValue(row, "Brand")).trim();
  const model = String(getValue(row, "Model", "Model Number")).trim();
  const category = String(getValue(row, "Category")).trim();
  const description = String(getValue(row, "Description", "Product Description")).trim();
  const mrp = numberOrNull(getValue(row, "MRP", "List Price"));
  const sellingPrice = numberOrNull(getValue(row, "Selling Price", "Sale Price", "Price"));
  const imageFile = String(getValue(row, "Image File", "Image Filename", "Image")).trim();
  const catalogFile = String(getValue(row, "Catalog PDF", "Catalog Filename", "Datasheet PDF", "Datasheet")).trim();
  const issues = [];
  if (!sku) issues.push("SKU missing");
  if (!name) issues.push("Product Name missing");
  if (name.length > 180) issues.push("Product Name 180 characters se zyada hai");
  if (!allowedCategories.has(category)) issues.push("Category allowed list se match nahi karti");
  if (Number.isNaN(mrp) || (mrp != null && mrp < 0)) issues.push("MRP invalid hai");
  if (Number.isNaN(sellingPrice) || (sellingPrice != null && sellingPrice < 0)) issues.push("Selling Price invalid hai");
  if (mrp != null && sellingPrice != null && sellingPrice > mrp) issues.push("Selling Price, MRP se zyada hai");
  if (imageFile && !imageIndex.has(cleanName(imageFile))) issues.push(`Image ZIP mein nahi mili: ${imageFile}`);
  if (catalogFile && !pdfIndex.has(cleanName(catalogFile))) issues.push(`Catalog ZIP mein nahi mila: ${catalogFile}`);
  return {
    line,
    product: { sku, name, brand, model, category, description, mrp: mrp == null || Number.isNaN(mrp) ? null : mrp, sellingPrice: sellingPrice == null || Number.isNaN(sellingPrice) ? null : sellingPrice, imageFile, catalogFile, isPublished: true },
    issues,
  };
}
function safeExtension(name) { return path.extname(String(name || "")).toLowerCase(); }
async function saveZipEntry(entry, targetDir, sku, originalName, kind) {
  const ext = safeExtension(originalName || entry.entryName);
  const safeSku = String(sku).replace(/[^A-Z0-9_-]/gi, "_").slice(0, 80) || crypto.randomUUID();
  const config = cloudinary.config();
  const cloudReady = Boolean(config.cloud_name && config.api_key && config.api_secret);
  const bytes = entry.getData();
  if (cloudReady) {
    const resourceType = kind === "image" ? "image" : "raw";
    const publicId = kind === "image" ? safeSku : `${safeSku}${ext}`;
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder: kind === "image" ? "g2g-products/images" : "g2g-products/catalogs",
        resource_type: resourceType,
        public_id: publicId,
        overwrite: true,
      }, (error, uploaded) => error ? reject(error) : resolve(uploaded));
      stream.end(bytes);
    });
    return result.secure_url;
  }
  const filename = `${safeSku}${ext}`;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, filename), bytes);
  return `/uploads/products/${kind === "image" ? "images" : "catalogs"}/${filename}`;
}

// Stage and validate files. Nothing is added to the products collection until confirmation.
router.post("/bulk/preview", adminAuth, upload.fields([
  { name: "spreadsheet", maxCount: 1 }, { name: "imagesZip", maxCount: 1 }, { name: "catalogsZip", maxCount: 1 },
]), async (req, res) => {
  const incoming = ["spreadsheet", "imagesZip", "catalogsZip"].flatMap(key => (req.files?.[key] || []).map(f => f.path));
  let batchDir = "";
  try {
    const sheetFile = req.files?.spreadsheet?.[0];
    if (!sheetFile) return res.status(400).json({ success: false, message: "Excel/CSV file required hai." });
    const batchId = crypto.randomUUID();
    batchDir = path.join(uploadRoot, batchId);
    fs.mkdirSync(batchDir, { recursive: true });
    const imageFile = req.files?.imagesZip?.[0];
    const catalogFile = req.files?.catalogsZip?.[0];
    const stored = {};
    for (const f of [sheetFile, imageFile, catalogFile].filter(Boolean)) {
      const destination = path.join(batchDir, path.basename(f.path));
      fs.copyFileSync(f.path, destination);
      stored[f.fieldname] = { path: destination, originalname: f.originalname };
    }
    const images = readZipIndex(stored.imagesZip?.path, "image");
    const pdfs = readZipIndex(stored.catalogsZip?.path, "catalog");
    const rows = readSheet(stored.spreadsheet.path).map((r, i) => normalizeRow(r, i + 2, images.index, pdfs.index));
    if (!rows.length) throw new Error("Excel/CSV mein header ke neeche koi product row nahi mili.");
    const seen = new Set();
    for (const row of rows) {
      const key = row.product.sku;
      if (key && seen.has(key)) row.issues.push("Excel file mein duplicate SKU");
      if (key) seen.add(key);
    }
    const skus = [...new Set(rows.map(r => r.product.sku).filter(Boolean))];
    const existing = await Product.find({ sku: { $in: skus } }).select("sku name").lean();
    const existingSkus = new Map(existing.map(p => [String(p.sku).toUpperCase(), p.name]));
    for (const row of rows) if (existingSkus.has(row.product.sku)) row.issues.push(`SKU pehle se maujood hai (${existingSkus.get(row.product.sku)})`);
    const globalErrors = [...images.errors, ...pdfs.errors];
    const manifest = { batchId, createdAt: new Date().toISOString(), stored, rows, globalErrors };
    fs.writeFileSync(path.join(batchDir, "manifest.json"), JSON.stringify(manifest, null, 2));
    res.json({ success: true, batchId, total: rows.length, valid: rows.filter(r => !r.issues.length).length, invalid: rows.filter(r => r.issues.length).length, globalErrors, rows: rows.map(r => ({ line: r.line, sku: r.product.sku, name: r.product.name, category: r.product.category, brand: r.product.brand, imageFile: r.product.imageFile, catalogFile: r.product.catalogFile, issues: r.issues })) });
  } catch (error) {
    if (batchDir) fs.rmSync(batchDir, { recursive: true, force: true });
    res.status(400).json({ success: false, message: error.message || "Bulk upload preview failed." });
  } finally {
    for (const file of incoming) fs.rmSync(file, { force: true });
  }
});

router.post("/bulk/confirm/:batchId", adminAuth, async (req, res) => {
  const batchDir = path.join(uploadRoot, path.basename(req.params.batchId));
  try {
    const manifestPath = path.join(batchDir, "manifest.json");
    if (!fs.existsSync(manifestPath)) return res.status(404).json({ success: false, message: "Upload preview expire/missing hai. Files dobara upload karein." });
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.globalErrors.length) return res.status(400).json({ success: false, message: "ZIP files mein unsafe paths hain; ZIP dobara banayein.", errors: manifest.globalErrors });
    const invalid = manifest.rows.filter(r => r.issues.length);
    if (invalid.length) return res.status(400).json({ success: false, message: "Preview mein errors hain. Excel/ZIP theek karke dobara upload karein; koi product import nahi hua.", invalid: invalid.map(r => ({ line: r.line, sku: r.product.sku, issues: r.issues })) });
    const images = readZipIndex(manifest.stored.imagesZip?.path, "image");
    const pdfs = readZipIndex(manifest.stored.catalogsZip?.path, "catalog");
    const toInsert = [];
    for (const row of manifest.rows) {
      const p = row.product;
      let image = "";
      let catalogPdf = "";
      if (p.imageFile) {
        const entry = images.index.get(cleanName(p.imageFile));
        image = await saveZipEntry(entry, path.join(finalRoot, "images"), p.sku, p.imageFile, "image");
      }
      if (p.catalogFile) {
        const entry = pdfs.index.get(cleanName(p.catalogFile));
        catalogPdf = await saveZipEntry(entry, path.join(finalRoot, "catalogs"), p.sku, p.catalogFile, "catalog");
      }
      toInsert.push({ name: p.name, sku: p.sku, brand: p.brand, model: p.model, category: p.category, description: p.description, mrp: p.mrp, sellingPrice: p.sellingPrice, image, catalogPdf, isPublished: true });
    }
    const inserted = await Product.insertMany(toInsert, { ordered: true });
    fs.rmSync(batchDir, { recursive: true, force: true });
    const config = cloudinary.config();
    const mediaPersistent = Boolean(config.cloud_name && config.api_key && config.api_secret);
    res.status(201).json({ success: true, imported: inserted.length, mediaPersistent, message: `${inserted.length} products successfully import ho gaye.${mediaPersistent ? " Images aur PDFs cloud storage mein save hue." : " Media server ke local storage mein save hai; Render par permanent rakhne ke liye Cloudinary env credentials configure karein."}` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Import complete nahi ho paya. Products list refresh karke verify karein." });
  }
});

router.delete("/bulk/preview/:batchId", adminAuth, (req, res) => {
  const batchDir = path.join(uploadRoot, path.basename(req.params.batchId));
  fs.rmSync(batchDir, { recursive: true, force: true });
  res.json({ success: true, message: "Preview cancelled." });
});

module.exports = router;
