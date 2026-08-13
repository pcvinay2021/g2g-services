import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="g2g-hero">

      <div className="g2g-hero-container">

        <div className="g2g-hero-content">

          <span className="g2g-hero-label">
            G2G SERVICES
          </span>

          <h1>
            Enterprise IT &{" "}
            <span>Security Solutions</span>
          </h1>

          <p>
            Professional IT infrastructure, networking,
            surveillance, security and automation solutions
            designed for modern businesses and enterprise
            projects.
          </p>

          <div className="g2g-hero-buttons">

            <Link
              to="/products"
              className="g2g-hero-primary"
            >
              Explore Products
            </Link>

            <Link
              to="/contact"
              className="g2g-hero-secondary"
            >
              Talk to an Expert
            </Link>

          </div>

        </div>


        <div className="g2g-hero-visual">

          <div className="g2g-hero-panel">

            <div className="g2g-hero-panel-content">

              <small>
                SMART INFRASTRUCTURE
              </small>

              <h2>
                Secure. Connected. Intelligent.
              </h2>

              <p>
                Integrated technology solutions for
                surveillance, networking, IT infrastructure
                and enterprise security.
              </p>

              <div className="g2g-hero-points">

                <div className="g2g-hero-point">
                  IT Infrastructure
                </div>

                <div className="g2g-hero-point">
                  Network Solutions
                </div>

                <div className="g2g-hero-point">
                  Security & CCTV
                </div>

                <div className="g2g-hero-point">
                  Automation
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;