import "./FeaturedProjects.css";

import {
  FaShieldAlt,
  FaNetworkWired,
  FaTrain
} from "react-icons/fa";

import { Link } from "react-router-dom";

function FeaturedProjects() {
  const projects = [
    {
      icon: <FaShieldAlt />,
      category: "SURVEILLANCE & SECURITY",
      title: "Smart Surveillance Infrastructure",
      text:
        "Integrated CCTV, networking and monitoring infrastructure designed for secure and reliable operations."
    },
    {
      icon: <FaNetworkWired />,
      category: "IT & NETWORKING",
      title: "Enterprise Network Infrastructure",
      text:
        "Structured networking, server infrastructure and connectivity solutions for demanding environments."
    },
    {
      icon: <FaTrain />,
      category: "IT & COMMUNICATION",
      title: "Data & Communication Solutions",
      text:
        "Professional IT and communication infrastructure for large-scale operational environments."
    }
  ];

  return (
    <section className="g2g-featured-projects">

      <div className="g2g-projects-container">

        {/* ================= HEADING ================= */}

        <div className="g2g-projects-heading">

          <div>

            <span className="g2g-section-label">
              FEATURED PROJECTS
            </span>

            <h2>
              Experience that delivers
              <br />
              <span>real results.</span>
            </h2>

          </div>

          <div className="g2g-projects-intro">

            <p>
              G2G Services combines technology,
              infrastructure and project expertise
              to deliver dependable solutions.
            </p>

            <Link
              to="/projects"
              className="g2g-projects-link"
            >
              View All Projects →
            </Link>

          </div>

        </div>


        {/* ================= PROJECTS ================= */}

        <div className="g2g-projects-list">

          {projects.map((project, index) => (

            <article
              className="g2g-project-row"
              key={index}
            >

              <div className="g2g-project-number">
                0{index + 1}
              </div>


              <div className="g2g-project-icon">
                {project.icon}
              </div>


              <div className="g2g-project-content">

                <span>
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.text}
                </p>

              </div>


              <Link
                to="/projects"
                className="g2g-project-arrow"
              >
                →
              </Link>

            </article>

          ))}

        </div>


        {/* ================= CTA ================= */}

        <div className="g2g-projects-cta">

          <div>

            <strong>
              Planning a new technology project?
            </strong>

            <span>
              Let's discuss your infrastructure requirements.
            </span>

          </div>

          <Link to="/contact">
            Start a Conversation →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedProjects;