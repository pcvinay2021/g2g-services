import "./TrustedPartners.css";

const partners = [
  "Cisco",
  "Dell",
  "HP",
  "Hikvision",
  "CP Plus",
  "Honeywell",
  "Bosch",
  "Dahua"
];

function TrustedPartners() {
  return (
    <section className="partners">
      <div className="container">

        <p className="partner-title">
          Trusted Technology Partners
        </p>

        <div className="partner-grid">
          {partners.map((item,index)=>(
            <div className="partner-card" key={index}>
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustedPartners;