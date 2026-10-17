import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo from "../../assets/logo/g2g-logo.png";

function Navbar() {

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {

    let lastScrollY = window.scrollY;

    const handleScroll = () => {

      const currentScrollY = window.scrollY;

      // Top of page
      if (currentScrollY <= 10) {
        setShowNavbar(true);
      }

      // Scrolling down
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }

      // Scrolling up
      else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  return (
    <header
      className={`g2g-navbar ${
        showNavbar ? "g2g-navbar-visible" : "g2g-navbar-hidden"
      }`}
    >

      <div className="g2g-navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="g2g-navbar-logo"
        >
          <img
            src={logo}
            alt="G2G Services"
          />
        </Link>


        {/* NAVIGATION */}

        <nav className="g2g-navbar-menu">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/products">
            Products
          </Link>

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

        </nav>


        {/* CTA */}

        <Link
          to="/contact"
          className="g2g-navbar-button"
        >
          Get Started
        </Link>

      </div>

    </header>
  );
}

export default Navbar;