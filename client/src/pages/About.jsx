import "./About.css";

import {
  FaNetworkWired,
  FaShieldAlt,
  FaVideo,
  FaServer,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

import { Link } from "react-router-dom";

function About() {
  return (
    <main className="g2g-about-page">

      {/* =========================================
          ABOUT HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-container">

          <div className="about-hero-content">

            <span className="about-label">
              ABOUT G2G SERVICES
            </span>

            <h1>
              Technology that keeps
              <span> your business connected.</span>
            </h1>

            <p>
              G2G Services provides professional IT infrastructure,
              networking, surveillance, security and automation
              solutions for businesses, institutions and enterprise
              projects.
            </p>

            <div className="about-hero-buttons">

              <Link
                to="/services"
                className="about-primary-btn"
              >
                Explore Our Services
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="about-secondary-btn"
              >
                Talk to an Expert
              </Link>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="about-hero-card">

            <div className="about-card-top">
              <span>
                G2G SERVICES
              </span>

              <FaShieldAlt />
            </div>

            <h2>
              Secure.
              <br />
              Connected.
              <br />
              Reliable.
            </h2>

            <p>
              Integrated technology solutions designed
              for modern organizations.
            </p>

            <div className="about-card-line" />

            <div className="about-card-points">

              <span>
                <FaCheckCircle />
                IT Infrastructure
              </span>

              <span>
                <FaCheckCircle />
                Network Solutions
              </span>

              <span>
                <FaCheckCircle />
                CCTV & Security
              </span>

              <span>
                <FaCheckCircle />
                Automation
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <section className="about-intro">

        <div className="about-container about-intro-grid">

          <div className="about-section-heading">

            <span>
              WHO WE ARE
            </span>

            <h2>
              Building smarter
              <strong> technology environments.</strong>
            </h2>

          </div>


          <div className="about-intro-text">

            <p>
              G2G Services delivers technology solutions across
              IT infrastructure, networking, surveillance,
              enterprise security and automation.
            </p>

            <p>
              Our approach combines reliable products,
              professional implementation and practical
              project support to help organizations build
              secure and dependable technology environments.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          CORE SOLUTIONS
      ========================================= */}

      <section className="about-solutions">

        <div className="about-container">

          <div className="about-title-center">

            <span>
              OUR CAPABILITIES
            </span>

            <h2>
              What we bring to your project
            </h2>

            <p>
              From infrastructure to security, we provide
              technology solutions designed around real
              business requirements.
            </p>

          </div>


          <div className="about-capability-grid">

            <div className="about-capability-card">

              <div className="capability-icon">
                <FaNetworkWired />
              </div>

              <h3>
                IT & Networking
              </h3>

              <p>
                Enterprise networking, switching,
                connectivity and infrastructure solutions.
              </p>

            </div>


            <div className="about-capability-card">

              <div className="capability-icon">
                <FaVideo />
              </div>

              <h3>
                CCTV & Surveillance
              </h3>

              <p>
                IP surveillance, video recording,
                monitoring and security solutions.
              </p>

            </div>


            <div className="about-capability-card">

              <div className="capability-icon">
                <FaServer />
              </div>

              <h3>
                Servers & Storage
              </h3>

              <p>
                Enterprise servers, storage,
                backup and data infrastructure.
              </p>

            </div>


            <div className="about-capability-card">

              <div className="capability-icon">
                <FaShieldAlt />
              </div>

              <h3>
                Security & Automation
              </h3>

              <p>
                Access control, biometric,
                boom barriers and automation systems.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          WHY G2G
      ========================================= */}

      <section className="about-why">

        <div className="about-container about-why-grid">

          <div>

            <span className="about-label">
              WHY G2G SERVICES
            </span>

            <h2>
              One technology partner.
              <br />
              <span>Multiple solutions.</span>
            </h2>

            <p>
              We focus on delivering dependable technology
              solutions with professional execution and
              long-term project support.
            </p>

          </div>


          <div className="about-why-list">

            <div>
              <FaCheckCircle />
              <span>
                Professional project execution
              </span>
            </div>

            <div>
              <FaCheckCircle />
              <span>
                Enterprise-grade technology products
              </span>
            </div>

            <div>
              <FaCheckCircle />
              <span>
                Integrated IT and security solutions
              </span>
            </div>

            <div>
              <FaCheckCircle />
              <span>
                Reliable technical support
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="about-cta">

        <div className="about-container about-cta-inner">

          <div>

            <span>
              LET'S WORK TOGETHER
            </span>

            <h2>
              Ready to build a smarter infrastructure?
            </h2>

            <p>
              Talk to G2G Services about your IT,
              networking, surveillance and security
              requirements.
            </p>

          </div>


          <Link
            to="/contact"
            className="about-cta-button"
          >
            Contact Us
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;