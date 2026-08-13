import "./TrustedBrands.css";

function TrustedBrands() {
  const brands = [
    "CP PLUS",
    "HIKVISION",
    "CISCO",
    "DELL",
    "HP",
    "FAAC",
    "TIMEWATCH",
    "APC"
  ];

  return (
    <section className="g2g-trusted-brands">

      <div className="g2g-brands-container">

        <div className="g2g-brands-heading">

          <span className="g2g-section-label">
            TRUSTED TECHNOLOGY PARTNERS
          </span>

          <h2>
            Technology from brands
            <br />
            <span>you can trust.</span>
          </h2>

          <p>
            We work with globally recognized technology
            brands to deliver reliable products and
            professional infrastructure solutions.
          </p>

        </div>


        <div className="g2g-brands-list">

          {brands.map((brand, index) => (

            <div
              className="g2g-brand-item"
              key={index}
            >
              {brand}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TrustedBrands;