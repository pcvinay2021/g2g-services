import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaSyncAlt,
  FaInbox,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";
import { apiUrl } from "../config/api";

import "./ContactEnquiries.css";

function ContactEnquiries() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem("g2g_admin_token");

  const logoutAdmin = () => {
    localStorage.removeItem("g2g_admin_token");
    localStorage.removeItem("g2g_admin");
    navigate("/admin");
  };

  const loadContacts = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      const response = await fetch(
        apiUrl("/api/admin/contacts"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logoutAdmin();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load enquiries."
        );
      }

      setContacts(result.data || []);
    } catch (error) {
      console.error("Load contacts error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    loadContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this enquiry?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        apiUrl(`/api/admin/contacts/${id}`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logoutAdmin();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete enquiry."
        );
      }

      setContacts((prev) =>
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
        apiUrl(`/api/admin/contacts/${id}/status`),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logoutAdmin();
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to update enquiry status."
        );
      }

      setContacts((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status }
            : item
        )
      );

      setSelected((prev) =>
        prev?._id === id
          ? { ...prev, status }
          : prev
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const stats = useMemo(() => {
    return {
      total: contacts.length,
      new: contacts.filter(
        (item) =>
          (item.status || "New") === "New"
      ).length,
      progress: contacts.filter(
        (item) =>
          (item.status || "New") === "In Progress"
      ).length,
      resolved: contacts.filter(
        (item) =>
          (item.status || "New") === "Resolved"
      ).length,
    };
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contacts.filter((item) => {
      const text = `
        ${item.name || ""}
        ${item.email || ""}
        ${item.phone || ""}
        ${item.subject || ""}
        ${item.message || ""}
        ${item.company || ""}
      `.toLowerCase();

      const matchesSearch =
        !query || text.includes(query);

      const currentStatus =
        item.status || "New";

      const matchesStatus =
        statusFilter === "All" ||
        currentStatus === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [contacts, search, statusFilter]);

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

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getStatusClass = (status) => {
    return (status || "New")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <main className="contacts-admin-page">

      {/* HEADER */}

      <header className="contacts-admin-header">

        <div className="contacts-header-left">

          <button
            className="contacts-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FaArrowLeft />
            Dashboard
          </button>

          <span className="contacts-eyebrow">
            G2G SERVICES ADMINISTRATION
          </span>

          <h1>Contact Enquiries</h1>

          <p>
            Manage customer enquiries, follow-ups
            and communication from one place.
          </p>

        </div>

        <button
          className="contacts-refresh"
          onClick={() => loadContacts(true)}
          disabled={refreshing}
        >
          <FaSyncAlt
            className={
              refreshing
                ? "refresh-spinning"
                : ""
            }
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>

      </header>


      {/* STATISTICS */}

      <section className="contacts-stats">

        <div className="contact-stat-card">
          <div className="stat-icon total">
            <FaInbox />
          </div>

          <div>
            <span>Total Enquiries</span>
            <strong>{stats.total}</strong>
          </div>
        </div>


        <div className="contact-stat-card">
          <div className="stat-icon new">
            <FaEnvelope />
          </div>

          <div>
            <span>New</span>
            <strong>{stats.new}</strong>
          </div>
        </div>


        <div className="contact-stat-card">
          <div className="stat-icon progress">
            <FaClock />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.progress}</strong>
          </div>
        </div>


        <div className="contact-stat-card">
          <div className="stat-icon resolved">
            <FaCheckCircle />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{stats.resolved}</strong>
          </div>
        </div>

      </section>


      {/* CONTENT */}

      <section className="contacts-admin-content">

        {/* TOOLBAR */}

        <div className="contacts-toolbar">

          <div className="contacts-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search name, email, phone, subject..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}

          </div>


          <div className="contacts-filter">

            <label>STATUS</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Enquiries
              </option>

              <option value="New">
                New
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>
            </select>

          </div>

        </div>


        {/* RESULT INFO */}

        <div className="contacts-result-bar">

          <div>
            Showing{" "}
            <strong>
              {filteredContacts.length}
            </strong>{" "}
            of{" "}
            <strong>{contacts.length}</strong>{" "}
            enquiries
          </div>

          {(search || statusFilter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              Clear Filters
            </button>
          )}

        </div>


        {/* TABLE */}

        <div className="contacts-table-card">

          {loading ? (

            <div className="contacts-empty">

              <div className="loading-spinner"></div>

              <h3>
                Loading enquiries...
              </h3>

              <p>
                Please wait while we fetch the
                latest enquiries.
              </p>

            </div>

          ) : filteredContacts.length === 0 ? (

            <div className="contacts-empty">

              <div className="empty-icon">
                <FaEnvelope />
              </div>

              <h3>
                No enquiries found
              </h3>

              <p>
                Try changing your search or
                status filter.
              </p>

            </div>

          ) : (

            <div className="contacts-table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>CUSTOMER</th>
                    <th>PHONE</th>
                    <th>SUBJECT</th>
                    <th>STATUS</th>
                    <th>RECEIVED</th>
                    <th>ACTION</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredContacts.map((item) => {

                    const status =
                      item.status || "New";

                    return (
                      <tr
                        key={item._id}
                        className={
                          status === "New"
                            ? "is-new"
                            : ""
                        }
                      >

                        <td>

                          <div className="contact-person">

                            <div className="contact-avatar">
                              {item.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "?"}
                            </div>

                            <div className="contact-person-info">

                              <strong>
                                {item.name ||
                                  "Unknown Customer"}
                              </strong>

                              <a
                                href={`mailto:${item.email}`}
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >
                                {item.email ||
                                  "No email"}
                              </a>

                              {item.company && (
                                <small>
                                  <FaBuilding />
                                  {item.company}
                                </small>
                              )}

                            </div>

                          </div>

                        </td>


                        <td>

                          {item.phone ? (
                            <a
                              href={`tel:${item.phone}`}
                              className="contact-phone"
                            >
                              <FaPhone />
                              {item.phone}
                            </a>
                          ) : (
                            <span className="muted">
                              -
                            </span>
                          )}

                        </td>


                        <td>

                          <div className="contact-subject">

                            <strong>
                              {item.subject ||
                                "General Enquiry"}
                            </strong>

                            {item.message && (
                              <small>
                                {item.message}
                              </small>
                            )}

                          </div>

                        </td>


                        <td>

                          <select
                            className={`contact-status ${getStatusClass(
                              status
                            )}`}
                            value={status}
                            onChange={(e) =>
                              updateStatus(
                                item._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="New">
                              New
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>
                          </select>

                        </td>


                        <td>

                          <div className="contact-date">

                            <strong>
                              {formatDate(
                                item.createdAt
                              )}
                            </strong>

                            <small>
                              {new Date(
                                item.createdAt
                              ).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </small>

                          </div>

                        </td>


                        <td>

                          <div className="contact-actions">

                            <button
                              className="view-btn"
                              onClick={() =>
                                setSelected(item)
                              }
                              title="View enquiry"
                            >
                              <FaEye />
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                deleteContact(
                                  item._id
                                )
                              }
                              title="Delete enquiry"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>


      {/* DETAILS MODAL */}

      {selected && (

        <div
          className="contact-modal-overlay"
          onClick={() => setSelected(null)}
        >

          <div
            className="contact-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="contact-modal-header">

              <div className="modal-title">

                <span>ENQUIRY DETAILS</span>

                <h2>
                  {selected.name ||
                    "Customer Enquiry"}
                </h2>

                <small>
                  Received{" "}
                  {formatDateTime(
                    selected.createdAt
                  )}
                </small>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelected(null)
                }
                title="Close"
              >
                <FaTimes />
              </button>

            </div>


            {/* CUSTOMER INFO */}

            <div className="contact-modal-info">

              <div className="modal-info-card">

                <small>EMAIL</small>

                <a
                  href={`mailto:${selected.email}`}
                >
                  <FaEnvelope />
                  {selected.email || "-"}
                </a>

              </div>


              <div className="modal-info-card">

                <small>PHONE</small>

                <a
                  href={`tel:${selected.phone}`}
                >
                  <FaPhone />
                  {selected.phone || "-"}
                </a>

              </div>


              <div className="modal-info-card">

                <small>STATUS</small>

                <select
                  className={`contact-status large ${getStatusClass(
                    selected.status
                  )}`}
                  value={
                    selected.status || "New"
                  }
                  onChange={(e) =>
                    updateStatus(
                      selected._id,
                      e.target.value
                    )
                  }
                >
                  <option value="New">
                    New
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>
                </select>

              </div>


              <div className="modal-info-card">

                <small>RECEIVED</small>

                <strong>
                  {formatDateTime(
                    selected.createdAt
                  )}
                </strong>

              </div>


              <div className="modal-info-card">

                <small>SUBJECT</small>

                <strong>
                  {selected.subject ||
                    "General Enquiry"}
                </strong>

              </div>


              {selected.company && (
                <div className="modal-info-card">

                  <small>COMPANY</small>

                  <strong>
                    {selected.company}
                  </strong>

                </div>
              )}

            </div>


            {/* MESSAGE */}

            <div className="contact-message">

              <div className="message-heading">
                <small>MESSAGE</small>
              </div>

              <div className="message-box">

                {selected.message ||
                  "No message provided."}

              </div>

            </div>


            {/* ACTIONS */}

            <div className="contact-modal-actions">

              {selected.email && (
                <a
                  className="email-action"
                  href={`mailto:${selected.email}`}
                >
                  <FaEnvelope />
                  Reply by Email
                </a>
              )}

              {selected.phone && (
                <a
                  className="phone-action"
                  href={`tel:${selected.phone}`}
                >
                  <FaPhone />
                  Call Customer
                </a>
              )}

              <button
                className="modal-delete-action"
                onClick={() =>
                  deleteContact(selected._id)
                }
              >
                <FaTrash />
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default ContactEnquiries;