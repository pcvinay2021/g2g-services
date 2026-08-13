import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
  FaFacebookF,
  FaLinkedinIn
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="g2g-footer">

      {/* MAIN FOOTER */}

      <div className="footer-main">

        <div className="footer-container footer-grid">

          {/* BRAND */}

          <div className="footer-brand">

            <Link to="/" className="footer-logo">
              <img
                src="src/assets/logo/g2g-logo-footer.png"
                alt="G2G Services"
              />
            </Link>

            <p>
              Technology, infrastructure and security
              solutions designed for reliable
              real-world requirements.
            </p>

            <div className="footer-social">

              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a
                href="https://wa.me/917080010039"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>


          {/* QUICK LINKS */}

<div className="footer-column footer-links-wide">

  <h3>Quick Links</h3>

  <div className="footer-link-columns">

    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/services">Services</Link>
      <Link to="/products">Products</Link>
    </div>

    <div>
      <Link to="/projects">Projects</Link>
      <Link to="/careers">Careers</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/contact">Contact</Link>
    </div>

  </div>

</div>


{/* SERVICES */}

<div className="footer-column footer-links-wide">

  <h3>Services</h3>

  <div className="footer-link-columns">

    <div>
      <Link to="/services">CCTV & Surveillance</Link>
      <Link to="/services">DVR / NVR</Link>
      <Link to="/services">Networking</Link>
      <Link to="/services">Servers</Link>
    </div>

    <div>
      <Link to="/services">Access Control</Link>
      <Link to="/services">Storage</Link>
      <Link to="/services">Biometric</Link>
      <Link to="/services">Automation</Link>
    </div>

  </div>

</div>
          {/* CONTACT */}

          <div className="footer-contact">

            <h3>Get In Touch</h3>

            <a href="tel:+917080010039">
              <FaPhone />
              <span>+91 70800 10039</span>
            </a>

            <a href="mailto:info@g2gservices.in">
              <FaEnvelope />
              <span>info@g2gservices.in</span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=India"
              target="_blank"
              rel="noreferrer"
            >
              <FaMapMarkerAlt />
              <span>India</span>
            </a>

          </div>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        <div className="footer-container footer-bottom-inner">

          <span>
            © {new Date().getFullYear()} G2G Services.
            All Rights Reserved.
          </span>

          <div>

            <Link to="/contact">
              Privacy Policy
            </Link>

            <Link to="/contact">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>


      {/* WHATSAPP FLOAT */}

      <a
        href="https://wa.me/917080010039"
        className="footer-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

    </footer>
  );
}

export default Footer;