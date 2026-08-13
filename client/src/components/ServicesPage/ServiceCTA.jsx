import "./ServiceCTA.css";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaNetworkWired,
  FaVideo,
  FaFireExtinguisher,
  FaServer,
  FaCity,
  FaCheckCircle
} from "react-icons/fa";

function ServiceCTA() {
  return (
    <section className="service-cta">

      <div className="container">

        <div className="cta-wrapper">

          {/* LEFT */}

          <div className="cta-left">

            <span className="cta-tag">
              LET'S BUILD SOMETHING GREAT
            </span>

            <h2>
              Ready to
              <span> Upgrade </span>
              Your IT
              Infrastructure?
            </h2>

            <p>
              G2G Services delivers Enterprise IT Infrastructure,
              Networking, CCTV Surveillance, Fire Alarm,
              Smart City, Data Center and Security Solutions
              for Government, Corporate and Industrial Projects.
            </p>

            <div className="cta-stats">

              <div className="stat-card">
                <h3>14+</h3>
                <span>Years Experience</span>
              </div>

              <div className="stat-card">
                <h3>150+</h3>
                <span>Projects</span>
              </div>

              <div className="stat-card">
                <h3>100+</h3>
                <span>Clients</span>
              </div>

              <div className="stat-card">
                <h3>24×7</h3>
                <span>Support</span>
              </div>

            </div>

          </div>

          {/* CENTER */}

          <div className="cta-center">

            <div className="feature-item">
              <FaNetworkWired />
              <span>Enterprise Networking</span>
            </div>

            <div className="feature-item">
              <FaVideo />
              <span>CCTV Surveillance</span>
            </div>

            <div className="feature-item">
              <FaFireExtinguisher />
              <span>Fire Alarm System</span>
            </div>

            <div className="feature-item">
              <FaServer />
              <span>Data Center Solutions</span>
            </div>

            <div className="feature-item">
              <FaCity />
              <span>Smart City Projects</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Annual Maintenance (AMC)</span>
            </div>

          </div>

          {/* RIGHT */}

          <div className="cta-right">

            <div className="call-card">

              <small>Need Immediate Help?</small>

              <h3>Talk With Our Expert</h3>

              <a href="tel:+917080010039" className="call-btn">
                <FaPhoneAlt />
                Call Now
              </a>

            </div>

            <div className="consult-card">

              <small>Free Consultation</small>

              <h3>
                Let's Discuss Your Project
              </h3>

              <button className="consult-btn">
                Get Free Consultation
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ServiceCTA;