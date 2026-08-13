import "./Gallery.css";
import { FaArrowRight } from "react-icons/fa";

function Gallery() {
  const images = [
    {
      title: "CCTV & Surveillance",
      category: "SURVEILLANCE",
      image: "/gallery/cctv.jpg",
    },
    {
      title: "Enterprise Networking",
      category: "NETWORKING",
      image: "/gallery/network.jpg",
    },
    {
      title: "Server Infrastructure",
      category: "SERVER",
      image: "/gallery/server.jpg",
    },
    {
      title: "Access Control",
      category: "SECURITY",
      image: "/gallery/access.jpg",
    },
    {
      title: "Biometric Systems",
      category: "BIOMETRIC",
      image: "/gallery/biometric.jpg",
    },
    {
      title: "Boom Barrier",
      category: "AUTOMATION",
      image: "/gallery/barrier.jpg",
    },
  ];

  return (
    <main className="gallery-page">

      {/* HERO */}
      <section className="gallery-hero">
        <div className="gallery-container">

          <span className="gallery-label">OUR GALLERY</span>

          <h1>
            Technology in
            <span>the real world.</span>
          </h1>

          <p>
            Explore our technology solutions, infrastructure
            and project environments.
          </p>

        </div>
      </section>


      {/* GALLERY */}
      <section className="gallery-section">

        <div className="gallery-container">

          <div className="gallery-heading">
            <div>
              <span className="gallery-label">PROJECT MOMENTS</span>
              <h2>Built for real-world requirements.</h2>
            </div>

            <p>
              A glimpse of the technology categories and
              solutions supported by G2G Services.
            </p>
          </div>


          <div className="gallery-grid">

            {images.map((item, index) => (
              <article className="gallery-card" key={index}>

                <div className="gallery-image">

                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="gallery-placeholder">
                    <span>{item.category}</span>
                  </div>

                </div>

                <div className="gallery-card-content">

                  <span>{item.category}</span>

                  <h3>{item.title}</h3>

                  <FaArrowRight />

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="gallery-cta">

        <div className="gallery-container gallery-cta-inner">

          <div>
            <span>LOOKING FOR A SOLUTION?</span>

            <h2>
              Let's build something
              reliable together.
            </h2>
          </div>

          <a href="/contact">
            Contact Us
            <FaArrowRight />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Gallery;