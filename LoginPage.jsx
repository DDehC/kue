// frontend/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { setRole, ROLE_LANDING } from "../utils/landing";
import "../App.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword]     = useState("");
  const [remember, setRemember]     = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ username, password, remember });
      const role = (res?.user && typeof res.user.role === "string" && ["student","staff","admin"].includes(res.user.role))
    ? res.user.role
    : "guest";
      setRole(role);
      navigate(ROLE_LANDING[role] || "/");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bare-main" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="auth-card" style={{ width: "100%", maxWidth: 520 }}>
        <h1 className="login-title">Sign in</h1>
        <form className="login-form" onSubmit={handleSubmit} style={{ alignItems: "stretch" }}>
          <label>
            Username or email
            <input
              placeholder="your.name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Exactly like your reference: checkbox left, text right, single line, left-aligned */}
          <label
            htmlFor="remember"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              width: "auto",
              margin: "6px 0 12px 0",
              alignSelf: "flex-start"
            }}
          >
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ margin: 0 }}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" disabled={loading || !username || !password}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && (
            <div style={{ color: "#b91c1c", fontSize: ".9rem" }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

