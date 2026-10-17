import "./Industries.css";

import {
  FaBuilding,
  FaUniversity,
  FaHospital,
  FaIndustry,
  FaTrain,
  FaShieldAlt
} from "react-icons/fa";

function Industries() {
  const industries = [
    {
      icon: <FaBuilding />,
      title: "Corporate",
      text: "Secure IT infrastructure and enterprise networking for modern businesses."
    },
    {
      icon: <FaUniversity />,
      title: "Government",
      text: "Reliable technology solutions for government and institutional projects."
    },
    {
      icon: <FaHospital />,
      title: "Healthcare",
      text: "Connected infrastructure, surveillance and security for healthcare facilities."
    },
    {
      icon: <FaIndustry />,
      title: "Industrial",
      text: "Scalable networking, monitoring and automation for industrial environments."
    },
    {
      icon: <FaTrain />,
      title: "Railways & Transport",
      text: "IT, communication and surveillance infrastructure for transport projects."
    },
    {
      icon: <FaShieldAlt />,
      title: "Defence & Security",
      text: "Specialized surveillance, networking and security infrastructure."
    }
  ];

  return (
    <section className="g2g-industries">

      <div className="g2g-industries-container">

        <div className="g2g-industries-heading">

          <div>

            <span className="g2g-section-label">
              INDUSTRIES WE SERVE
            </span>

            <h2>
              Technology built for
              <br />
              <span>real-world needs.</span>
            </h2>

          </div>

          <p>
            From enterprise offices to large infrastructure
            projects, G2G Services delivers dependable
            technology solutions across multiple sectors.
          </p>

        </div>


        <div className="g2g-industries-grid">

          {industries.map((industry, index) => (

            <div
              className="g2g-industry"
              key={index}
            >

              <div className="g2g-industry-icon">
                {industry.icon}
              </div>

              <div>

                <h3>
                  {industry.title}
                </h3>

                <p>
                  {industry.text}
                </p>

              </div>

              <span className="g2g-industry-arrow">
                →
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Industries;