import { useParams, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductDetail from "../components/ProductsPage/ProductDetail";

import products from "../data/products";

function ProductDetailPage() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <Navbar />

      <ProductDetail product={product} />

      <Footer />
    </>
  );
}

export default ProductDetailPage;