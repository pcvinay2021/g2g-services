import "./About.css";

function About() {
  return (
    <section className="about">

      <div className="about-left">

        <div className="image-box">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
            alt="G2G Services"
          />

          <div className="experience">
            <h2>14+</h2>
            <p>Years Experience</p>
          </div>

        </div>

      </div>

      <div className="about-right">

        <span className="section-tag">
          ABOUT G2G SERVICES
        </span>

        <h2>
          Complete IT Infrastructure &
          Security Solutions
        </h2>

        <p>
          G2G Services provides complete enterprise solutions including
          CCTV Surveillance, Networking, Access Control, Fire Alarm,
          EPABX, OFC, Data Center, Smart City, Railway Projects and
          Annual Maintenance Services across India.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            ✔ Enterprise Networking
          </div>

          <div className="feature-card">
            ✔ CCTV Surveillance
          </div>

          <div className="feature-card">
            ✔ Smart City Projects
          </div>

          <div className="feature-card">
            ✔ Railway Solutions
          </div>

        </div>

        <button className="about-btn">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default About;