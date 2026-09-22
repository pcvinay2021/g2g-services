import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaBriefcase,
  FaEnvelope,
  FaSignOutAlt,
  FaUsers,
  FaPhone,
  FaClock,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { apiUrl } from "../config/api";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState(null);

  const token = localStorage.getItem("g2g_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    loadDashboard();
  }, []);

  /* =========================
     LOAD DASHBOARD
  ========================= */

  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        profileResponse,
        dashboardResponse,
        contactsResponse,
        careersResponse,
      ] = await Promise.all([
        fetch(apiUrl("/api/admin/me"), {
          headers,
        }),

        fetch(apiUrl("/api/admin/dashboard"), {
          headers,
        }),

        fetch(apiUrl("/api/admin/contacts"), {
          headers,
        }),

        fetch(apiUrl("/api/admin/careers"), {
          headers,
        }),
      ]);

      const responses = [
        profileResponse,
        dashboardResponse,
        contactsResponse,
        careersResponse,
      ];

      if (responses.some((response) => response.status === 401)) {
        logout();
        return;
      }

      if (responses.some((response) => !response.ok)) {
        throw new Error(
          "Unable to load dashboard data."
        );
      }

      const profile = await profileResponse.json();
      const dashboardData =
        await dashboardResponse.json();

      const contactsData =
        await contactsResponse.json();

      const careersData =
        await careersResponse.json();

      if (!profile.success) {
        throw new Error(
          profile.message ||
            "Unable to load administrator profile."
        );
      }

      setAdmin(profile.data);

      setDashboard(
        dashboardData.data || {}
      );

      setContacts(
        contactsData.data || []
      );

      setCareers(
        careersData.data || []
      );

      setLastUpdated(new Date());

    } catch (err) {
      console.error(
        "Admin Dashboard:",
        err
      );

      setError(
        err.message ||
          "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem(
      "g2g_admin_token"
    );

    localStorage.removeItem(
      "g2g_admin"
    );

    navigate("/admin");
  };

  /* =========================
     NAVIGATION
  ========================= */

  const goTo = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  /* =========================
     DATE FORMAT
  ========================= */

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

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* =========================
     STATUS HELPERS
  ========================= */

  const getStatus = (value) => {
    return String(value || "New")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, " ");
  };

  /* =========================
     CONTACT COUNTS
  ========================= */

  const contactTotal =
    dashboard?.totalContacts ??
    contacts.length;

  const contactNew =
    contacts.filter(
      (item) =>
        getStatus(item.status) === "new"
    ).length;

  const contactResolved =
    contacts.filter(
      (item) =>
        getStatus(item.status) ===
        "resolved"
    ).length;

  /* =========================
     CAREER COUNTS
  ========================= */

  const careerTotal =
    dashboard?.totalCareers ??
    careers.length;

  const careerNew =
    careers.filter(
      (item) =>
        getStatus(item.status) === "new"
    ).length;

  const careerResolved =
    careers.filter(
      (item) =>
        getStatus(item.status) ===
        "resolved"
    ).length;

  /* =========================
     SUMMARY COUNTS
  ========================= */

  const shortlisted =
    dashboard?.careerStatus
      ?.shortlisted ??
    careers.filter(
      (item) =>
        getStatus(item.status) ===
        "shortlisted"
    ).length;

  const newApplications =
    dashboard?.careerStatus?.new ??
    careerNew;

  /* =========================
     RECENT DATA
  ========================= */

  const recentContacts = [
    ...contacts,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  const recentCareers = [
    ...careers,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loader" />

        <p>
          Loading G2G Dashboard...
        </p>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <main className="admin-dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            G2G
          </div>

          <div>
            <strong>
              G2G SERVICES
            </strong>

            <small>
              ADMIN PANEL
            </small>
          </div>

        </div>

        <nav className="admin-nav">

          <button
            className="active"
            onClick={() =>
              goTo("/admin/dashboard")
            }
          >
            <span className="nav-icon">
              ▦
            </span>

            Dashboard
          </button>

          <button
            onClick={() =>
              goTo("/admin/contacts")
            }
          >
            <FaEnvelope />

            Contact Enquiries
          </button>

          <button
            onClick={() =>
              goTo("/admin/careers")
            }
          >
            <FaBriefcase />

            Career Applications
          </button>

          <button
            onClick={() =>
              goTo("/admin/daily-poster")
            }
          >
            <span className="nav-icon">
              ◉
            </span>

            Daily Poster
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={logout}
        >
          <FaSignOutAlt />

          Logout
        </button>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <section className="admin-main">

        {/* =========================
            TOPBAR
        ========================= */}

        <header className="admin-topbar">

          <button
            className="admin-menu-btn"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div className="admin-heading">

            <small>
              ADMINISTRATION
            </small>

            <h1>
              Dashboard
            </h1>

            {lastUpdated && (
              <p className="admin-last-updated">
                Last updated{" "}
                {formatTime(
                  lastUpdated
                )}
              </p>
            )}

          </div>

          <div className="admin-topbar-right">

            <button
              className={`admin-refresh-btn ${
                refreshing
                  ? "refreshing"
                  : ""
              }`}
              onClick={() =>
                loadDashboard(true)
              }
              disabled={refreshing}
              title="Refresh dashboard"
            >
              <FaSyncAlt />

              <span>
                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </span>
            </button>

            <div className="admin-user">

              <div className="admin-user-avatar">
                {admin?.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "A"}
              </div>

              <div>
                <strong>
                  {admin?.name ||
                    "Administrator"}
                </strong>

                <small>
                  {admin?.email}
                </small>
              </div>

            </div>

          </div>

        </header>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* =========================
            TOP SUMMARY
        ========================= */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaEnvelope />
            </div>

            <div>
              <span>
                CONTACT ENQUIRIES
              </span>

              <strong>
                {contactTotal}
              </strong>

              <small>
                {contactNew} new enquiries
              </small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaBriefcase />
            </div>

            <div>
              <span>
                CAREER APPLICATIONS
              </span>

              <strong>
                {careerTotal}
              </strong>

              <small>
                {newApplications} new applications
              </small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>
                SHORTLISTED
              </span>

              <strong>
                {shortlisted}
              </strong>

              <small>
                Candidates shortlisted
              </small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaClock />
            </div>

            <div>
              <span>
                NEW APPLICATIONS
              </span>

              <strong>
                {newApplications}
              </strong>

              <small>
                Requires attention
              </small>
            </div>

          </div>

        </section>

        {/* =========================
            CONTACT + CAREER STATUS
        ========================= */}

        <section className="admin-status-overview">

          {/* CONTACT */}

          <div className="admin-status-group">

            <div className="admin-status-title">

              <div className="admin-status-main-icon">
                <FaEnvelope />
              </div>

              <div>
                <span>
                  CONTACT ENQUIRIES
                </span>

                <h2>
                  Contact Enquiries
                </h2>
              </div>

            </div>

            <div className="admin-status-counts">

              <div className="admin-status-count">

                <span>
                  Total
                </span>

                <strong>
                  {contactTotal}
                </strong>

              </div>

              <div className="admin-status-divider" />

              <div className="admin-status-count">

                <span>
                  New
                </span>

                <strong className="new-count">
                  {contactNew}
                </strong>

              </div>

              <div className="admin-status-divider" />

              <div className="admin-status-count">

                <span>
                  Resolved
                </span>

                <strong className="resolved-count">
                  {contactResolved}
                </strong>

              </div>

            </div>

          </div>

          <div className="admin-status-separator" />

          {/* CAREERS */}

          <div className="admin-status-group">

            <div className="admin-status-title">

              <div className="admin-status-main-icon">
                <FaBriefcase />
              </div>

              <div>
                <span>
                  RECRUITMENT
                </span>

                <h2>
                  Career Applications
                </h2>
              </div>

            </div>

            <div className="admin-status-counts">

              <div className="admin-status-count">

                <span>
                  Total
                </span>

                <strong>
                  {careerTotal}
                </strong>

              </div>

              <div className="admin-status-divider" />

              <div className="admin-status-count">

                <span>
                  New
                </span>

                <strong className="new-count">
                  {careerNew}
                </strong>

              </div>

              <div className="admin-status-divider" />

              <div className="admin-status-count">

                <span>
                  Resolved
                </span>

                <strong className="resolved-count">
                  {careerResolved}
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            CONTENT GRID
        ========================= */}

        <section className="admin-content-grid">

          {/* CONTACT ENQUIRIES */}

          <div className="admin-panel">

            <div className="admin-panel-heading">

              <div>

                <span>
                  RECENT ACTIVITY
                </span>

                <h2>
                  Contact Enquiries
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  goTo(
                    "/admin/contacts"
                  )
                }
              >
                View All
                <span>
                  →
                </span>
              </button>

            </div>

            {recentContacts.length ===
            0 ? (

              <div className="admin-empty">
                No contact enquiries yet.
              </div>

            ) : (

              <div className="admin-table-wrap">

                <table>

                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>

                      <th>
                        Subject
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentContacts.map(
                      (contact) => {

                        const status =
                          getStatus(
                            contact.status
                          );

                        return (
                          <tr
                            key={
                              contact._id
                            }
                          >

                            <td>

                              <strong>
                                {contact.name ||
                                  "Unknown"}
                              </strong>

                              <small>
                                {contact.email ||
                                  "-"}
                              </small>

                            </td>

                            <td>
                              {contact.subject ||
                                "General Enquiry"}
                            </td>

                            <td>

                              <span
                                className={`status ${status
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )}`}
                              >
                                {contact.status ||
                                  "New"}
                              </span>

                            </td>

                            <td>
                              {formatDate(
                                contact.createdAt
                              )}
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* CAREER APPLICATIONS */}

          <div className="admin-panel">

            <div className="admin-panel-heading">

              <div>

                <span>
                  RECRUITMENT
                </span>

                <h2>
                  Career Applications
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  goTo(
                    "/admin/careers"
                  )
                }
              >
                View All
                <span>
                  →
                </span>
              </button>

            </div>

            {recentCareers.length ===
            0 ? (

              <div className="admin-empty">
                No career applications yet.
              </div>

            ) : (

              <div className="admin-career-list">

                {recentCareers.map(
                  (career) => {

                    const status =
                      getStatus(
                        career.status
                      );

                    return (
                      <div
                        className="admin-career-item"
                        key={
                          career._id
                        }
                      >

                        <div className="admin-career-avatar">
                          {career.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "A"}
                        </div>

                        <div className="admin-career-info">

                          <strong>
                            {career.name ||
                              "Applicant"}
                          </strong>

                          <span>
                            {career.position ||
                              career.jobTitle ||
                              "General Application"}
                          </span>

                        </div>

                        <div className="admin-career-right">

                          <span
                            className={`status ${status
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                          >
                            {career.status ||
                              "New"}
                          </span>

                          <small>
                            {formatDate(
                              career.createdAt
                            )}
                          </small>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </section>

        {/* =========================
            BOTTOM
        ========================= */}

        <section className="admin-bottom-grid">

          <div className="admin-welcome-card">

            <span>
              G2G SERVICES
            </span>

            <h2>
              Manage your business
              <br />
              from one place.
            </h2>

            <p>
              Monitor enquiries, career
              applications and website
              activity from your
              administration panel.
            </p>

          </div>

          <div className="admin-contact-card">

            <div className="admin-contact-icon">
              <FaPhone />
            </div>

            <div>

              <span>
                BUSINESS SUPPORT
              </span>

              <strong>
                +91 70800 10039
              </strong>

              <small>
                info@g2gservices.in
              </small>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

export default AdminDashboard;