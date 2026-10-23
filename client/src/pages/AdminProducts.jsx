import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";
import ProductBulkImport from "../components/ProductBulkImport";
import { FaBoxOpen, FaEdit, FaPlus, FaTrash, FaSyncAlt } from "react-icons/fa";
import "./AdminProducts.css";

const blank = { name: "", sku: "", brand: "", model: "", category: "CCTV Surveillance", description: "", image: "", catalogPdf: "", mrp: "", sellingPrice: "", isPublished: true };
const money = value => value == null || value === "" ? "—" : `₹${Number(value).toLocaleString("en-IN")}`;

export default function AdminProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("g2g_admin_token");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const discount = useMemo(() => Number(form.mrp) > 0 && form.sellingPrice !== "" ? Math.max(0, Math.round((Number(form.mrp) - Number(form.sellingPrice)) / Number(form.mrp) * 100)) : 0, [form.mrp, form.sellingPrice]);

  async function load() {
    setLoading(true); setError("");
    try {
      const response = await fetch(apiUrl("/api/products/admin"), { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 401) { localStorage.removeItem("g2g_admin_token"); navigate("/admin"); return; }
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Products load nahi ho paye.");
      setItems(result.data || []);
    } catch (e) { setError(e.message || "Server se connect nahi ho paya."); }
    finally { setLoading(false); }
  }
  useEffect(() => { if (!token) navigate("/admin"); else load(); }, []);

  function update(key, value) { setForm(old => ({ ...old, [key]: value })); }
  function startEdit(item) {
    setEditing(item._id); setNotice(""); setError("");
    setForm({ name: item.name || "", sku: item.sku || "", brand: item.brand || "", model: item.model || "", category: item.category || "Other", description: item.description || "", image: item.image || "", catalogPdf: item.catalogPdf || "", mrp: item.mrp ?? "", sellingPrice: item.sellingPrice ?? "", isPublished: item.isPublished !== false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetForm() { setForm(blank); setEditing(""); setError(""); setNotice(""); }
  async function save(e) {
    e.preventDefault(); setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch(apiUrl(editing ? `/api/products/${editing}` : "/api/products"), {
        method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, mrp: form.mrp === "" ? null : Number(form.mrp), sellingPrice: form.sellingPrice === "" ? null : Number(form.sellingPrice) })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Product save nahi hua.");
      resetForm(); setNotice(editing ? "Product update ho gaya." : "Naya product add ho gaya."); await load();
    } catch (e2) { setError(e2.message || "Product save nahi hua."); }
    finally { setSaving(false); }
  }
  async function remove(item) {
    if (!window.confirm(`“${item.name}” ko permanently delete karna hai?`)) return;
    setError(""); setNotice("");
    try {
      const response = await fetch(apiUrl(`/api/products/${item._id}`), { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.message || "Delete failed.");
      setNotice("Product delete ho gaya."); if (editing === item._id) resetForm(); await load();
    } catch (e) { setError(e.message || "Delete failed."); }
  }

  return <section className="admin-products-page">
    <header className="admin-products-head"><div><span>G2G SERVICES · INVENTORY</span><h1>Product Management</h1><p>Yahin se products, prices aur customer-facing discounts manage karein.</p></div><button className="ap-refresh" onClick={load} disabled={loading}><FaSyncAlt /> Refresh</button></header>
    {error && <div className="ap-alert ap-error" role="alert">{error}</div>}{notice && <div className="ap-alert ap-success" role="status">{notice}</div>}
    <ProductBulkImport token={token} onImported={load} />
    <form className="ap-form" onSubmit={save}>
      <div className="ap-form-title"><div><span>{editing ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</span><h2>{editing ? "Product details update karein" : "Catalogue mein product add karein"}</h2></div><FaBoxOpen /></div>
      <div className="ap-fields">
        <label>Product name *<input required maxLength="180" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="e.g. 4MP Dome Camera" /></label>
        <label>SKU / Product code<input value={form.sku} onChange={e=>update("sku",e.target.value.toUpperCase())} placeholder="Optional for single product; required in bulk" /></label>
        <label>Brand<input value={form.brand} onChange={e=>update("brand",e.target.value)} placeholder="e.g. CP Plus" /></label>
        <label>Model number<input value={form.model} onChange={e=>update("model",e.target.value)} placeholder="Model / SKU" /></label>
        <label>Category *<select required value={form.category} onChange={e=>update("category",e.target.value)}>{["CCTV Surveillance","Access Control","Biometric","Networking","Fire Alarm","EPABX / Intercom","Power Backup","IT Hardware","Other"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>MRP (₹)<input type="number" min="0" step="0.01" value={form.mrp} onChange={e=>update("mrp",e.target.value)} placeholder="Optional" /></label>
        <label>Selling price (₹)<input type="number" min="0" step="0.01" value={form.sellingPrice} onChange={e=>update("sellingPrice",e.target.value)} placeholder="Optional" /></label>
        <label className="ap-wide">Product image URL / upload path (optional)<input type="text" value={form.image} onChange={e=>update("image",e.target.value)} placeholder="https://... — blank chhodenge to professional placeholder dikhega" /></label>
        <label className="ap-wide">Official catalog / datasheet PDF URL / upload path (optional)<input type="text" value={form.catalogPdf} onChange={e=>update("catalogPdf",e.target.value)} placeholder="https://... or uploaded PDF path" /></label>
        <label className="ap-wide">Description<textarea rows="3" value={form.description} onChange={e=>update("description",e.target.value)} placeholder="Product ki short details" /></label>
      </div>
      <div className="ap-form-bottom"><div className="ap-discount-preview">{discount > 0 ? <><strong>{discount}% OFF</strong><span>{money(form.mrp)} se {money(form.sellingPrice)}</span></> : <span>Price / discount optional hai</span>}</div><label className="ap-publish"><input type="checkbox" checked={form.isPublished} onChange={e=>update("isPublished",e.target.checked)} /> Website par customers ko dikhayein</label><div className="ap-actions"><button type="button" className="ap-cancel" onClick={resetForm}>Clear</button><button type="submit" className="ap-save" disabled={saving}><FaPlus /> {saving ? "Saving..." : editing ? "Save changes" : "Add product"}</button></div></div>
    </form>
    <section className="ap-inventory"><div className="ap-inventory-head"><div><span>YOUR INVENTORY</span><h2>Products <small>({items.length})</small></h2></div><p>Unpublished products customers ko nahi dikhte.</p></div>
      {loading ? <p className="ap-empty">Products load ho rahe hain…</p> : items.length === 0 ? <p className="ap-empty">Abhi koi admin-added product nahi hai. Upar form se pehla product add karein.</p> : <div className="ap-table-wrap"><table className="ap-table"><thead><tr><th>Product</th><th>MRP</th><th>Selling price</th><th>Discount</th><th>Visibility</th><th>Actions</th></tr></thead><tbody>{items.map(item=>{const off=item.mrp>0&&item.sellingPrice!=null?Math.max(0,Math.round((item.mrp-item.sellingPrice)/item.mrp*100)):0;return <tr key={item._id}><td><strong>{item.name}</strong><small>{[item.brand,item.model,item.category].filter(Boolean).join(" · ")}</small></td><td>{money(item.mrp)}</td><td>{money(item.sellingPrice)}</td><td>{off>0?<b className="ap-off">{off}% OFF</b>:"—"}</td><td><span className={item.isPublished?"ap-visible":"ap-hidden"}>{item.isPublished?"Published":"Hidden"}</span></td><td><div className="ap-row-actions"><button onClick={()=>startEdit(item)} aria-label="Edit product"><FaEdit /></button><button className="ap-delete" onClick={()=>remove(item)} aria-label="Delete product"><FaTrash /></button></div></td></tr>})}</tbody></table></div>}
    </section>
  </section>;
}
