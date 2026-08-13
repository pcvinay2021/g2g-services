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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("g2g_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

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

        fetch(
          apiUrl("/api/admin/dashboard"),
          {
            headers,
          }
        ),

        fetch(
          apiUrl("/api/admin/contacts"),
          {
            headers,
          }
        ),

        fetch(
          apiUrl("/api/admin/careers"),
          {
            headers,
          }
        ),
      ]);

      if ([
        profileResponse,
        dashboardResponse,
        contactsResponse,
        careersResponse,
      ].some((response) => response.status === 401)) {
        logout();
        return;
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
          profile.message || "Unable to load profile."
        );
      }

      setAdmin(profile.data);

      setDashboard(dashboardData.data);

      setContacts(
        contactsData.data || []
      );

      setCareers(
        careersData.data || []
      );

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "g2g_admin_token"
    );

    localStorage.removeItem(
      "g2g_admin"
    );

    navigate("/admin");
  };

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

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loader" />
        <p>Loading G2G Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="admin-dashboard">

      {/* SIDEBAR */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            G2G
          </div>

          <div>
            <strong>G2G SERVICES</strong>
            <small>ADMIN PANEL</small>
          </div>

        </div>


        <nav className="admin-nav">

          <button className="active">
            <span>▦</span>
            Dashboard
          </button>

          <button
           onClick={() =>
            navigate("/admin/contacts")
              }
                >
                <FaEnvelope />
                Contact Enquiries
              </button>

          <button
                onClick={() =>
                  navigate("/admin/careers")
                }
              >
                <FaBriefcase />
                Career Applications
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


      {/* MAIN */}

      <section className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <button
            className="admin-menu-btn"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            <FaBars />
          </button>

          <div>
            <small>ADMINISTRATION</small>
            <h1>Dashboard</h1>
          </div>


          <div className="admin-user">

            <div className="admin-user-avatar">
              {admin?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div>
              <strong>
                {admin?.name || "Administrator"}
              </strong>

              <small>
                {admin?.email}
              </small>
            </div>

          </div>

        </header>


        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* SUMMARY */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaEnvelope />
            </div>

            <div>
              <span>CONTACT ENQUIRIES</span>
              <strong>
                {dashboard?.totalContacts || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaBriefcase />
            </div>

            <div>
              <span>CAREER APPLICATIONS</span>
              <strong>
                {dashboard?.totalCareers || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>SHORTLISTED</span>
              <strong>
                {dashboard?.careerStatus
                  ?.shortlisted || 0}
              </strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <FaClock />
            </div>

            <div>
              <span>NEW APPLICATIONS</span>
              <strong>
                {dashboard?.careerStatus?.new ||
                  0}
              </strong>
            </div>

          </div>

        </section>


        {/* CONTENT GRID */}

        <section className="admin-content-grid">

          {/* CONTACTS */}

          <div className="admin-panel">

            <div className="admin-panel-heading">

              <div>
                <span>RECENT ACTIVITY</span>
                <h2>Contact Enquiries</h2>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/contacts")}
              >
                View All
              </button>

            </div>


            {contacts.length === 0 ? (

              <div className="admin-empty">
                No contact enquiries yet.
              </div>

            ) : (

              <div className="admin-table-wrap">

                <table>

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Phone</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>

                    {contacts
                      .slice(0, 5)
                      .map((contact) => (

                        <tr key={contact._id}>

                          <td>
                            <strong>
                              {contact.name}
                            </strong>

                            <small>
                              {contact.email}
                            </small>
                          </td>

                          <td>
                            {contact.subject ||
                              "General Enquiry"}
                          </td>

                          <td>
                            {contact.phone ||
                              "-"}
                          </td>

                          <td>
                            {formatDate(
                              contact.createdAt
                            )}
                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>


          {/* CAREERS */}

          <div className="admin-panel">

            <div className="admin-panel-heading">

              <div>
                <span>RECRUITMENT</span>
                <h2>Career Applications</h2>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/careers")}
              >
                View All
              </button>

            </div>


            {careers.length === 0 ? (

              <div className="admin-empty">
                No career applications yet.
              </div>

            ) : (

              <div className="admin-career-list">

                {careers
                  .slice(0, 5)
                  .map((career) => (

                    <div
                      className="admin-career-item"
                      key={career._id}
                    >

                      <div className="admin-career-avatar">
                        {career.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div className="admin-career-info">

                        <strong>
                          {career.name}
                        </strong>

                        <span>
                          {career.position ||
                            "General Application"}
                        </span>

                      </div>

                      <div className="admin-career-right">

                        <span
                          className={`status ${
                            (
                              career.status ||
                              "New"
                            )
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
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

                  ))}

              </div>

            )}

          </div>

        </section>


        {/* QUICK INFO */}

        <section className="admin-bottom-grid">

          <div className="admin-welcome-card">

            <span>G2G SERVICES</span>

            <h2>
              Manage your business
              <br />
              from one place.
            </h2>

            <p>
              Monitor enquiries, career
              applications and website activity
              from your administration panel.
            </p>

          </div>


          <div className="admin-contact-card">

            <div className="admin-contact-icon">
              <FaPhone />
            </div>

            <div>
              <span>BUSINESS SUPPORT</span>

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
