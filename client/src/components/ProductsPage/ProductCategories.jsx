import "./ProductCategories.css";

import {
  FaVideo,
  FaHdd,
  FaNetworkWired,
  FaServer,
  FaDatabase,
  FaFireExtinguisher,
  FaDoorOpen,
  FaFingerprint,
  FaRoad,
  FaPhoneAlt,
  FaBatteryHalf,
  FaLaptop
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const products = [

  {
    icon: <FaVideo />,
    title: "CCTV Surveillance",
    text: "IP Camera, PTZ Camera, Bullet & Dome Camera.",
    link: "/products/camera"
  },

  {
    icon: <FaHdd />,
    title: "DVR / NVR",
    text: "HD DVR, AI NVR & Video Recording Solutions.",
    link: "/products/nvr"
  },

  {
    icon: <FaNetworkWired />,
    title: "Enterprise Networking",
    text: "Cisco Switches, Routers & Enterprise Network.",
    link: "/products/switch"
  },

  {
    icon: <FaServer />,
    title: "Server",
    text: "Dell, HP, Lenovo Enterprise Servers.",
    link: "/products/server"
  },

  {
    icon: <FaDatabase />,
    title: "Storage",
    text: "NAS, SAN & Enterprise Backup Solutions.",
    link: "/products/storage"
  },

  {
    icon: <FaFireExtinguisher />,
    title: "Fire Alarm",
    text: "Addressable & Conventional Fire Alarm.",
    link: "/products/fire-alarm"
  },

  {
    icon: <FaDoorOpen />,
    title: "Access Control",
    text: "Door Controller, RFID & Smart Lock.",
    link: "/products/access-control"
  },

  {
    icon: <FaFingerprint />,
    title: "Biometric",
    text: "Attendance & Access Management.",
    link: "/products/biometric"
  },

  {
    icon: <FaRoad />,
    title: "Boom Barrier",
    text: "FAAC, Neptune Automatic Barrier.",
    link: "/products/barrier"
  },

  {
    icon: <FaPhoneAlt />,
    title: "EPABX",
    text: "IP PBX & Office Communication.",
    link: "/products/epabx"
  },

  {
    icon: <FaBatteryHalf />,
    title: "UPS & Power",
    text: "APC Online UPS & Power Backup.",
    link: "/products/ups"
  },

  {
    icon: <FaLaptop />,
    title: "Laptop & Desktop",
    text: "HP, Dell, Lenovo Business Systems.",
    link: "/products/laptop"
  }

];
function ProductCategories() {

  const navigate = useNavigate();

  return (


    <section className="product-category">

      <div className="container">

        

        {/* ================= SECTION TITLE ================= */}

        <div className="section-title">

          <span>OUR PRODUCTS</span>

          <h2>
            Explore Product Categories
          </h2>

          <p>
            Enterprise IT Infrastructure &
            Security Products from
            World Leading Brands.
          </p>

        </div>


        {/* ================= PRODUCT GRID ================= */}

        <div className="product-grid">

          {products.map((item, index) => (

            <div
              className="product-card"
              key={index}
            >

              {/* ICON */}

              <div className="product-icon">

                {item.icon}

              </div>


              {/* TITLE */}

              <h3>

                {item.title}

              </h3>


              {/* DESCRIPTION */}

              <p>

                {item.text}

              </p>


              {/* VIEW PRODUCTS */}

              <button
  onClick={() =>
    navigate(
      `/products?category=${encodeURIComponent(item.title)}`
    )
  }
>
  View Products →
</button>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}


export default ProductCategories;