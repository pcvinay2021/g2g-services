import { useState } from "react";
import "./Contact.css";
import { apiUrl } from "../config/api";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in Name, Email and Message.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: data.message || "Your enquiry has been submitted successfully.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* HERO */}

      <section className="contact-hero">
        <div className="contact-container contact-hero-grid">

          <div>
            <span className="contact-label">
              CONTACT G2G SERVICES
            </span>

            <h1>
              Let's talk about
              <span>your requirement.</span>
            </h1>

            <p>
              Whether you need networking, surveillance,
              security, IT infrastructure or technical
              support, our team is ready to help.
            </p>
          </div>

          <div className="contact-hero-card">

            <span>QUICK CONTACT</span>

            <h2>
              Have a project
              in mind?
            </h2>

            <p>
              Tell us what you need and our team
              will get back to you.
            </p>

            <a
              href="https://wa.me/917080010039"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
              WhatsApp Us
            </a>

          </div>

        </div>
      </section>


      {/* CONTACT DETAILS */}

      <section className="contact-details">

        <div className="contact-container">

          <div className="contact-heading">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h2>
              We're here to help.
            </h2>

          </div>


          <div className="contact-info-grid">

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaPhone />
              </div>

              <span>CALL US</span>

              <h3>+91 70800 10039</h3>

              <a href="tel:+917080010039">
                Call Now
                <FaArrowRight />
              </a>

            </div>


            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaEnvelope />
              </div>

              <span>EMAIL US</span>

              <h3>info@g2gservices.in</h3>

              <a href="mailto:info@g2gservices.in">
                Send Email
                <FaArrowRight />
              </a>

            </div>


            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>

              <span>LOCATION</span>

              <h3>India</h3>

              <a
                href="https://www.google.com/maps/search/?api=1&query=India"
                target="_blank"
                rel="noreferrer"
              >
                View Location
                <FaArrowRight />
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="contact-form-section">

        <div className="contact-container contact-form-grid">

          <div className="contact-form-content">

            <span className="contact-label">
              SEND AN ENQUIRY
            </span>

            <h2>
              Tell us what
              you need.
            </h2>

            <p>
              Share a few details about your requirement.
              Our team will contact you to understand the
              project better.
            </p>

            <div className="contact-form-note">

              <strong>Typical requirements:</strong>

              <span>
                CCTV & Surveillance
              </span>

              <span>
                Networking & Infrastructure
              </span>

              <span>
                Server & Storage
              </span>

              <span>
                Access Control & Biometric
              </span>

            </div>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div>

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />

              </div>


              <div>

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />

              </div>

            </div>


            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />


            <label>Requirement</label>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >

              <option value="" disabled>
                Select a service
              </option>

              <option value="CCTV & Surveillance">
                CCTV & Surveillance
              </option>

              <option value="Networking">
                Networking
              </option>

              <option value="Server & Storage">
                Server & Storage
              </option>

              <option value="Access Control">
                Access Control
              </option>

              <option value="IT Infrastructure">
                IT Infrastructure
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your requirement..."
              required
            />


            {/* STATUS MESSAGE */}

            {status.message && (
              <div
                className={`contact-form-status ${status.type}`}
              >
                {status.message}
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
            >

              {loading ? "Submitting..." : "Submit Enquiry"}

              {!loading && <FaArrowRight />}

            </button>

          </form>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="contact-bottom">

        <div className="contact-container contact-bottom-inner">

          <div>

            <span>NEED QUICK SUPPORT?</span>

            <h2>
              Connect with G2G Services.
            </h2>

          </div>

          <a
            href="https://wa.me/917080010039"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
            WhatsApp Us
          </a>

        </div>

      </section>

    </main>
  );
}

export default Contact;
