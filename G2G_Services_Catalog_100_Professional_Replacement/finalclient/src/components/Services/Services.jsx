import "./Services.css";
import {
  FaNetworkWired,
  FaVideo,
  FaServer,
  FaWifi,
  FaShieldAlt,
  FaFireExtinguisher,
  FaBroadcastTower,
  FaHome
} from "react-icons/fa";

const services = [
  {
    icon: <FaVideo />,
    title: "CCTV Surveillance",
    desc: "AI Based CCTV, PTZ, ANPR, Video Analytics & Monitoring"
  },
  {
    icon: <FaNetworkWired />,
    title: "Enterprise Networking",
    desc: "Cisco Switching, Routing, LAN, WAN & Network Security"
  },
  {
    icon: <FaServer />,
    title: "Data Center",
    desc: "Servers, Storage, Virtualization & Backup Solutions"
  },
  {
    icon: <FaWifi />,
    title: "Wi-Fi Solutions",
    desc: "Campus Wi-Fi, Hospitality & Enterprise Wireless Networks"
  },
  {
    icon: <FaShieldAlt />,
    title: "Access Control",
    desc: "Biometric, Face Recognition & Smart Entry Systems"
  },
  {
    icon: <FaFireExtinguisher />,
    title: "Fire Alarm",
    desc: "Fire Detection, PA System & Emergency Solutions"
  },
  {
    icon: <FaBroadcastTower />,
    title: "Telecom & OFC",
    desc: "Fiber Network, EPABX & Internet Lease Line"
  },
  {
    icon: <FaHome />,
    title: "Home Automation",
    desc: "Lighting, Smart Home & Building Automation"
  }
];

function Services() {
  return (
    <section className="services">

      <div className="section-heading">

        <span>OUR SERVICES</span>

        <h2>
          Complete Technology Solutions
        </h2>

        <p>
          Delivering enterprise-grade IT infrastructure,
          security and automation solutions across India.
        </p>

      </div>

      <div className="service-grid">

        {services.map((item, index) => (

          <div className="service-card" key={index}>

            <div className="icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <button>
              Learn More →
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Services;