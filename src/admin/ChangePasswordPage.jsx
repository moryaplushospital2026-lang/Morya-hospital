import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function ChangePasswordPage() {
  const [account, setAccount] = useState({ username: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/admin/me")
      .then((data) => setAccount({ username: data.admin.username, email: data.admin.email }))
      .catch((err) => setMessage(err.message));
  }, []);

  async function updateAccount(event) {
    event.preventDefault();
    try {
      const data = await api.post("/admin/account", account);
      localStorage.setItem("morya_admin_token", data.token);
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function updatePassword(event) {
    event.preventDefault();
    try {
      const data = await api.post("/admin/change-password", passwordForm);
      setMessage(data.message);
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section>
      <div className="admin-page-title">
        <div>
          <span>Security</span>
          <h1>Account Details</h1>
        </div>
      </div>
      {message ? <div className="admin-toast">{message}</div> : null}
      <form onSubmit={updateAccount} className="admin-form-card admin-password-card">
        <h2>Login Username</h2>
        <label>
          Username
          <input
            value={account.username}
            onChange={(event) => setAccount({ ...account, username: event.target.value })}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={account.email}
            onChange={(event) => setAccount({ ...account, email: event.target.value })}
            required
          />
        </label>
        <button type="submit" className="admin-primary-button">
          Update Account
        </button>
      </form>

      <form onSubmit={updatePassword} className="admin-form-card admin-password-card">
        <h2>Change Password</h2>
        <label>
          Current password
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(event) =>
              setPasswordForm({ ...passwordForm, currentPassword: event.target.value })
            }
            required
          />
        </label>
        <label>
          New password
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(event) =>
              setPasswordForm({ ...passwordForm, newPassword: event.target.value })
            }
            minLength={8}
            required
          />
        </label>
        <button type="submit" className="admin-primary-button">
          Update Password
        </button>
      </form>
    </section>
  );
}
