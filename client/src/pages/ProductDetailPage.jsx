import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

import ProductDetail from "../components/ProductsPage/ProductDetail";



function ProductDetailPage() {

  const { id } = useParams();

  const staticProduct = null;
  const [dynamicProduct, setDynamicProduct] = useState(null);
  const [checked, setChecked] = useState(Boolean(staticProduct));
  useEffect(() => {
    setDynamicProduct(null);
    setChecked(Boolean(staticProduct));
    if (staticProduct) return;
    let alive = true;
    fetch(apiUrl("/api/products")).then(r => r.ok ? r.json() : Promise.reject()).then(result => {
      if (alive && result.success) setDynamicProduct((result.data || []).find(item => (item.id || item._id) === id) || null);
    }).catch(() => {}).finally(() => { if (alive) setChecked(true); });
    return () => { alive = false; };
  }, [id]);
  const product = staticProduct || dynamicProduct;
  if (!product && !checked) return <div style={{padding:"100px 20px",textAlign:"center"}}>Loading product…</div>;
  if (!product) return <Navigate to="/products" replace />;

  return <ProductDetail product={product} />;
}

export default ProductDetailPage;