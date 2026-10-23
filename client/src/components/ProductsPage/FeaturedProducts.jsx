import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  return (
    <section className="g2g-featured-products">
      <div className="g2g-featured-container">
        <div className="g2g-featured-heading">
          <div>
            <span className="g2g-section-label">OUR PRODUCTS</span>
            <h2>
              Technology solutions.
              <br />
              <span>Built for business.</span>
            </h2>
          </div>

          <div className="g2g-featured-intro">
            <p>
              Explore IT, security and infrastructure products
              available in the G2G Services catalogue.
            </p>
            <Link to="/products" className="g2g-featured-all">
              View All Products →
            </Link>
          </div>
        </div>

        <div className="g2g-featured-bottom">
          <span>Need a complete IT or security solution?</span>
          <Link to="/contact">Talk to our team →</Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
