import "./Projects.css";

const projects = [
  {
    title: "Indian Railway",
    location: "Prayagraj & Jhansi Division",
    category: "Railway Infrastructure",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900",
    tech: ["UTS", "PRS", "OFC", "Networking"]
  },
  {
    title: "Air Force Project",
    location: "AFCEL",
    category: "Defence",
    image: "https://images.unsplash.com/photo-1517976487492-576ea6b2936d?w=900",
    tech: ["CCTV", "Server", "Security"]
  },
  {
    title: "High Court Infrastructure",
    location: "Prayagraj",
    category: "Government",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900",
    tech: ["Network", "Data Center", "CCTV"]
  }
];

function Projects() {
  return (
    <section className="section projects">
      <div className="container">

        <div className="section-title">
          <span>OUR PROJECTS</span>
          <h2>Featured Projects</h2>
          <p>
            Delivering mission-critical IT infrastructure, surveillance
            and networking projects across India.
          </p>
        </div>

        <div className="project-grid">

          {projects.map((project, index) => (

            <div className="project-card" key={index}>

              <div className="project-image">
                <img src={project.image} alt={project.title} />

                <div className="project-overlay">
                  <button>View Details</button>
                </div>

              </div>

              <div className="project-content">

                <span className="project-category">
                  {project.category}
                </span>

                <h3>{project.title}</h3>

                <p>📍 {project.location}</p>

                <div className="tags">

                  {project.tech.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;