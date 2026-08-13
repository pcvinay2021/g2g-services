import "./FeaturedProducts.css";

import camera from "../../assets/products/camera.png";
import nvr from "../../assets/products/nvr.png";
import server from "../../assets/products/server.png";
import biometric from "../../assets/products/biometric.png";

import { Link } from "react-router-dom";

const products = [
  {
    id: "ai-ip-camera",
    image: camera,
    brand: "CP Plus",
    title: "AI IP Camera",
    description:
      "Professional IP surveillance camera with smart analytics."
  },
  {
    id: "32-channel-nvr",
    image: nvr,
    brand: "Hikvision",
    title: "32 Channel NVR",
    description:
      "Reliable network video recording solution for enterprise surveillance."
  },
  {
    id: "poweredge-server",
    image: server,
    brand: "Dell",
    title: "PowerEdge Server",
    description:
      "Enterprise server solution for demanding IT infrastructure."
  },
  {
    id: "biometric-device",
    image: biometric,
    brand: "TimeWatch",
    title: "Biometric Device",
    description:
      "Smart face and fingerprint attendance solution."
  }
];

function FeaturedProducts() {
  return (
    <section className="g2g-featured-products">

      <div className="g2g-featured-container">

        {/* ================= HEADING ================= */}

        <div className="g2g-featured-heading">

          <div>

            <span className="g2g-section-label">
              FEATURED PRODUCTS
            </span>

            <h2>
              Trusted technology.
              <br />
              <span>Built for business.</span>
            </h2>

          </div>

          <div className="g2g-featured-intro">

            <p>
              Explore professional products from trusted
              technology brands for IT, security and
              infrastructure requirements.
            </p>

            <Link
              to="/products"
              className="g2g-featured-all"
            >
              View All Products →
            </Link>

          </div>

        </div>


        {/* ================= PRODUCT GRID ================= */}

        <div className="g2g-featured-grid">

          {products.map((product) => (

            <article
              className="g2g-featured-card"
              key={product.id}
            >

              <div className="g2g-featured-image">

                <img
                  src={product.image}
                  alt={product.title}
                />

              </div>


              <div className="g2g-featured-info">

                <span className="g2g-featured-brand">
                  {product.brand}
                </span>

                <h3>
                  {product.title}
                </h3>

                <p>
                  {product.description}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="g2g-featured-link"
                >
                  View Details →
                </Link>

              </div>

            </article>

          ))}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="g2g-featured-bottom">

          <span>
            Need a complete IT or security solution?
          </span>

          <Link to="/contact">
            Talk to our team →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;