import "./Services.css";

import {
  FaNetworkWired,
  FaVideo,
  FaServer,
  FaShieldAlt,
  FaFingerprint,
  FaParking,
  FaFireExtinguisher,
  FaTools,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      icon: <FaNetworkWired />,
      title: "IT Infrastructure & Networking",
      description:
        "Enterprise networking, structured infrastructure, switching, routing and connectivity solutions.",
      points: [
        "LAN / WAN Infrastructure",
        "Switching & Routing",
        "Structured Networking",
        "Network Monitoring"
      ]
    },
    {
      icon: <FaVideo />,
      title: "CCTV & Surveillance",
      description:
        "Professional surveillance solutions for offices, institutions, commercial sites and enterprise projects.",
      points: [
        "IP CCTV Systems",
        "NVR / DVR Solutions",
        "Video Monitoring",
        "Surveillance Projects"
      ]
    },
    {
      icon: <FaServer />,
      title: "Servers & Storage",
      description:
        "Reliable server and storage infrastructure designed for business applications and critical data.",
      points: [
        "Enterprise Servers",
        "NAS / Storage",
        "Backup Solutions",
        "Server Infrastructure"
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "Security Solutions",
      description:
        "Integrated security technology for controlling, monitoring and protecting modern facilities.",
      points: [
        "Access Control",
        "Security Systems",
        "Perimeter Security",
        "Integrated Solutions"
      ]
    },
    {
      icon: <FaFingerprint />,
      title: "Biometric Systems",
      description:
        "Attendance and access management solutions using modern biometric technology.",
      points: [
        "Biometric Attendance",
        "Access Management",
        "Face Recognition",
        "Time & Attendance"
      ]
    },
    {
      icon: <FaParking />,
      title: "Boom Barrier & Automation",
      description:
        "Vehicle access and entrance automation solutions for offices, campuses and secured facilities.",
      points: [
        "Automatic Boom Barriers",
        "Vehicle Access",
        "Parking Automation",
        "Entrance Control"
      ]
    },
    {
      icon: <FaFireExtinguisher />,
      title: "Fire & Safety Systems",
      description:
        "Technology-driven fire detection and safety solutions for commercial and institutional environments.",
      points: [
        "Fire Alarm Systems",
        "Detection Systems",
        "Safety Monitoring",
        "Integrated Alerts"
      ]
    },
    {
      icon: <FaTools />,
      title: "AMC & Technical Support",
      description:
        "Professional maintenance and technical support to keep your technology infrastructure running reliably.",
      points: [
        "Annual Maintenance",
        "Preventive Maintenance",
        "Troubleshooting",
        "Technical Support"
      ]
    }
  ];

  return (
    <main className="g2g-services-page">

      {/* =========================================
          SERVICES HERO
      ========================================= */}

      <section className="services-hero">

        <div className="services-container">

          <div className="services-hero-content">

            <span className="services-label">
              OUR SERVICES
            </span>

            <h1>
              Technology solutions
              <span>built for real business.</span>
            </h1>

            <p>
              From IT infrastructure and networking to
              surveillance, security and automation,
              G2G Services delivers integrated technology
              solutions for modern organizations.
            </p>

            <div className="services-hero-buttons">

              <Link
                to="/contact"
                className="services-primary-btn"
              >
                Talk to an Expert
                <FaArrowRight />
              </Link>

              <Link
                to="/products"
                className="services-secondary-btn"
              >
                Explore Products
              </Link>

            </div>

          </div>


          <div className="services-hero-card">

            <div className="services-card-label">
              G2G SERVICES
            </div>

            <h2>
              Secure.
              <br />
              Connected.
              <br />
              Intelligent.
            </h2>

            <p>
              Integrated technology solutions for
              infrastructure, surveillance, security
              and automation.
            </p>

            <div className="services-card-grid">

              <span>IT Infrastructure</span>
              <span>Networking</span>
              <span>CCTV & Security</span>
              <span>Automation</span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          SERVICES INTRO
      ========================================= */}

      <section className="services-intro">

        <div className="services-container services-intro-grid">

          <div>

            <span className="services-label">
              WHAT WE DO
            </span>

            <h2>
              One partner for your
              <strong> technology needs.</strong>
            </h2>

          </div>

          <div>

            <p>
              We combine technology products, professional
              implementation and technical expertise to
              create dependable solutions for businesses,
              institutions and enterprise environments.
            </p>

            <p>
              Our services can be delivered as individual
              solutions or integrated into complete
              technology projects.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          SERVICES GRID
      ========================================= */}

      <section className="services-list">

        <div className="services-container">

          <div className="services-heading">

            <span className="services-label">
              OUR CAPABILITIES
            </span>

            <h2>
              Complete technology solutions
            </h2>

            <p>
              Practical solutions designed around
              your infrastructure and project requirements.
            </p>

          </div>


          <div className="services-grid">

            {services.map((service, index) => (

              <div
                className="service-card"
                key={index}
              >

                <div className="service-card-top">

                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <span>
                    0{index + 1}
                  </span>

                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <div className="service-points">

                  {service.points.map(
                    (point, pointIndex) => (

                      <div
                        key={pointIndex}
                      >
                        <FaCheckCircle />
                        <span>{point}</span>
                      </div>

                    )
                  )}

                </div>

                <Link
                  to="/contact"
                  className="service-card-link"
                >
                  Discuss Your Requirement
                  <FaArrowRight />
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          PROJECT APPROACH
      ========================================= */}

      <section className="services-approach">

        <div className="services-container">

          <div className="services-approach-heading">

            <span className="services-label">
              OUR APPROACH
            </span>

            <h2>
              From requirement to
              <span> reliable implementation.</span>
            </h2>

          </div>


          <div className="services-process">

            <div>
              <span>01</span>
              <h3>Understand</h3>
              <p>
                We understand your site, infrastructure
                and project requirements.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Design</h3>
              <p>
                We identify suitable technology and
                design the right solution.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Implement</h3>
              <p>
                Our team supports professional installation
                and project execution.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Support</h3>
              <p>
                We provide technical support and
                maintenance for long-term reliability.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="services-cta">

        <div className="services-container services-cta-inner">

          <div>

            <span>
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let's build the right
              technology solution.
            </h2>

            <p>
              Tell us about your requirement and
              our team will help you identify the
              right solution.
            </p>

          </div>

          <Link
            to="/contact"
            className="services-cta-button"
          >
            Contact G2G Services
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Services;