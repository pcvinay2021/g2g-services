import "./Projects.css";

import {
  FaVideo,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Projects() {
  const projects = [
    {
      number: "01",
      category: "SURVEILLANCE",
      title: "CCTV & Surveillance Infrastructure",
      location: "Enterprise / Institutional Projects",
      description:
        "Professional surveillance infrastructure including IP cameras, NVR systems, monitoring and network connectivity.",
      icon: <FaVideo />
    },
    {
      number: "02",
      category: "NETWORKING",
      title: "Enterprise Network Infrastructure",
      location: "Corporate & Enterprise Environment",
      description:
        "Structured networking solutions with switches, routing, connectivity and infrastructure deployment.",
      icon: <FaNetworkWired />
    },
    {
      number: "03",
      category: "SERVER & STORAGE",
      title: "Server & Data Infrastructure",
      location: "Enterprise IT Environment",
      description:
        "Server, storage, backup and supporting infrastructure designed for reliable business operations.",
      icon: <FaServer />
    },
    {
      number: "04",
      category: "SECURITY",
      title: "Integrated Security Solutions",
      location: "Commercial & Institutional Sites",
      description:
        "Access control, biometric systems, surveillance and security technologies integrated into a single solution.",
      icon: <FaShieldAlt />
    }
  ];

  return (
    <main className="g2g-projects-page">

      {/* =========================================
          PROJECT HERO
      ========================================= */}

      <section className="projects-hero">

        <div className="projects-container">

          <div className="projects-hero-content">

            <span className="projects-label">
              OUR PROJECTS
            </span>

            <h1>
              Technology projects
              <span>that deliver real impact.</span>
            </h1>

            <p>
              From enterprise networking and surveillance
              to security and IT infrastructure, G2G Services
              supports technology projects from requirement
              to implementation.
            </p>

            <div className="projects-buttons">

              <Link
                to="/contact"
                className="projects-primary-btn"
              >
                Discuss Your Project
                <FaArrowRight />
              </Link>

              <Link
                to="/services"
                className="projects-secondary-btn"
              >
                Explore Services
              </Link>

            </div>

          </div>


          <div className="projects-hero-card">

            <div className="projects-card-top">
              <span>PROJECT DELIVERY</span>
              <FaNetworkWired />
            </div>

            <h2>
              Plan.
              <br />
              Deploy.
              <br />
              Support.
            </h2>

            <p>
              A practical approach to technology
              implementation and long-term support.
            </p>

            <div className="projects-card-line" />

            <div className="projects-card-points">

              <span>
                Site Assessment
              </span>

              <span>
                Solution Design
              </span>

              <span>
                Implementation
              </span>

              <span>
                Technical Support
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          PROJECT INTRO
      ========================================= */}

      <section className="projects-intro">

        <div className="projects-container projects-intro-grid">

          <div>

            <span className="projects-label">
              OUR EXPERIENCE
            </span>

            <h2>
              Technology built around
              <strong>your requirements.</strong>
            </h2>

          </div>

          <div>

            <p>
              Every project has different requirements.
              Our approach focuses on understanding the
              environment first and then selecting the
              right technology, architecture and deployment
              strategy.
            </p>

            <p>
              This allows us to deliver practical,
              scalable and dependable technology solutions.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          PROJECT CARDS
      ========================================= */}

      <section className="projects-list">

        <div className="projects-container">

          <div className="projects-heading">

            <span className="projects-label">
              PROJECT CATEGORIES
            </span>

            <h2>
              Solutions across multiple
              technology environments
            </h2>

            <p>
              Our project capabilities cover IT,
              networking, surveillance and security.
            </p>

          </div>


          <div className="projects-grid">

            {projects.map((project, index) => (

              <article
                className="project-card"
                key={index}
              >

                <div className="project-card-top">

                  <div className="project-icon">
                    {project.icon}
                  </div>

                  <span>
                    {project.number}
                  </span>

                </div>

                <div className="project-category">
                  {project.category}
                </div>

                <h3>
                  {project.title}
                </h3>

                <div className="project-location">

                  <FaMapMarkerAlt />

                  <span>
                    {project.location}
                  </span>

                </div>

                <p>
                  {project.description}
                </p>

                <Link
                  to="/contact"
                  className="project-link"
                >
                  Discuss Similar Project
                  <FaArrowRight />
                </Link>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          PROJECT PROCESS
      ========================================= */}

      <section className="projects-process">

        <div className="projects-container">

          <div className="projects-process-heading">

            <span className="projects-label">
              HOW WE WORK
            </span>

            <h2>
              From idea to implementation.
            </h2>

          </div>


          <div className="projects-process-grid">

            <div>
              <span>01</span>
              <h3>Requirement</h3>
              <p>
                Understand the site, business needs
                and technical requirements.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Solution</h3>
              <p>
                Select the right products,
                architecture and technology.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Deployment</h3>
              <p>
                Execute installation, configuration
                and project implementation.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Support</h3>
              <p>
                Provide technical assistance,
                maintenance and support.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="projects-cta">

        <div className="projects-container projects-cta-inner">

          <div>

            <span>
              HAVE A PROJECT?
            </span>

            <h2>
              Let's discuss your
              technology requirement.
            </h2>

            <p>
              Tell us what you need and let G2G Services
              help you build the right solution.
            </p>

          </div>

          <Link
            to="/contact"
            className="projects-cta-button"
          >
            Contact G2G Services
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Projects;