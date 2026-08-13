import "./Solutions.css";

import {
  FaNetworkWired,
  FaVideo,
  FaServer,
  FaShieldAlt,
  FaFingerprint,
  FaCogs
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Solutions() {
  return (
    <section className="g2g-solutions">

      <div className="g2g-solutions-container">

        {/* ================= HEADING ================= */}

        <div className="g2g-solutions-heading">

          <div>

            <span className="g2g-section-label">
              OUR SOLUTIONS
            </span>

            <h2>
              Technology that works
              <br />
              <span>for your business.</span>
            </h2>

          </div>

          <div className="g2g-solutions-intro">

            <p>
              From IT infrastructure to intelligent security,
              G2G Services delivers integrated technology
              solutions for modern organizations.
            </p>

            <Link
              to="/services"
              className="g2g-solutions-link"
            >
              Explore All Solutions →
            </Link>

          </div>

        </div>


        {/* ================= SOLUTION GRID ================= */}

        <div className="g2g-solutions-grid">

          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaNetworkWired />
            </div>

            <div>
              <h3>
                IT & Networking
              </h3>

              <p>
                Enterprise networks, switches,
                routers, Wi-Fi and infrastructure.
              </p>
            </div>

          </div>


          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaVideo />
            </div>

            <div>
              <h3>
                Surveillance
              </h3>

              <p>
                IP cameras, NVR, video analytics
                and complete CCTV solutions.
              </p>
            </div>

          </div>


          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaServer />
            </div>

            <div>
              <h3>
                Servers & Storage
              </h3>

              <p>
                Enterprise servers, storage,
                backup and data center solutions.
              </p>
            </div>

          </div>


          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h3>
                Security Systems
              </h3>

              <p>
                Access control, fire alarm,
                security and monitoring systems.
              </p>
            </div>

          </div>


          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaFingerprint />
            </div>

            <div>
              <h3>
                Biometric Solutions
              </h3>

              <p>
                Attendance, access management
                and biometric identification.
              </p>
            </div>

          </div>


          <div className="g2g-solution-item">

            <div className="g2g-solution-icon">
              <FaCogs />
            </div>

            <div>
              <h3>
                Automation
              </h3>

              <p>
                Boom barriers, smart access
                and entrance automation systems.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Solutions;