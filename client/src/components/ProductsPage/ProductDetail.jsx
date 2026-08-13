import "./ProductDetail.css";

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaDownload,
  FaEnvelope,
  FaCheckCircle,
  FaArrowLeft
} from "react-icons/fa";

import { Link } from "react-router-dom";

function ProductDetail({ product }) {

  if (!product) {
    return null;
  }

  return (
    <section className="product-detail">

      <div className="container">

        {/* ================= BREADCRUMB ================= */}

        <div className="product-breadcrumb">

          <Link to="/">Home</Link>

          <span>/</span>

          <Link to="/products">Products</Link>

          <span>/</span>

          {product.category}

          <span>/</span>

          {product.name}

        </div>


        {/* ================= BACK TO PRODUCTS ================= */}

        <Link
          to="/products"
          className="product-back-link"
        >

          <FaArrowLeft />

          Back to Products

        </Link>


        {/* ================= MAIN PRODUCT ================= */}

        <div className="product-detail-grid">

          {/* ================= PRODUCT IMAGE ================= */}

          <div className="product-detail-image">

            <div className="product-image-box">

              <img
                src={product.image}
                alt={product.name}
              />

            </div>

          </div>


          {/* ================= PRODUCT INFORMATION ================= */}

          <div className="product-detail-info">

            {/* BRAND */}

            <span className="product-brand">

              {product.brand}

            </span>


            {/* CATEGORY */}

            <span className="product-category-name">

              {product.category}

            </span>


            {/* PRODUCT NAME */}

            <h1>

              {product.name}

            </h1>


            {/* DESCRIPTION */}

            <p className="product-description">

              {product.description}

            </p>


            {/* ================= FEATURES ================= */}

            <div className="product-features">

              {product.features?.map(
                (feature, index) => (

                  <div
                    className="product-feature"
                    key={index}
                  >

                    <FaCheckCircle />

                    <span>

                      {feature}

                    </span>

                  </div>

                )
              )}

            </div>


            {/* ================= PRIMARY ACTIONS ================= */}

            <div className="product-actions">

              {/* CALL */}

              <a
                href="tel:+917080010039"
                className="product-call-btn"
              >

                <FaPhoneAlt />

                Call Now

              </a>


              {/* WHATSAPP */}

              <a
                href="https://wa.me/917080010039"
                target="_blank"
                rel="noreferrer"
                className="product-whatsapp-btn"
              >

                <FaWhatsapp />

                WhatsApp Inquiry

              </a>

            </div>


            {/* ================= SECONDARY ACTIONS ================= */}

            <div className="product-secondary-actions">

              {/* DATASHEET */}

              {product.datasheet ? (

                <a
                  href={product.datasheet}
                  target="_blank"
                  rel="noreferrer"
                  className="product-inquiry-btn"
                >

                  <FaDownload />

                  Download Datasheet

                </a>

              ) : (

                <button
                  type="button"
                  className="product-inquiry-btn"
                  disabled
                >

                  <FaDownload />

                  Datasheet Coming Soon

                </button>

              )}


              {/* INQUIRY */}

              <a
                href={`mailto:info@g2gservices.in?subject=Product Inquiry - ${encodeURIComponent(
                  product.name
                )}`}
                className="product-inquiry-btn"
              >

                <FaEnvelope />

                Send Inquiry

              </a>

            </div>

          </div>

        </div>


        {/* ================= SPECIFICATIONS ================= */}

        <div className="product-specification-section">

          <div className="specification-heading">

            <span>

              TECHNICAL INFORMATION

            </span>

            <h2>

              Product Specifications

            </h2>

          </div>


          <div className="specification-table">

            {product.specifications?.map(
              (spec, index) => (

                <div
                  className="spec-row"
                  key={index}
                >

                  <div className="spec-title">

                    {spec[0]}

                  </div>

                  <div className="spec-value">

                    {spec[1]}

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* ================= INQUIRY CTA ================= */}

        <div className="product-inquiry-banner">

          <div>

            <span>

              NEED MORE INFORMATION?

            </span>

            <h2>

              Interested in {product.name}?

            </h2>

            <p>

              Contact G2G Services for pricing,
              availability and project requirements.

            </p>

          </div>


          <div className="product-inquiry-banner-buttons">

            <a
              href={`mailto:info@g2gservices.in?subject=Inquiry - ${encodeURIComponent(
                product.name
              )}`}
              className="banner-email-btn"
            >

              <FaEnvelope />

              Send Inquiry

            </a>


            <a
              href="https://wa.me/917080010039"
              target="_blank"
              rel="noreferrer"
              className="banner-whatsapp-btn"
            >

              <FaWhatsapp />

              WhatsApp Us

            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetail;