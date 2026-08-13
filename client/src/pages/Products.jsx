import "./Products.css";

import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import camera from "../assets/products/camera.png";
import nvr from "../assets/products/nvr.png";
import dvr from "../assets/products/dvr.png";
import server from "../assets/products/server.png";
import switchImg from "../assets/products/cisco-switch.png";
import biometric from "../assets/products/biometric.png";
import barrier from "../assets/products/barrier.png";
import storage from "../assets/products/storage.png";
import router from "../assets/products/router.png";
import fireAlarm from "../assets/products/fire-alarm.png";
import accessControl from "../assets/products/access-control.png";
import ups from "../assets/products/ups.png";
// =====================================================
// PRODUCTS DATA
// =====================================================

const products = [
  {
    id: "camera",
    image: camera,
    brand: "CP Plus",
    name: "4MP AI Network Bullet Camera",
    category: "CCTV Surveillance",
    description:
      "Professional AI-enabled network bullet camera for enterprise security and surveillance.",
    datasheet: "/datasheets/camera.pdf"
  },

  {
    id: "nvr",
    image: nvr,
    brand: "Hikvision",
    name: "32 Channel AI Network Video Recorder",
    category: "DVR / NVR",
    description:
      "Enterprise network video recorder for centralized IP camera recording and monitoring.",
    datasheet: "/datasheets/nvr.pdf"
  },

  {
    id: "dvr",
    image: dvr,
    brand: "CP Plus",
    name: "AI HD Digital Video Recorder",
    category: "DVR / NVR",
    description:
      "Professional HD digital video recorder for CCTV recording and monitoring.",
    datasheet: "/datasheets/dvr.pdf"
  },

  {
    id: "server",
    image: server,
    brand: "Dell",
    name: "PowerEdge Enterprise Server",
    category: "Server",
    description:
      "Enterprise rack server for virtualization, applications and data center infrastructure.",
    datasheet: "/datasheets/server.pdf"
  },

  {
    id: "switch",
    image: switchImg,
    brand: "Cisco",
    name: "Managed Enterprise Network Switch",
    category: "Enterprise Networking",
    description:
      "Managed enterprise switch designed for secure and high-performance networking.",
    datasheet: "/datasheets/switch.pdf"
  },

  {
    id: "biometric",
    image: biometric,
    brand: "TimeWatch",
    name: "Face & Fingerprint Biometric Device",
    category: "Biometric",
    description:
      "Advanced biometric attendance and access management solution.",
    datasheet: "/datasheets/biometric.pdf"
  },

  {
    id: "barrier",
    image: barrier,
    brand: "FAAC",
    name: "Automatic Boom Barrier",
    category: "Boom Barrier",
    description:
      "Automatic vehicle access barrier for offices, industries and parking facilities.",
    datasheet: "/datasheets/barrier.pdf"
  },

  {
    id: "storage",
    image: storage,
    brand: "Dell",
    name: "Enterprise Storage Solution",
    category: "Storage",
    description:
      "Enterprise storage solution for backup, data protection and critical infrastructure.",
    datasheet: "/datasheets/storage.pdf"
  },

  {
    id: "router",
    image: router,
    brand: "Cisco",
    name: "Enterprise Network Router",
    category: "Enterprise Networking",
    description:
      "Enterprise routing solution for secure WAN and LAN connectivity.",
    datasheet: "/datasheets/router.pdf"
  },

  {
    id: "fire-alarm",
    image: fireAlarm,
    brand: "G2G Solutions",
    name: "Addressable Fire Alarm System",
    category: "Fire Alarm",
    description:
      "Professional fire detection and alarm solution for commercial and industrial premises.",
    datasheet: "/datasheets/fireAlarm.pdf"
  },

  {
    id: "access-control",
    image: accessControl,
    brand: "G2G Services",
    name: "Access Control System",
    category: "Access Control",
    description:
      "Complete access control solution for secure entry management.",
    datasheet: "/datasheets/accessControl.pdf"
  },

  {
    id: "ups",
    image: ups,
    brand: "APC",
    name: "Online UPS System",
    category: "UPS & Power",
    description:
      "Online UPS solution for servers, networking equipment and critical IT infrastructure.",
    datasheet: "/datasheets/ups.pdf"
  }
];


// =====================================================
// COMPONENT
// =====================================================

function Products() {

  const [searchParams] = useSearchParams();

  const categoryFromURL =
    searchParams.get("category");

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromURL || "All");


  // ===================================================
  // CATEGORY LIST
  // ===================================================

  const categories = [
    "All",
    "CCTV Surveillance",
    "DVR / NVR",
    "Enterprise Networking",
    "Server",
    "Storage",
    "Fire Alarm",
    "Access Control",
    "Biometric",
    "Boom Barrier",
    "UPS & Power"
  ];


  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchText =
        search.toLowerCase().trim();

      const searchMatch =
        !searchText ||
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.brand
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText);

      return categoryMatch && searchMatch;

    });

  }, [selectedCategory, search]);


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="products-page">

      <div className="container">


        {/* ============================================
            PAGE HEADER
        ============================================ */}

        <div className="products-heading">

          <span>OUR PRODUCTS</span>

          <h1>
            Enterprise IT & Security Products
          </h1>

          <p>
            Explore professional IT infrastructure,
            networking, surveillance, security and
            automation products from trusted brands.
          </p>

        </div>


        {/* ============================================
            SEARCH
        ============================================ */}

        <div className="products-search">

          <input
            type="text"
            placeholder="Search products, brands or categories..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* ============================================
            CATEGORY FILTER
        ============================================ */}

        <div className="products-filter">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* ============================================
            PRODUCT COUNT
        ============================================ */}

        <div className="products-count">

          Showing{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          products

        </div>


        {/* ============================================
            PRODUCTS GRID
        ============================================ */}

        {filteredProducts.length > 0 ? (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => (

                <div
                  className="product-card"
                  key={product.id}
                >


                  {/* IMAGE */}

                  <div className="product-card-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>


                  {/* BODY */}

                  <div className="product-card-body">

                    <span className="product-brand">
                      {product.brand}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>


                    {/* BUTTONS */}

                    <div className="product-card-buttons">

                      <Link
                        to={`/products/${product.id}`}
                        className="product-details-btn"
                      >
                        View Details
                      </Link>


                      <a
                        href={product.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-datasheet-btn"
                      >
                        Datasheet
                      </a>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          /* ==========================================
             NO PRODUCT
          ========================================== */

          <div className="no-products">

            <h3>
              No Products Found
            </h3>

            <p>
              Try another product name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              View All Products
            </button>

          </div>

        )}

      </div>

    </section>

  );

}

export default Products;