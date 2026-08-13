import { useState } from "react";
import "./Careers.css";
import { apiUrl } from "../config/api";

import {
  FaArrowRight,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaUpload,
} from "react-icons/fa";

function Careers() {
  const jobs = [
    {
      title: "Project Engineer",
      location: "India",
      type: "Full Time",
      category: "PROJECTS",
    },
    {
      title: "Network Engineer",
      location: "India",
      type: "Full Time",
      category: "NETWORKING",
    },
    {
      title: "CCTV / Surveillance Engineer",
      location: "India",
      type: "Full Time",
      category: "SURVEILLANCE",
    },
    {
      title: "IT Support Engineer",
      location: "India",
      type: "Full Time",
      category: "IT INFRASTRUCTURE",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const openApplication = (position = "") => {
    setFormData((prev) => ({
      ...prev,
      position,
    }));

    setStatus({
      type: "",
      message: "",
    });

    setTimeout(() => {
      document
        .getElementById("career-application-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setStatus({
        type: "error",
        message: "Please upload PDF, DOC or DOCX file only.",
      });

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({
        type: "error",
        message: "Resume size must be less than 5 MB.",
      });

      e.target.value = "";
      return;
    }

    setStatus({
      type: "",
      message: "",
    });

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.position
    ) {
      setStatus({
        type: "error",
        message:
          "Please fill Name, Email, Phone and Position.",
      });

      return;
    }

    if (!formData.resume) {
      setStatus({
        type: "error",
        message: "Please upload your resume.",
      });

      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("message", formData.message);
      data.append("resume", formData.resume);

      const response = await fetch(
        apiUrl("/api/careers"),
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Application submission failed."
        );
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Your application has been submitted successfully.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
        resume: null,
      });

      const fileInput =
        document.getElementById("career-resume");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Career application error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="careers-page">

      {/* HERO */}

      <section className="careers-hero">
        <div className="careers-container careers-hero-grid">

          <div>
            <span className="careers-label">
              CAREERS AT G2G
            </span>

            <h1>
              Build your career
              <span>with technology.</span>
            </h1>

            <p>
              Join a team working across IT infrastructure,
              networking, surveillance, security and enterprise
              technology solutions.
            </p>

            <a
              href="#openings"
              className="careers-hero-btn"
            >
              View Open Positions
              <FaArrowRight />
            </a>
          </div>

          <div className="careers-hero-card">
            <span>WORK WITH US</span>

            <h2>
              Learn.
              <br />
              Build.
              <br />
              Grow.
            </h2>

            <p>
              We believe good technology starts with
              good people.
            </p>

            <div className="careers-card-line" />

            <div className="careers-mini-grid">

              <div>
                <strong>IT</strong>
                <small>Infrastructure</small>
              </div>

              <div>
                <strong>NET</strong>
                <small>Networking</small>
              </div>

              <div>
                <strong>SEC</strong>
                <small>Security</small>
              </div>

              <div>
                <strong>PROJ</strong>
                <small>Projects</small>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* INTRO */}

      <section className="careers-intro">
        <div className="careers-container careers-intro-grid">

          <div>
            <span className="careers-label">
              WHY G2G
            </span>

            <h2>
              Work on technology
              <strong>that matters.</strong>
            </h2>
          </div>

          <div>

            <p>
              Our projects involve real-world technology
              environments where reliability, security and
              professional execution matter.
            </p>

            <p>
              If you enjoy solving technical problems,
              learning new technologies and working with
              customers, we would like to hear from you.
            </p>

          </div>

        </div>
      </section>


      {/* OPENINGS */}

      <section
        className="careers-openings"
        id="openings"
      >
        <div className="careers-container">

          <div className="careers-heading">

            <span className="careers-label">
              OPEN POSITIONS
            </span>

            <h2>
              Find your next opportunity.
            </h2>

            <p>
              Explore current opportunities with G2G Services.
            </p>

          </div>


          <div className="jobs-list">

            {jobs.map((job, index) => (

              <article
                className="job-card"
                key={index}
              >

                <div className="job-icon">
                  <FaBriefcase />
                </div>

                <div className="job-info">

                  <span>{job.category}</span>

                  <h3>{job.title}</h3>

                  <div className="job-meta">

                    <div>
                      <FaMapMarkerAlt />
                      {job.location}
                    </div>

                    <div>
                      <FaClock />
                      {job.type}
                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="job-apply"
                  onClick={() =>
                    openApplication(job.title)
                  }
                >
                  Apply Now
                  <FaArrowRight />
                </button>

              </article>

            ))}

          </div>

        </div>
      </section>


      {/* APPLICATION FORM */}

      <section
        className="careers-application-form-section"
        id="career-application-form"
      >

        <div className="careers-container">

          <div className="careers-heading">

            <span className="careers-label">
              CAREER APPLICATION
            </span>

            <h2>
              Join the G2G team.
            </h2>

            <p>
              Complete the form and upload your latest resume.
            </p>

          </div>


          <form
            className="career-application-form"
            onSubmit={handleSubmit}
          >

            <div className="career-form-row">

              <div>
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>


              <div>
                <label>Phone Number *</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

            </div>


            <div className="career-form-row">

              <div>
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>


              <div>
                <label>Position *</label>

                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                >

                  <option value="" disabled>
                    Select position
                  </option>

                  {jobs.map((job) => (
                    <option
                      key={job.title}
                      value={job.title}
                    >
                      {job.title}
                    </option>
                  ))}

                  <option value="General Application">
                    General Application
                  </option>

                </select>

              </div>

            </div>


            <div className="career-form-group">

              <label htmlFor="career-resume">
                Resume * (PDF, DOC, DOCX — Max 5 MB)
              </label>

              <div className="career-file-upload">

                <FaUpload />

                <input
                  id="career-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  required
                />

              </div>

              {formData.resume && (
                <small className="career-file-name">
                  Selected: {formData.resume.name}
                </small>
              )}

            </div>


            <div className="career-form-group">

              <label>Message</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about yourself..."
              />

            </div>


            {status.message && (
              <div
                className={`career-form-status ${status.type}`}
              >
                {status.message}
              </div>
            )}


            <button
              type="submit"
              className="careers-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Submitting Application..."
                : "Submit Application"}

              {!loading && <FaArrowRight />}

            </button>

          </form>

        </div>

      </section>


      {/* APPLICATION CTA */}

      <section className="careers-application">

        <div className="careers-container careers-application-inner">

          <div>

            <span>DON'T SEE YOUR ROLE?</span>

            <h2>
              Send us your profile.
            </h2>

            <p>
              We are always interested in meeting
              talented people with the right skills.
            </p>

          </div>

          <button
            type="button"
            className="careers-apply-btn"
            onClick={() =>
              openApplication("General Application")
            }
          >
            Send Resume
            <FaArrowRight />
          </button>

        </div>

      </section>

    </main>
  );
}

export default Careers;
