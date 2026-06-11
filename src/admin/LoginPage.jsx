import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import "./admin.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.post("/admin/login", form);
      localStorage.setItem("morya_admin_token", data.token);
      navigate("/morya_plus_the_admin_access_mp/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form onSubmit={submit} className="admin-login-card">
        <span className="admin-login-mark">MP</span>
        <h1>Morya Plus Admin</h1>
        <p>Manage website content, images, doctors, blogs, facilities, and insurance partners.</p>
        {error ? <div className="admin-alert">{error}</div> : null}
        <label>
          Email or username
          <input
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
