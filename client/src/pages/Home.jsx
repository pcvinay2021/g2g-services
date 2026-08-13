import Navbar from "../components/Navbar/Navbar";
import ProductShowcase from "../components/ProductShowcase/ProductShowcase";
import Hero from "../components/Hero/Hero";
import Solutions from "../components/Solutions/Solutions";
import FeaturedProducts from "../components/ProductsPage/FeaturedProducts";
import Industries from "../components/Industries/Industries";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import TrustedBrands from "../components/TrustedBrands/TrustedBrands";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
  <Navbar />

  <div className="page-top-space">

  </div>

      <ProductShowcase />
      <Hero />
      <Solutions />
      <FeaturedProducts />
      <Industries />
      <FeaturedProjects />
      <TrustedBrands />
      <CTA />
             
      
    </>
  );
}
export default Home;