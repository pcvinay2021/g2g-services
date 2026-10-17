import "./Products.css";
import {
  FaVideo,
  FaNetworkWired,
  FaPhoneAlt,
  FaFireExtinguisher,
  FaServer,
  FaFingerprint
} from "react-icons/fa";

const products = [
  {
    icon: <FaVideo />,
    color: "blue",
    title: "CCTV Surveillance",
    desc: "AI Cameras, PTZ, NVR & Video Analytics"
  },
  {
    icon: <FaNetworkWired />,
    color: "green",
    title: "Networking",
    desc: "Cisco Switching, Routing & Wi-Fi"
  },
  {
    icon: <FaPhoneAlt />,
    color: "orange",
    title: "IP PBX / EPABX",
    desc: "Enterprise Communication Systems"
  },
  {
    icon: <FaFireExtinguisher />,
    color: "red",
    title: "Fire Alarm",
    desc: "Fire Detection & Public Address"
  },
  {
    icon: <FaServer />,
    color: "purple",
    title: "Server & Storage",
    desc: "Rack Servers, NAS & Backup Solutions"
  },
  {
    icon: <FaFingerprint />,
    color: "cyan",
    title: "Access Control",
    desc: "Biometric, Face Recognition & Smart Entry"
  }
];

function Products() {
  return (
    <section className="section products">
      <div className="container">

        <div className="section-title">
          <span>OUR PRODUCTS</span>
          <h2>Technology Products We Deliver</h2>
          <p>
            Enterprise-grade products from trusted OEM partners for
            surveillance, networking, security and automation.
          </p>
        </div>

        <div className="product-grid">
          {products.map((item, index) => (
            <div className="product-card card" key={index}>

              <div className={`product-icon ${item.color}`}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <button className="btn btn-primary">
                Get Quote
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;