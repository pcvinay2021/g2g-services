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
  FaSyncAlt,
  FaUsers,
  FaUserClock,
  FaUserCheck,
  FaClipboardList,
} from "react-icons/fa";
import { apiUrl, API_BASE_URL } from "../config/api";
import "./CareerApplications.css";

function CareerApplications() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("g2g_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    loadCareers();
  }, []);

  const loadCareers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl("/api/admin/careers"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("g2g_admin_token");
        navigate("/admin");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load applications.");
      }

      setCareers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/careers/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete application.");
      }

      setCareers((prev) => prev.filter((item) => item._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(apiUrl(`/api/admin/careers/${id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update status.");
      }

      setCareers((prev) =>
        prev.map((item) => item._id === id ? { ...item, status } : item)
      );

      setSelected((prev) =>
        prev?._id === id ? { ...prev, status } : prev
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getResumeUrl = (resume) => {
    const filePath = resume?.filePath;
    if (!filePath) return "";
    if (/^https?:\/\//i.test(filePath)) return filePath;
    return `${API_BASE_URL}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
  };

  const getStatusClass = (status) =>
    (status || "New").toLowerCase().replace(/\s+/g, "-");

  const counts = {
    total: careers.length,
    new: careers.filter((item) => (item.status || "New") === "New").length,
    shortlisted: careers.filter((item) => item.status === "Shortlisted").length,
    selected: careers.filter((item) => item.status === "Selected").length,
  };

  const filteredCareers = careers.filter((item) => {
    const searchable = [
      item.name,
      item.email,
      item.phone,
      item.position,
      item.status || "New",
    ].join(" ").toLowerCase();

    const matchesSearch = searchable.includes(search.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (item.status || "New") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="career-admin-page">
      <header className="career-admin-header">
        <div className="career-header-copy">
          <button
            type="button"
            className="career-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            <FaArrowLeft /> Dashboard
          </button>

          <span>G2G SERVICES ADMIN</span>
          <h1>Career Applications</h1>
          <p>Review, track and manage applications received through the G2G Services website.</p>
        </div>

        <div className="career-count">
          <strong>{counts.total}</strong>
          <small>Total Applications</small>
        </div>
      </header>

      <section className="career-admin-content">
        <div className="career-stats-grid">
          <div className="career-stat-card">
            <div className="career-stat-icon total"><FaUsers /></div>
            <div><small>Total Applications</small><strong>{counts.total}</strong><span>All candidates</span></div>
          </div>
          <div className="career-stat-card">
            <div className="career-stat-icon new"><FaUserClock /></div>
            <div><small>New Applications</small><strong>{counts.new}</strong><span>Awaiting review</span></div>
          </div>
          <div className="career-stat-card">
            <div className="career-stat-icon shortlisted"><FaClipboardList /></div>
            <div><small>Shortlisted</small><strong>{counts.shortlisted}</strong><span>Under consideration</span></div>
          </div>
          <div className="career-stat-card">
            <div className="career-stat-icon selected"><FaUserCheck /></div>
            <div><small>Selected</small><strong>{counts.selected}</strong><span>Successful candidates</span></div>
          </div>
        </div>

        <div className="career-toolbar">
          <div className="career-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search applicant, email, phone or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="career-toolbar-actions">
            <div className="career-filter">
              <FaBriefcase />
              <select
                aria-label="Filter applications by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button
              type="button"
              className="career-refresh-btn"
              onClick={loadCareers}
              disabled={loading}
            >
              <FaSyncAlt className={loading ? "career-spinning" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="career-results-bar">
          <div>
            <strong>Applications</strong>
            <span>{loading ? "Loading..." : `${filteredCareers.length} result${filteredCareers.length === 1 ? "" : "s"}`}</span>
          </div>
          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => { setSearch(""); setStatusFilter("All"); }}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="career-table-card">
          {loading ? (
            <div className="career-empty">
              <FaSyncAlt className="career-loading-icon" />
              <h3>Loading applications</h3>
              <p>Please wait while applications are fetched.</p>
            </div>
          ) : error ? (
            <div className="career-empty career-error">
              <FaBriefcase />
              <h3>Unable to load applications</h3>
              <p>{error}</p>
              <button type="button" className="career-retry-btn" onClick={loadCareers}>Try Again</button>
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="career-empty">
              <FaBriefcase />
              <h3>{careers.length ? "No matching applications" : "No applications found"}</h3>
              <p>{careers.length ? "Try changing your search or status filter." : "Applications will appear here when candidates apply."}</p>
              {(search || statusFilter !== "All") && (
                <button
                  type="button"
                  className="career-retry-btn"
                  onClick={() => { setSearch(""); setStatusFilter("All"); }}
                >
                  Clear Filters
                </button>
              )}
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
                    <th>APPLIED ON</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCareers.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="career-person">
                          <div className="career-avatar">
                            {item.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <strong>{item.name || "Unnamed Applicant"}</strong>
                            <small>{item.email || "No email provided"}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="career-position">
                          {item.position || "General Application"}
                        </span>
                      </td>
                      <td>
                        <div className="career-contact">
                          {item.phone ? (
                            <a href={`tel:${item.phone}`}><FaPhone />{item.phone}</a>
                          ) : <span>-</span>}
                        </div>
                      </td>
                      <td>
                        <select
                          aria-label={`Status for ${item.name || "applicant"}`}
                          className={`career-status ${getStatusClass(item.status)}`}
                          value={item.status || "New"}
                          onChange={(e) => updateStatus(item._id, e.target.value)}
                        >
                          <option>New</option>
                          <option>Shortlisted</option>
                          <option>Interview</option>
                          <option>Selected</option>
                          <option>Rejected</option>
                        </select>
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <div className="career-actions">
                          <button type="button" className="career-view-btn" onClick={() => setSelected(item)} title="View Application" aria-label="View application"><FaEye /></button>
                          {getResumeUrl(item.resume) && (
                            <a href={getResumeUrl(item.resume)} target="_blank" rel="noreferrer" className="career-resume-btn" title="View Resume" aria-label="View resume"><FaFileDownload /></a>
                          )}
                          <button type="button" className="career-delete-btn" onClick={() => deleteCareer(item._id)} title="Delete Application" aria-label="Delete application"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="career-modal-overlay" onClick={() => setSelected(null)}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()}>
            <div className="career-modal-header">
              <div>
                <span>APPLICATION DETAILS</span>
                <h2>{selected.name || "Applicant Details"}</h2>
              </div>
              <button type="button" aria-label="Close details" onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="career-modal-details">
              <div><small>POSITION</small><strong>{selected.position || "General Application"}</strong></div>
              <div>
                <small>STATUS</small>
                <select
                  className={`career-status large ${getStatusClass(selected.status)}`}
                  value={selected.status || "New"}
                  onChange={(e) => updateStatus(selected._id, e.target.value)}
                >
                  <option>New</option>
                  <option>Shortlisted</option>
                  <option>Interview</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div><small>EMAIL</small>{selected.email ? <a href={`mailto:${selected.email}`}><FaEnvelope />{selected.email}</a> : <strong>-</strong>}</div>
              <div><small>PHONE</small>{selected.phone ? <a href={`tel:${selected.phone}`}><FaPhone />{selected.phone}</a> : <strong>-</strong>}</div>
              <div><small>APPLIED ON</small><strong>{formatDate(selected.createdAt)}</strong></div>
            </div>

            <div className="career-message">
              <small>CANDIDATE MESSAGE</small>
              <p>{selected.message || "No message provided."}</p>
            </div>

            {getResumeUrl(selected.resume) && (
              <div className="career-resume-box">
                <div>
                  <FaFileDownload />
                  <div><strong>Candidate Resume</strong><small>Resume / CV submitted with application</small></div>
                </div>
                <a href={getResumeUrl(selected.resume)} target="_blank" rel="noreferrer">View Resume</a>
              </div>
            )}

            <div className="career-modal-actions">
              {selected.email && <a href={`mailto:${selected.email}`}><FaEnvelope />Email Candidate</a>}
              {selected.phone && <a href={`tel:${selected.phone}`}><FaPhone />Call Candidate</a>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CareerApplications;
