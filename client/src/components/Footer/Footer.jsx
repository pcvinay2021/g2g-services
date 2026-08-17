import "./Footer.css";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn
} from "react-icons/fa";

import {
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import footerLogo from "../../assets/logo/g2g-logo-footer.png";


function Footer() {

  // ==========================================
  // FLOATING WHATSAPP POSITION
  // ==========================================

  const [whatsappBottom, setWhatsappBottom] = useState(() => {

    const savedPosition =
      localStorage.getItem("g2g-whatsapp-bottom");

    return savedPosition
      ? Number(savedPosition)
      : 24;

  });

  const [dragging, setDragging] = useState(false);


  // ==========================================
  // SAVE WHATSAPP POSITION
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "g2g-whatsapp-bottom",
      whatsappBottom
    );

  }, [whatsappBottom]);


  // ==========================================
  // DRAG FLOATING WHATSAPP
  // ==========================================

  const handlePointerDown = (e) => {

    e.preventDefault();

    setDragging(true);

    const startY = e.clientY;
    const startBottom = whatsappBottom;


    const handlePointerMove = (moveEvent) => {

      const difference =
        startY - moveEvent.clientY;

      let newBottom =
        startBottom + difference;


      const maxBottom =
        window.innerHeight - 70;


      newBottom = Math.max(
        10,
        Math.min(
          newBottom,
          maxBottom
        )
      );


      setWhatsappBottom(newBottom);

    };


    const handlePointerUp = () => {

      setDragging(false);

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

    };


    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

  };


  return (

    <footer className="g2g-footer">


      {/* ==================================================
          MAIN FOOTER
      ================================================== */}

      <div className="footer-main">

        <div className="footer-container footer-grid">


          {/* ==================================================
              BRAND
          ================================================== */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >

              <img
                src={footerLogo}
                alt="G2G Services"
              />

            </Link>


            <p>
              Technology, infrastructure and security
              solutions designed for reliable
              real-world requirements.
            </p>

          </div>


          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <div className="footer-column footer-links-wide">

            <h3>
              Quick Links
            </h3>


            <div className="footer-link-columns">

              <div>

                <Link to="/">
                  Home
                </Link>

                <Link to="/about">
                  About Us
                </Link>

                <Link to="/services">
                  Services
                </Link>

                <Link to="/products">
                  Products
                </Link>

              </div>


              <div>

                <Link to="/projects">
                  Projects
                </Link>

                <Link to="/careers">
                  Careers
                </Link>

                <Link to="/gallery">
                  Gallery
                </Link>

                <Link to="/contact">
                  Contact
                </Link>

              </div>

            </div>

          </div>


          {/* ==================================================
              SERVICES
          ================================================== */}

          <div className="footer-column footer-links-wide">

            <h3>
              Services
            </h3>


            <div className="footer-link-columns">

              <div>

                <Link to="/services">
                  CCTV & Surveillance
                </Link>

                <Link to="/services">
                  DVR / NVR
                </Link>

                <Link to="/services">
                  Networking
                </Link>

                <Link to="/services">
                  Servers
                </Link>

              </div>


              <div>

                <Link to="/services">
                  Access Control
                </Link>

                <Link to="/services">
                  Storage
                </Link>

                <Link to="/services">
                  Biometric
                </Link>

                <Link to="/services">
                  Automation
                </Link>

              </div>

            </div>

          </div>


          {/* ==================================================
              CONTACT
          ================================================== */}

          <div className="footer-contact">

            <h3>
              Get In Touch
            </h3>


            <a href="tel:+917080010039">

              <FaPhone />

              <span>
                +91 70800 10039
              </span>

            </a>


            <a href="mailto:info@g2gservices.in">

              <FaEnvelope />

              <span>
                info@g2gservices.in
              </span>

            </a>


            <a
              href="https://www.google.com/maps/search/?api=1&query=India"
              target="_blank"
              rel="noreferrer"
            >

              <span className="footer-location-icon">
                ●
              </span>

              <span>
                India
              </span>

            </a>

          </div>

        </div>

      </div>


      {/* ==================================================
          COPYRIGHT / SOCIAL / LEGAL ROW
      ================================================== */}

      <div className="footer-bottom">

        <div className="footer-container footer-bottom-inner">


          {/* ==============================================
              SOCIAL MEDIA — LEFT
          ============================================== */}

          <div className="footer-bottom-social">


            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>


            <a
              href="#"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>


            <a
              href="#"
              aria-label="X Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>


            <a
              href="#"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>


            <a
              href="https://wa.me/917080010039"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>

          </div>


          {/* ==============================================
              COPYRIGHT — CENTER
          ============================================== */}

          <div className="footer-copyright">

            © {new Date().getFullYear()} G2G Services.
            All Rights Reserved.

          </div>


          {/* ==============================================
              LEGAL LINKS — RIGHT
          ============================================== */}

          <div className="footer-legal">

            <Link to="/contact">
              Privacy Policy
            </Link>

            <Link to="/contact">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>


      {/* ==================================================
          FLOATING WHATSAPP
      ================================================== */}

      <a
        href="https://wa.me/917080010039"
        className={`footer-whatsapp ${
          dragging
            ? "is-dragging"
            : ""
        }`}
        aria-label="Chat on WhatsApp"

        style={{
          bottom:
            `${whatsappBottom}px`,

          touchAction:
            "none"
        }}

        onPointerDown={
          handlePointerDown
        }
      >

        <FaWhatsapp />

      </a>


    </footer>

  );

}


export default Footer;