import "./Products.css";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaSlidersH, FaRedoAlt, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import products from "../data/products";

const cameras = products.filter((p) => p.category === "CCTV Surveillance" && p.model);
const unique = (list, key) => ["All", ...Array.from(new Set(list.map((x) => x[key]).filter(Boolean))).sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}))];

function SelectBox({ label, value, onChange, options }) {
  return <label className="catalog-select-wrap"><span>{label}</span><span className="catalog-select-control"><select value={value} onChange={(e)=>onChange(e.target.value)}>{options.map((x)=><option key={x} value={x}>{x === "All" ? `All ${label}` : x}</option>)}</select><FaChevronDown /></span></label>;
}

export default function Products() {
  const [params] = useSearchParams();
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState(params.get("category")||"All");
  const [brand,setBrand]=useState("All");
  const [type,setType]=useState("All");
  const [resolution,setResolution]=useState("All");
  const [series,setSeries]=useState("All");
  const [mobileFilters,setMobileFilters]=useState(false);
  const categories=useMemo(()=>unique(products,"category"),[]);
  const brands=useMemo(()=>unique(cameras,"brand"),[]);
  const types=useMemo(()=>unique(cameras,"cameraType"),[]);
  const resolutions=useMemo(()=>unique(cameras,"resolution"),[]);
  const seriesList=useMemo(()=>unique(cameras,"subCategory"),[]);
  const filtered=useMemo(()=>{const q=search.trim().toLowerCase();return products.filter(p=>{
    const text=[p.name,p.model,p.brand,p.category,p.subCategory,p.cameraType,p.resolution].filter(Boolean).join(" ").toLowerCase();
    return (category==="All"||p.category===category)&&(brand==="All"||p.brand===brand)&&(type==="All"||p.cameraType===type)&&(resolution==="All"||p.resolution===resolution)&&(series==="All"||p.subCategory===series)&&(!q||text.includes(q));
  });},[search,category,brand,type,resolution,series]);
  const reset=()=>{setSearch("");setCategory("All");setBrand("All");setType("All");setResolution("All");setSeries("All");};
  const changeCategory=(v)=>{setCategory(v);if(v!=="CCTV Surveillance"){setBrand("All");setType("All");setResolution("All");setSeries("All");}};
  return <section className="products-page"><div className="catalog-container">
    <header className="products-heading"><span>G2G SERVICES PRODUCT CATALOGUE</span><h1>Professional IT, CCTV & Security Products</h1><p>Find the right product by category, brand, model, camera type and resolution. Open technical details and manufacturer specifications from one professional catalogue.</p></header>
    <div className="catalog-stats"><div><strong>{products.length}</strong><span>Total Products</span></div><div><strong>{cameras.length}</strong><span>Camera Models</span></div><div><strong>{new Set(cameras.map(p=>p.brand)).size}</strong><span>Camera Brands</span></div><div><strong>{categories.length-1}</strong><span>Categories</span></div></div>
    <div className="catalog-toolbar"><div className="products-search"><FaSearch/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search model number, product, brand or category..."/></div><button className="filter-toggle" onClick={()=>setMobileFilters(v=>!v)}><FaSlidersH/> Filters</button><button className="reset-filter" onClick={reset}><FaRedoAlt/> Reset</button></div>
    <div className={`catalog-layout ${mobileFilters?"filters-open":""}`}>
      <aside className="catalog-sidebar"><div className="sidebar-heading"><div><span>FILTER PRODUCTS</span><h2>Refine your search</h2></div><FaSlidersH/></div>
        <SelectBox label="Category" value={category} onChange={changeCategory} options={categories}/>
        {category==="CCTV Surveillance"&&<><SelectBox label="Brand" value={brand} onChange={setBrand} options={brands}/><SelectBox label="Camera Type" value={type} onChange={setType} options={types}/><SelectBox label="Resolution" value={resolution} onChange={setResolution} options={resolutions}/><SelectBox label="Series / Type" value={series} onChange={setSeries} options={seriesList}/></>}
        <button className="sidebar-reset" onClick={reset}>Clear all filters</button>
      </aside>
      <main className="catalog-results"><div className="results-header"><div><span>CATALOG RESULTS</span><h2>{filtered.length} products available</h2></div>{category==="CCTV Surveillance"&&<strong>{filtered.filter(p=>p.model).length} camera models matched</strong>}</div>
        {filtered.length?<div className="products-grid">{filtered.map(p=><article className="product-card" key={p.id}>
          <div className="product-card-image"><span className="product-category-badge">{p.cameraType||p.category}</span><img src={p.image} alt={`${p.brand} ${p.model||p.name}`} loading="lazy"/></div>
          <div className="product-card-body"><div className="product-card-meta"><span className="product-brand">{p.brand}</span>{p.resolution&&<span>{p.resolution}</span>}</div>{p.model&&<small className="product-model">{p.model}</small>}<h3>{p.name}</h3><p>{p.description}</p><div className="product-spec-chips">{p.cameraType&&<span>{p.cameraType}</span>}{p.irDistance&&<span>IR {p.irDistance}</span>}{p.poe&&<span>PoE</span>}</div><div className="product-card-buttons"><Link to={`/products/${p.id}`} className="product-details-btn">View Details</Link>{(p.datasheetUrl||p.datasheet)&&<a className="product-datasheet-btn" href={p.datasheetUrl||p.datasheet} target="_blank" rel="noopener noreferrer">Official Specs <FaExternalLinkAlt/></a>}</div></div>
        </article>)}</div>:<div className="no-products"><h3>No products found</h3><p>Try another model, brand, category or filter combination.</p><button onClick={reset}>View All Products</button></div>}
      </main>
    </div>
  </div></section>;
}
