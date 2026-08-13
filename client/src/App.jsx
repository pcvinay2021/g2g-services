import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContactEnquiries from "./pages/ContactEnquiries";
import CareerApplications from "./pages/CareerApplications";
import AdminRoute from "./components/AdminRoute";
import SEO from "./components/SEO";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <SEO />
      {!isAdminRoute && <Navbar />}

      <main className={isAdminRoute ? "g2g-admin-main" : "g2g-main"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/contacts" element={<ContactEnquiries />} />
            <Route path="/admin/careers" element={<CareerApplications />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
