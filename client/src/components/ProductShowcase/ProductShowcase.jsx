import "./ProductShowcase.css";

import camera from "../../assets/products/camera.png";
import nvr from "../../assets/products/nvr.png";
import server from "../../assets/products/server.png";
import switchImg from "../../assets/products/cisco-switch.png";
import biometric from "../../assets/products/biometric.png";
import barrier from "../../assets/products/barrier.png";

const products = [
  {
    image: camera,
    brand: "CP Plus",
    name: "AI IP Camera"
  },
  {
    image: nvr,
    brand: "Hikvision",
    name: "Network Video Recorder"
  },
  {
    image: server,
    brand: "Dell",
    name: "Enterprise Server"
  },
  {
    image: switchImg,
    brand: "Cisco",
    name: "Managed Network Switch"
  },
  {
    image: biometric,
    brand: "TimeWatch",
    name: "Biometric System"
  },
  {
    image: barrier,
    brand: "FAAC",
    name: "Automatic Boom Barrier"
  }
];

function ProductShowcase() {

  const movingProducts = [
    ...products,
    ...products,
    ...products
  ];

  return (
    <section className="g2g-showcase">

      {/* ================= HEADING ================= */}

      <div className="g2g-showcase-heading">

        <span>
          OUR TECHNOLOGY
        </span>

        <strong>
          Professional products for{" "}
          <b>real-world solutions</b>
        </strong>

      </div>


      {/* ================= MOVING PRODUCTS ================= */}

      <div className="g2g-showcase-track">

        <div className="g2g-showcase-move">

          {movingProducts.map((product, index) => (

            <div
              className="g2g-showcase-card"
              key={index}
            >

              <div className="g2g-showcase-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>


              <div className="g2g-showcase-info">

                <small>
                  {product.brand}
                </small>

                <span>
                  {product.name}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProductShowcase;