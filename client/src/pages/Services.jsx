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
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      icon: <FaNetworkWired />,
      title: "IT Infrastructure & Networking",
      description:
        "Professional IT infrastructure and networking solutions for offices, businesses, institutions and enterprise environments in Prayagraj and across India.",
      points: [
        "LAN / WAN Infrastructure",
        "Switching & Routing",
        "Structured Cabling",
        "Network Installation & Support",
      ],
    },
    {
      icon: <FaVideo />,
      title: "CCTV Installation & Surveillance",
      description:
        "Complete CCTV installation, surveillance and maintenance solutions for offices, homes, commercial sites, institutions and industrial locations.",
      points: [
        "IP CCTV Systems",
        "NVR / DVR Solutions",
        "CCTV Installation",
        "CCTV Service & Maintenance",
      ],
    },
    {
      icon: <FaServer />,
      title: "Servers & Storage Solutions",
      description:
        "Reliable server, storage and backup infrastructure designed to support business applications, data protection and critical IT operations.",
      points: [
        "Enterprise Servers",
        "NAS / Storage",
        "Backup Solutions",
        "Server Installation & Support",
      ],
    },
    {
      icon: <FaShieldAlt />,
      title: "Access Control & Security",
      description:
        "Modern access control and integrated security solutions to help businesses manage, monitor and protect their premises.",
      points: [
        "Access Control Systems",
        "Door Access Solutions",
        "Security Systems",
        "Perimeter Security",
      ],
    },
    {
      icon: <FaFingerprint />,
      title: "Biometric Attendance Systems",
      description:
        "Biometric attendance and access management systems for offices, schools, institutions, factories and commercial organizations.",
      points: [
        "Biometric Attendance",
        "Fingerprint Systems",
        "Face Recognition",
        "Time & Attendance Management",
      ],
    },
    {
      icon: <FaParking />,
      title: "Boom Barrier & Automation",
      description:
        "Automatic boom barrier and vehicle access solutions for offices, residential complexes, campuses, parking areas and secured facilities.",
      points: [
        "Automatic Boom Barriers",
        "Vehicle Access Control",
        "Parking Automation",
        "Entrance Management",
      ],
    },
    {
      icon: <FaPhoneAlt />,
      title: "EPABX & Intercom Systems",
      description:
        "Business communication solutions including EPABX, intercom and internal communication systems for offices and organizations.",
      points: [
        "EPABX Installation",
        "Intercom Systems",
        "Office Communication",
        "System Configuration & Support",
      ],
    },
    {
      icon: <FaTools />,
      title: "AMC, Repair & Technical Support",
      description:
        "Professional IT support, repair, preventive maintenance and AMC services to keep your technology infrastructure reliable and operational.",
      points: [
        "Annual Maintenance Contracts",
        "Preventive Maintenance",
        "Troubleshooting & Repair",
        "On-Site Technical Support",
      ],
    },
  ];

  return (
    <main className="g2g-services-page">
      {/* =========================================
          SERVICES HERO
      ========================================= */}

      <section className="services-hero">
        <div className="services-container">
          <div className="services-hero-content">
            <span className="services-label">IT SUPPORT & SERVICES</span>

            <h1>
              IT, security & installation
              <span>solutions in Prayagraj.</span>
            </h1>

            <p>
              G2G Services provides professional IT support, networking, CCTV
              installation, biometric, access control, server, EPABX,
              intercom, boom barrier and security solutions for businesses,
              institutions and organizations in Prayagraj (Allahabad) and
              across India.
            </p>

            <div className="services-hero-buttons">
              <Link to="/contact" className="services-primary-btn">
                Talk to an Expert
                <FaArrowRight />
              </Link>

              <Link to="/products" className="services-secondary-btn">
                Explore Products
              </Link>
            </div>
          </div>

          <div className="services-hero-card">
            <div className="services-card-label">G2G SERVICES • PRAYAGRAJ</div>

            <h2>
              Secure.
              <br />
              Connected.
              <br />
              Reliable.
            </h2>

            <p>
              Complete technology installation, support and maintenance
              solutions for modern businesses and institutions.
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
          LOCAL SERVICE INTRO
      ========================================= */}

      <section className="services-intro">
        <div className="services-container services-intro-grid">
          <div>
            <span className="services-label">LOCAL IT EXPERTISE</span>

            <h2>
              Your local technology
              <strong> service partner.</strong>
            </h2>
          </div>

          <div>
            <p>
              Looking for reliable IT support or professional installation
              services in Prayagraj (Allahabad)? G2G Services helps businesses,
              offices, schools, institutions and commercial sites with
              technology infrastructure, networking, surveillance and security
              requirements.
            </p>

            <p>
              From a new CCTV installation or biometric attendance system to
              complete networking, server infrastructure, access control,
              EPABX, intercom and annual maintenance services, we provide
              practical solutions based on your site and business requirements.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SERVICES LIST
      ========================================= */}

      <section className="services-list">
        <div className="services-container">
          <div className="services-heading">
            <span className="services-label">OUR SERVICES</span>

            <h2>Complete IT & security solutions</h2>

            <p>
              Professional installation, configuration, repair and technical
              support for businesses and organizations in Prayagraj and across
              India.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-card-top">
                  <div className="service-icon">{service.icon}</div>

                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="service-points">
                  {service.points.map((point, pointIndex) => (
                    <div key={pointIndex}>
                      <FaCheckCircle />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="service-card-link">
                  Discuss Your Requirement
                  <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          PRAYAGRAJ SERVICE AREA
      ========================================= */}

      <section className="services-approach">
        <div className="services-container">
          <div className="services-approach-heading">
            <span className="services-label">SERVICE AREA</span>

            <h2>
              IT services across
              <span> Prayagraj & beyond.</span>
            </h2>
          </div>

          <div className="services-process">
            <div>
              <span>01</span>
              <h3>Prayagraj</h3>
              <p>
                IT support, CCTV installation, networking, biometric, access
                control and security solutions across Prayagraj.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Allahabad</h3>
              <p>
                Serving customers searching for IT installation and technical
                services in Allahabad, the former name of Prayagraj.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Uttar Pradesh</h3>
              <p>
                Technology projects, infrastructure installation and technical
                support for organizations across Uttar Pradesh.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Across India</h3>
              <p>
                Project-based IT infrastructure, networking, surveillance and
                security solutions for customers across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PROJECT APPROACH
      ========================================= */}

      <section className="services-intro">
        <div className="services-container services-intro-grid">
          <div>
            <span className="services-label">OUR APPROACH</span>

            <h2>
              From requirement to
              <strong> reliable implementation.</strong>
            </h2>
          </div>

          <div>
            <p>
              We first understand your site, existing infrastructure and
              business requirements. Our team then recommends suitable
              technology, assists with installation and configuration, and
              provides ongoing technical support.
            </p>

            <p>
              Whether you need a single CCTV camera installation, office
              networking, biometric attendance, access control, EPABX system
              or a complete IT infrastructure project, we aim to provide a
              dependable end-to-end solution.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}

      <section className="services-cta">
        <div className="services-container services-cta-inner">
          <div>
            <span>NEED IT SUPPORT OR INSTALLATION?</span>

            <h2>
              Let's build the right
              <br />
              technology solution.
            </h2>

            <p>
              Contact G2G Services for IT support, CCTV installation,
              networking, biometric, access control, EPABX, intercom, server,
              security and AMC requirements in Prayagraj and beyond.
            </p>
          </div>

          <Link to="/contact" className="services-cta-button">
            Contact G2G Services
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Services;