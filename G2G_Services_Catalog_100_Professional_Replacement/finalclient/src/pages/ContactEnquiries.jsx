import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaTrash,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { apiUrl } from "../config/api";

import "./ContactEnquiries.css";

function ContactEnquiries() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("g2g_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
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
        localStorage.removeItem("g2g_admin_token");
        navigate("/admin");
        return;
      }

      setContacts(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
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
        localStorage.removeItem("g2g_admin_token");
        localStorage.removeItem("g2g_admin");
        navigate("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Unable to update enquiry status.");
      }

      setContacts((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );

      if (selected?._id === id) {
        setSelected({ ...selected, status });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredContacts = contacts.filter((item) => {
    const text = `
      ${item.name || ""}
      ${item.email || ""}
      ${item.phone || ""}
      ${item.subject || ""}
      ${item.message || ""}
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

  return (
    <main className="contacts-admin-page">

      <header className="contacts-admin-header">

        <div>

          <button
            className="contacts-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <FaArrowLeft />
            Dashboard
          </button>

          <span>G2G SERVICES ADMIN</span>

          <h1>Contact Enquiries</h1>

          <p>
            Manage enquiries received from the
            G2G Services website.
          </p>

        </div>

        <div className="contacts-count">
          <strong>{contacts.length}</strong>
          <small>Total Enquiries</small>
        </div>

      </header>


      <section className="contacts-admin-content">

        {/* SEARCH */}

        <div className="contacts-toolbar">

          <div className="contacts-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search name, email, phone or subject..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        {/* TABLE */}

        <div className="contacts-table-card">

          {loading ? (

            <div className="contacts-empty">
              Loading enquiries...
            </div>

          ) : filteredContacts.length === 0 ? (

            <div className="contacts-empty">
              <FaEnvelope />

              <h3>
                No enquiries found
              </h3>

              <p>
                New website enquiries will appear here.
              </p>
            </div>

          ) : (

            <div className="contacts-table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>CONTACT</th>
                    <th>PHONE</th>
                    <th>SUBJECT</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredContacts.map((item) => (

                    <tr key={item._id}>

                      <td>

                        <div className="contact-person">

                          <div className="contact-avatar">
                            {item.name
                              ?.charAt(0)
                              ?.toUpperCase() || "?"}
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

                      <td>
                        <a
                          href={`tel:${item.phone}`}
                          className="contact-phone"
                        >
                          <FaPhone />
                          {item.phone || "-"}
                        </a>
                      </td>

                      <td>
                        {item.subject ||
                          "General Enquiry"}
                      </td>

                      <td>
                        <select
                          className={`contact-status ${(item.status || "New").toLowerCase().replace(/\s+/g, "-")}`}
                          value={item.status || "New"}
                          onChange={(e) => updateStatus(item._id, e.target.value)}
                        >
                          <option>New</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>
                      </td>

                      <td>
                        {formatDate(
                          item.createdAt
                        )}
                      </td>

                      <td>

                        <div className="contact-actions">

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelected(item)
                            }
                            title="View"
                          >
                            <FaEye />
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteContact(item._id)
                            }
                            title="Delete"
                          >
                            <FaTrash />
                          </button>

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

              <div>

                <span>ENQUIRY DETAILS</span>

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


            <div className="contact-modal-info">

              <div>
                <small>EMAIL</small>

                <a
                  href={`mailto:${selected.email}`}
                >
                  {selected.email}
                </a>
              </div>

              <div>
                <small>PHONE</small>

                <a
                  href={`tel:${selected.phone}`}
                >
                  {selected.phone || "-"}
                </a>
              </div>

              <div>
                <small>STATUS</small>
                <select
                  className="contact-status large"
                  value={selected.status || "New"}
                  onChange={(e) => updateStatus(selected._id, e.target.value)}
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div>
                <small>DATE</small>

                <strong>
                  {formatDate(
                    selected.createdAt
                  )}
                </strong>
              </div>

              <div>
                <small>SUBJECT</small>

                <strong>
                  {selected.subject ||
                    "General Enquiry"}
                </strong>
              </div>

            </div>


            <div className="contact-message">

              <small>MESSAGE</small>

              <p>
                {selected.message ||
                  "No message provided."}
              </p>

            </div>


            <div className="contact-modal-actions">

              <a
                href={`mailto:${selected.email}`}
              >
                <FaEnvelope />
                Reply by Email
              </a>

              <a
                href={`tel:${selected.phone}`}
              >
                <FaPhone />
                Call Customer
              </a>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default ContactEnquiries;
