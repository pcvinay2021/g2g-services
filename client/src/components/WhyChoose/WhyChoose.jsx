import "./WhyChoose.css";
import {
  FaShieldAlt,
  FaBolt,
  FaUsersCog,
  FaHeadset,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

const data = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted Company",
    text: "Reliable IT, Networking & Security Solutions."
  },
  {
    icon: <FaBolt />,
    title: "Fast Delivery",
    text: "On-time project execution with quality."
  },
  {
    icon: <FaUsersCog />,
    title: "Expert Engineers",
    text: "Certified professionals for every project."
  },
  {
    icon: <FaHeadset />,
    title: "24×7 Support",
    text: "Always available for customer support."
  },
  {
    icon: <FaAward />,
    title: "14+ Years Experience",
    text: "Serving Government & Corporate sectors."
  },
  {
    icon: <FaHandshake />,
    title: "Customer First",
    text: "Long-term relationships through trust."
  },
];

function WhyChoose() {
  return (
    <section className="why">
      <div className="container">
        <span className="section-tag">WHY CHOOSE US</span>

        <h2>
          Why <span>G2G Services</span>?
        </h2>

        <p className="section-text">
          Delivering Enterprise Networking, CCTV, Surveillance,
          Automation and IT Infrastructure Solutions.
        </p>

        <div className="why-grid">
          {data.map((item, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;