import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaTrash,
  FaFileDownload,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { apiUrl, API_BASE_URL } from "../config/api";

import "./CareerApplications.css";

function CareerApplications() {
  const navigate = useNavigate();

  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("g2g_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      const response = await fetch(
        apiUrl("/api/admin/careers"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("g2g_admin_token");
        navigate("/admin");
        return;
      }

      setCareers(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCareer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        apiUrl(`/api/admin/careers/${id}`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete application."
        );
      }

      setCareers((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (selected?._id === id) {
        setSelected(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        apiUrl(`/api/admin/careers/${id}/status`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to update status."
        );
      }

      setCareers((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      if (selected?._id === id) {
        setSelected({
          ...selected,
          status,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredCareers = careers.filter((item) => {
    const text = `
      ${item.name || ""}
      ${item.email || ""}
      ${item.phone || ""}
      ${item.position || ""}
      ${item.status || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getResumeUrl = (resume) => {
    const filePath = resume?.filePath;
    if (!filePath) return "";
    if (/^https?:\/\//i.test(filePath)) return filePath;
    return `${API_BASE_URL}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
  };

  const getStatusClass = (status) => {
    return (status || "New")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <main className="career-admin-page">

      {/* HEADER */}

      <header className="career-admin-header">

        <div>

          <button
            className="career-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FaArrowLeft />
            Dashboard
          </button>

          <span>G2G SERVICES ADMIN</span>

          <h1>
            Career Applications
          </h1>

          <p>
            Review and manage applications
            received through the G2G Services
            website.
          </p>

        </div>

        <div className="career-count">
          <strong>{careers.length}</strong>
          <small>Applications</small>
        </div>

      </header>


      {/* CONTENT */}

      <section className="career-admin-content">

        {/* TOOLBAR */}

        <div className="career-toolbar">

          <div className="career-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search applicant, email, position..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        {/* TABLE */}

        <div className="career-table-card">

          {loading ? (

            <div className="career-empty">
              Loading applications...
            </div>

          ) : filteredCareers.length === 0 ? (

            <div className="career-empty">

              <FaBriefcase />

              <h3>
                No applications found
              </h3>

              <p>
                Career applications will appear
                here when candidates apply.
              </p>

            </div>

          ) : (

            <div className="career-table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>APPLICANT</th>
                    <th>POSITION</th>
                    <th>CONTACT</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredCareers.map(
                    (item) => (

                      <tr key={item._id}>

                        {/* APPLICANT */}

                        <td>

                          <div className="career-person">

                            <div className="career-avatar">
                              {item.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "?"}
                            </div>

                            <div>

                              <strong>
                                {item.name}
                              </strong>

                              <small>
                                {item.email}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* POSITION */}

                        <td>

                          <span className="career-position">
                            {item.position ||
                              "General Application"}
                          </span>

                        </td>


                        {/* CONTACT */}

                        <td>

                          <div className="career-contact">

                            <a
                              href={`tel:${item.phone}`}
                            >
                              <FaPhone />
                              {item.phone ||
                                "-"}
                            </a>

                          </div>

                        </td>


                        {/* STATUS */}

                        <td>

                          <select
                            className={`career-status ${getStatusClass(
                              item.status
                            )}`}
                            value={
                              item.status ||
                              "New"
                            }
                            onChange={(e) =>
                              updateStatus(
                                item._id,
                                e.target.value
                              )
                            }
                          >

                            <option>
                              New
                            </option>

                            <option>
                              Shortlisted
                            </option>

                            <option>
                              Interview
                            </option>

                            <option>
                              Selected
                            </option>

                            <option>
                              Rejected
                            </option>

                          </select>

                        </td>


                        {/* DATE */}

                        <td>
                          {formatDate(
                            item.createdAt
                          )}
                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="career-actions">

                            <button
                              className="career-view-btn"
                              onClick={() =>
                                setSelected(item)
                              }
                              title="View Application"
                            >
                              <FaEye />
                            </button>

                            {getResumeUrl(item.resume) && (
                              <a
                                href={getResumeUrl(item.resume)}
                                target="_blank"
                                rel="noreferrer"
                                className="career-resume-btn"
                                title="View Resume"
                              >
                                <FaFileDownload />
                              </a>
                            )}

                            <button
                              className="career-delete-btn"
                              onClick={() =>
                                deleteCareer(
                                  item._id
                                )
                              }
                              title="Delete"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>


      {/* APPLICATION MODAL */}

      {selected && (

        <div
          className="career-modal-overlay"
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="career-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="career-modal-header">

              <div>

                <span>
                  APPLICATION DETAILS
                </span>

                <h2>
                  {selected.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
              >
                ×
              </button>

            </div>


            {/* DETAILS */}

            <div className="career-modal-details">

              <div>
                <small>POSITION</small>

                <strong>
                  {selected.position ||
                    "General Application"}
                </strong>
              </div>

              <div>
                <small>STATUS</small>

                <select
                  className={`career-status large ${getStatusClass(
                    selected.status
                  )}`}
                  value={
                    selected.status ||
                    "New"
                  }
                  onChange={(e) =>
                    updateStatus(
                      selected._id,
                      e.target.value
                    )
                  }
                >
                  <option>New</option>
                  <option>Shortlisted</option>
                  <option>Interview</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div>
                <small>EMAIL</small>

                <a
                  href={`mailto:${selected.email}`}
                >
                  <FaEnvelope />
                  {selected.email}
                </a>
              </div>

              <div>
                <small>PHONE</small>

                <a
                  href={`tel:${selected.phone}`}
                >
                  <FaPhone />
                  {selected.phone || "-"}
                </a>
              </div>

              <div>
                <small>APPLIED ON</small>

                <strong>
                  {formatDate(
                    selected.createdAt
                  )}
                </strong>
              </div>

            </div>


            {/* MESSAGE */}

            <div className="career-message">

              <small>
                CANDIDATE MESSAGE
              </small>

              <p>
                {selected.message ||
                  "No message provided."}
              </p>

            </div>


            {/* RESUME */}

            {getResumeUrl(selected.resume) && (

              <div className="career-resume-box">

                <div>

                  <FaFileDownload />

                  <div>
                    <strong>
                      Candidate Resume
                    </strong>

                    <small>
                      Resume / CV submitted
                      with application
                    </small>
                  </div>

                </div>

                <a
                  href={getResumeUrl(selected.resume)}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>

              </div>

            )}


            {/* ACTIONS */}

            <div className="career-modal-actions">

              <a
                href={`mailto:${selected.email}`}
              >
                <FaEnvelope />
                Email Candidate
              </a>

              <a
                href={`tel:${selected.phone}`}
              >
                <FaPhone />
                Call Candidate
              </a>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default CareerApplications;
