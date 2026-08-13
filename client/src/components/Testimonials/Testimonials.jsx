import "./Testimonials.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Indian Railways",
    designation: "NCR Division",
    review:
      "Excellent execution of Data Communication equipment installation and timely AMC support."
  },
  {
    name: "Government Department",
    designation: "IT Infrastructure",
    review:
      "Professional team, quality installation and outstanding technical support."
  },
  {
    name: "Corporate Client",
    designation: "Enterprise Network",
    review:
      "Highly satisfied with networking, CCTV and security implementation."
  }
];

function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">

        <div className="section-title">
          <span>CLIENT TESTIMONIALS</span>
          <h2>Trusted by Organizations Across India</h2>
        </div>

        <div className="testimonial-grid">

          {reviews.map((item, index) => (

            <div className="testimonial-card card" key={index}>

              <FaQuoteLeft className="quote"/>

              <div className="stars">
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
              </div>

              <p>{item.review}</p>

              <h3>{item.name}</h3>

              <span>{item.designation}</span>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;