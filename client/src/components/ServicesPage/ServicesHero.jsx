import "./ServicesHero.css";

function ServicesHero() {
  return (
    <section className="services-hero">

      <div className="container">

        <span className="hero-tag">
          OUR SERVICES
        </span>

        <h1>
          Enterprise IT &
          <span> Security Solutions</span>
        </h1>

        <p>
          G2G Services provides Enterprise Networking,
          CCTV Surveillance, Fire Alarm, Access Control,
          Data Center, Server Infrastructure, Wi-Fi,
          Smart City and complete IT Infrastructure
          solutions across India.
        </p>

        <div className="hero-btns">

          <button className="btn-primary">
            Explore Services
          </button>

          <button className="btn-outline">
            Get Free Consultation
          </button>

        </div>

      </div>

    </section>
  );
}

export default ServicesHero;