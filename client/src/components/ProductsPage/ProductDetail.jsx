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
import { apiUrl } from "../../config/api";
const mediaUrl = (value) => value && String(value).startsWith("/") ? apiUrl(value) : value;

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

              {product.image ? <img src={mediaUrl(product.image)} alt={product.name} onError={e => { e.currentTarget.style.display = "none"; }} /> : <div className="product-detail-placeholder"><span>G2G</span><small>Product image coming soon</small></div>}

            </div>

            {product.imageStatus ? (
              <small style={{ display: "block", marginTop: "8px", opacity: 0.7 }}>
                {product.imageStatus}
              </small>
            ) : null}

          </div>


          {/* ================= PRODUCT INFORMATION ================= */}

          <div className="product-detail-info">

            {/* BRAND */}

            <span className="product-brand">

              {product.brand}

            </span>


            {/* MODEL */}

            {product.model ? (

              <span className="product-category-name">
                Model: {product.model}
              </span>

            ) : null}

            {/* CATEGORY */}

            <span className="product-category-name">

              {product.category}

            </span>


            {/* PRODUCT NAME */}

            <h1>

              {product.name}

            </h1>

            {(product.mrp != null || product.sellingPrice != null) && (
              <div className="product-detail-pricing">
                {product.sellingPrice != null && <strong>₹{Number(product.sellingPrice).toLocaleString("en-IN")}</strong>}
                {product.mrp != null && product.sellingPrice != null && Number(product.mrp) > Number(product.sellingPrice) && <><del>₹{Number(product.mrp).toLocaleString("en-IN")}</del><b>{Math.round((Number(product.mrp) - Number(product.sellingPrice)) / Number(product.mrp) * 100)}% OFF</b></>}
                {product.sellingPrice == null && product.mrp != null && <span>MRP ₹{Number(product.mrp).toLocaleString("en-IN")}</span>}
              </div>
            )}


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
                href="tel:+919235018121"
                className="product-call-btn"
              >

                <FaPhoneAlt />

                Call Now

              </a>


              {/* WHATSAPP */}

              <a
                href="https://wa.me/919235018121"
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

              {/* OFFICIAL MANUFACTURER SOURCE */}

              {product.officialUrl ? (

                <a
                  href={product.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="product-inquiry-btn"
                >

                  Official Product Page

                </a>

              ) : null}

              {/* DATASHEET */}

              {product.catalogPdf || product.datasheetUrl || product.datasheet ? (

                <a
                  href={mediaUrl(product.catalogPdf || product.datasheetUrl || product.datasheet)}
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
              href="https://wa.me/919235018121"
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