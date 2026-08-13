import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { apiUrl } from "../config/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        apiUrl("/api/admin/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Login failed."
        );
      }

      localStorage.setItem(
        "g2g_admin_token",
        result.token
      );

      localStorage.setItem(
        "g2g_admin",
        JSON.stringify(result.admin)
      );

      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Admin login:", err);

      setError(
        err.message ||
        "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-brand">
          <div className="admin-logo">
            G2G
          </div>

          <span>G2G SERVICES</span>
        </div>


        <div className="admin-login-heading">

          <small>ADMINISTRATION</small>

          <h1>
            Welcome back.
          </h1>

          <p>
            Sign in to manage your G2G Services
            website.
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="admin-input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@g2gservices.in"
              required
            />

          </div>


          <div className="admin-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
            />

          </div>


          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>


        <div className="admin-login-footer">
          G2G Services Administration
        </div>

      </div>

    </main>
  );
}

export default AdminLogin;
