import { useState } from "react";
import { apiUrl } from "../config/api";
import { FaFileExcel, FaImages, FaFilePdf, FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./ProductBulkImport.css";

const templateHeaders = ["SKU", "Category", "Brand", "Model", "Product Name", "MRP", "Selling Price", "Image File", "Catalog PDF", "Description"];
const categories = ["CCTV Surveillance", "Access Control", "Biometric", "Networking", "Fire Alarm", "EPABX / Intercom", "Power Backup", "IT Hardware", "Other"];

export default function ProductBulkImport({ token, onImported }) {
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [imagesZip, setImagesZip] = useState(null);
  const [catalogsZip, setCatalogsZip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function downloadTemplate() {
    const csvCell = value => `"${String(value).replace(/"/g, '""')}"`;
    const csv = templateHeaders.map(csvCell).join(",") + "\r\n";
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "g2g-product-bulk-template.csv"; a.click(); URL.revokeObjectURL(url);
  }

  async function makePreview(e) {
    e.preventDefault(); setBusy(true); setError(""); setNotice(""); setPreview(null);
    try {
      const body = new FormData();
      body.append("spreadsheet", spreadsheet);
      if (imagesZip) body.append("imagesZip", imagesZip);
      if (catalogsZip) body.append("catalogsZip", catalogsZip);
      const response = await fetch(apiUrl("/api/products/bulk/preview"), { method: "POST", headers: { Authorization: `Bearer ${token}` }, body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Bulk preview nahi ban paya.");
      setPreview(result);
      if (result.invalid) setNotice("Preview taiyar hai. Import se pehle saari errors theek karni hongi.");
    } catch (err) { setError(err.message || "Upload failed."); }
    finally { setBusy(false); }
  }

  async function confirmImport() {
    if (!preview?.batchId) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(apiUrl(`/api/products/bulk/confirm/${preview.batchId}`), { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Import nahi hua.");
      setNotice(result.message || `${result.imported} products import ho gaye.`);
      setPreview(null); setSpreadsheet(null); setImagesZip(null); setCatalogsZip(null);
      const form = document.getElementById("g2g-bulk-import-form"); if (form) form.reset();
      if (onImported) await onImported();
    } catch (err) { setError(err.message || "Import failed."); }
    finally { setBusy(false); }
  }

  async function cancelPreview() {
    if (preview?.batchId) {
      try { await fetch(apiUrl(`/api/products/bulk/preview/${preview.batchId}`), { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); } catch (_) {}
    }
    setPreview(null); setError(""); setNotice("Preview cancel kar diya gaya.");
  }

  return <section className="ap-bulk-card">
    <div className="ap-bulk-head"><div><span>BULK CATALOGUE IMPORT</span><h2>Ek saath kai products add karein</h2><p>Excel/CSV + product images ZIP + official catalog PDFs ZIP. Preview check ke baad hi database mein save hoga.</p></div><button type="button" className="ap-bulk-template" onClick={downloadTemplate}><FaFileExcel /> Download Excel Template</button></div>
    {error && <div className="ap-alert ap-error" role="alert">{error}</div>}{notice && <div className="ap-alert ap-success" role="status">{notice}</div>}
    <form id="g2g-bulk-import-form" className="ap-bulk-form" onSubmit={makePreview}>
      <label className="ap-bulk-file"><FaFileExcel /><strong>1. Product Excel / CSV *</strong><span>Columns: SKU, Category, Brand, Model, Product Name, MRP, Selling Price, Image File, Catalog PDF, Description</span><input required type="file" accept=".xlsx,.xls,.csv" onChange={e=>{setSpreadsheet(e.target.files?.[0] || null);setPreview(null);}} /></label>
      <label className="ap-bulk-file"><FaImages /><strong>2. Product images ZIP</strong><span>JPG, PNG, WEBP. Excel ka Image File filename ZIP ke andar exact match hona chahiye.</span><input type="file" accept=".zip,application/zip" onChange={e=>{setImagesZip(e.target.files?.[0] || null);setPreview(null);}} /></label>
      <label className="ap-bulk-file"><FaFilePdf /><strong>3. Official catalogs / datasheets ZIP</strong><span>PDF files. Catalog PDF column mein filename likhein. Ye optional hai.</span><input type="file" accept=".zip,application/zip" onChange={e=>{setCatalogsZip(e.target.files?.[0] || null);setPreview(null);}} /></label>
      <div className="ap-bulk-rules"><strong>Dhyan dein</strong><ul><li>SKU unique aur Category allowed list se honi chahiye: {categories.join(", ")}.</li><li>MRP aur Selling Price optional hain, lekin Selling Price MRP se zyada nahi ho sakti.</li><li>Images/catalog optional hain; filename blank ho to file attach nahi hogi.</li><li>Preview mein koi error hua to import rukega. Existing products delete nahi honge.</li></ul></div>
      <button className="ap-bulk-submit" type="submit" disabled={busy || !spreadsheet}><FaCloudUploadAlt /> {busy ? "Checking files…" : "Upload & Preview"}</button>
    </form>
    {preview && <div className="ap-bulk-preview"><div className="ap-bulk-preview-head"><div><h3>Import Preview</h3><p>{preview.total} rows checked · {preview.valid} valid · {preview.invalid} with errors</p></div><div className="ap-bulk-preview-actions"><button type="button" onClick={cancelPreview} disabled={busy}>Cancel</button><button type="button" onClick={confirmImport} disabled={busy || preview.invalid > 0 || (preview.globalErrors || []).length > 0 || preview.valid === 0}>{busy ? "Importing…" : `Confirm Import (${preview.valid})`}</button></div></div>
      {(preview.globalErrors || []).map((msg,i)=><p className="ap-bulk-row-error" key={`global-${i}`}><FaTimesCircle /> {msg}</p>)}
      <div className="ap-bulk-table-wrap"><table className="ap-bulk-table"><thead><tr><th>Excel row</th><th>SKU / Product</th><th>Category / Brand</th><th>Files</th><th>Validation</th></tr></thead><tbody>{preview.rows.map(row=><tr key={`${row.line}-${row.sku}`}><td>{row.line}</td><td><strong>{row.sku || "—"}</strong><small>{row.name || "Unnamed product"}</small></td><td>{row.category || "—"}<small>{row.brand || "No brand"}</small></td><td><small>Image: {row.imageFile || "—"}</small><small>PDF: {row.catalogFile || "—"}</small></td><td>{row.issues.length ? <span className="ap-bulk-bad"><FaTimesCircle /> {row.issues.join("; ")}</span> : <span className="ap-bulk-good"><FaCheckCircle /> Ready</span>}</td></tr>)}</tbody></table></div>
    </div>}
  </section>;
}
