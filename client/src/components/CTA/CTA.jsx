import "./CTA.css";

import {
  FaArrowRight,
  FaPhoneAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="g2g-cta">

      <div className="g2g-cta-container">

        <div className="g2g-cta-content">

          <span className="g2g-cta-label">
            LET'S WORK TOGETHER
          </span>

          <h2>
            Ready to build a
            <br />
            <span>smarter infrastructure?</span>
          </h2>

          <p>
            Talk to our team about your IT,
            networking, surveillance and security
            requirements.
          </p>

        </div>


        <div className="g2g-cta-actions">

          <Link
            to="/contact"
            className="g2g-cta-primary"
          >
            Contact Us

            <FaArrowRight />
          </Link>


          <a
            href="tel:+917080010039"
            className="g2g-cta-phone"
          >
            <FaPhoneAlt />

            +91 70800 10039
          </a>

        </div>

      </div>

    </section>
  );
}

export default CTA;