import "./Products.css";
import "./category-sections.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBoxOpen, FaArrowRight } from "react-icons/fa";
import { apiUrl } from "../config/api";
const catalogProducts = [];

const CATEGORIES = ["CCTV Surveillance", "Access Control", "Biometric", "Networking", "Fire Alarm", "EPABX / Intercom", "Power Backup", "IT Hardware", "Other"];
const slugify = (value = "") => String(value).trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const money = (value) => Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const mediaUrl = (value) => value && String(value).startsWith("/") ? apiUrl(value) : value;

function displayCategory(product) {
  const raw = String(product.category || "Other").trim().toLowerCase();
  const text = `${raw} ${product.name || ""} ${product.model || ""}`.toLowerCase();
  const exact = CATEGORIES.find((c) => c.toLowerCase() === raw);
  if (exact) return exact;
  if (/cctv|surveillance|camera|nvr|dvr/.test(text)) return "CCTV Surveillance";
  if (/biometric|attendance|fingerprint|face recognition/.test(text) || raw === "access & attendance") return "Biometric";
  if (/fire|safety|alarm/.test(text)) return "Fire Alarm";
  if (/epabx|intercom|communication/.test(text)) return "EPABX / Intercom";
  if (/network|router|switch|cisco/.test(text)) return "Networking";
  if (/ups|power protection|power backup/.test(text)) return "Power Backup";
  if (/server|storage|data center|laptop|desktop|it infrastructure|it products/.test(text)) return "IT Hardware";
  if (/access control|security|barrier|entrance automation/.test(text)) return "Access Control";
  if (CATEGORIES.some((c) => c.toLowerCase() === raw)) return CATEGORIES.find((c) => c.toLowerCase() === raw);
  return "Other";
}
function keyFor(p) { return `${String(p.brand || "").trim().toLowerCase()}|${String(p.model || p.name || "").trim().toLowerCase()}`; }
function combineProducts(apiItems) {
  const staticItems = [];
  const seen = new Set(staticItems.map(keyFor));
  const api = apiItems.map((p) => ({ ...p, category: displayCategory(p), _catalogSource: "admin" }));
  const merged = [...staticItems];
  for (const p of api) { const key = keyFor(p); if (!seen.has(key)) { merged.push(p); seen.add(key); } }
  return merged;
}
function ProductCard({ product }) {
  const id = product.id || product._id;
  const name = product.name || product.model || "G2G Product";
  const mrp = Number(product.mrp), sellingPrice = Number(product.sellingPrice);
  const hasMrp = product.mrp !== "" && product.mrp != null && Number.isFinite(mrp) && mrp > 0;
  const hasSelling = product.sellingPrice !== "" && product.sellingPrice != null && Number.isFinite(sellingPrice) && sellingPrice > 0;
  const discount = hasMrp && hasSelling && mrp > sellingPrice ? Math.round(((mrp-sellingPrice)/mrp)*100) : 0;
  return <article className="product-card" key={id || `${product.category}-${name}`}>
    <div className="product-card-image"><span className="product-category-badge">{product.category || "G2G Product"}</span>{product.image ? <img src={mediaUrl(product.image)} alt={`${product.brand || ""} ${name}`} loading="lazy" onError={(e) => { e.currentTarget.style.display="none"; }} /> : <div className="product-admin-placeholder"><FaBoxOpen /><span>G2G Product</span></div>}</div>
    <div className="product-card-body"><div className="product-card-meta"><span className="product-brand">{product.brand || "G2G Services"}</span>{product.model && <span>{product.model}</span>}</div><h3>{name}</h3>
      {(hasMrp || hasSelling) && <div className="catalog-price">{hasSelling && <strong>₹{money(sellingPrice)}</strong>}{hasMrp && hasSelling && mrp>sellingPrice && <><del>₹{money(mrp)}</del><b>{discount}% OFF</b></>}{!hasSelling && hasMrp && <span>MRP ₹{money(mrp)}</span>}</div>}
      <p>{product.description || "Contact G2G Services for specifications, availability and a suitable solution."}</p>
      <div className="product-card-buttons">{id ? <Link to={`/products/${id}`} className="product-details-btn">View Details</Link> : <Link to="/contact" className="product-details-btn">Enquire Now</Link>}{(product.catalogPdf || product.datasheetUrl || product.datasheet || product.officialUrl) && <a className="product-datasheet-btn" href={mediaUrl(product.catalogPdf || product.datasheetUrl || product.datasheet || product.officialUrl)} target="_blank" rel="noopener noreferrer">Product Specs <FaArrowRight /></a>}</div>
    </div>
  </article>;
}
export default function Products() {
  const [apiProducts, setApiProducts] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState(""); const [apiUnavailable, setApiUnavailable] = useState(false);
  useEffect(() => { let active=true; fetch(apiUrl("/api/products")).then(r=>{if(!r.ok) throw new Error("API unavailable"); return r.json();}).then(result=>{if(active){const items=Array.isArray(result)?result:(result?.data||result?.products||[]);setApiProducts(items.filter(p=>p&&p.isPublished!==false));setApiUnavailable(false);}}).catch(()=>{if(active)setApiUnavailable(true);}).finally(()=>{if(active)setLoading(false);}); return ()=>{active=false;}; },[]);
  const products = useMemo(()=>combineProducts(apiProducts),[apiProducts]);
  const query=search.trim().toLowerCase();
  const groups=useMemo(()=>CATEGORIES.map(category=>{const matching=products.filter(p=>p.category===category);const filtered=query?matching.filter(p=>[p.name,p.model,p.brand,p.category,p.description].filter(Boolean).join(" ").toLowerCase().includes(query)):matching;return {category,products:filtered,total:matching.length};}).filter(g=>!query||g.products.length),[products,query]);
  const brands = new Set(products.map(p=>p.brand).filter(Boolean));
  return <section className="products-page"><div className="catalog-container">
    <header className="products-heading"><span>G2G SERVICES PRODUCT CATALOGUE</span><h1>Explore Products by Category</h1><p>Browse trusted IT, CCTV, access control, networking and security products. Each category shows a quick selection; choose “More Products” to open the complete category list.</p></header>
    <div className="catalog-stats"><div><strong>{products.length}</strong><span>Catalog Products</span></div><div><strong>{CATEGORIES.length}</strong><span>Categories</span></div><div><strong>{brands.size}</strong><span>Brands</span></div><div><strong>4</strong><span>Preview Products / Category</span></div></div>
    <div className="catalog-toolbar"><div className="products-search"><FaSearch/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, models, brands or categories..."/></div>{search&&<button className="reset-filter" onClick={()=>setSearch("")}>Clear Search</button>}</div>
    {loading && products.length===catalogProducts.length ? <div className="no-products"><h3>Loading latest Admin products…</h3><p>Products sirf Admin Portal aur database se load honge.</p></div> : null}
    {apiUnavailable && <div className="catalog-api-note">Admin product API abhi available nahi hai. Sirf Admin se database mein add kiye gaye products yahan dikhte hain.</div>}
    {groups.length===0 ? <div className="no-products"><h3>No matching products found</h3><p>Try another search term.</p><button onClick={()=>setSearch("")}>Show Categories</button></div> : <div className="category-sections">{groups.map(({category,products:items,total})=><section className="category-preview" key={category}><div className="category-preview-heading"><div><span>SHOP BY CATEGORY</span><h2>{category}</h2><p>{total} product{total===1?"":"s"} in this category</p></div><Link to={`/products/category/${slugify(category)}`} className="category-more-link">More Products <FaArrowRight/></Link></div><div className="products-grid category-products-grid">{items.slice(0,4).map(p=><ProductCard key={p.id||p._id||keyFor(p)} product={p}/>)}</div></section>)}</div>}
  </div></section>;
}
