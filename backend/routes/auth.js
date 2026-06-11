import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { query } from "../config/db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

function signAdminToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email, username: admin.username },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "8h" },
  );
}

router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const login = email || username;

  if (!login || !password) {
    return res.status(400).json({ message: "Email/username and password are required" });
  }

  const admins = await query("SELECT * FROM admins WHERE email = ? OR username = ? LIMIT 1", [
    login,
    login,
  ]);
  const admin = admins[0];

  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
    return res.status(401).json({ message: "Invalid login details" });
  }

  const token = signAdminToken(admin);

  return res.json({ token, admin: { email: admin.email, username: admin.username } });
});

router.get("/me", requireAdmin, async (req, res) => {
  const admins = await query("SELECT id, username, email FROM admins WHERE id = ? LIMIT 1", [
    req.admin.id,
  ]);
  const admin = admins[0];

  if (!admin) {
    return res.status(404).json({ message: "Admin account not found" });
  }

  return res.json({ admin });
});

router.post("/account", requireAdmin, async (req, res) => {
  const username = String(req.body.username || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();

  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address" });
  }

  const duplicates = await query(
    "SELECT id FROM admins WHERE (email = ? OR username = ?) AND id <> ? LIMIT 1",
    [email, username, req.admin.id],
  );

  if (duplicates.length) {
    return res.status(409).json({ message: "Username or email is already used" });
  }

  await query("UPDATE admins SET username = ?, email = ? WHERE id = ?", [
    username,
    email,
    req.admin.id,
  ]);

  const admin = { id: req.admin.id, username, email };
  const token = signAdminToken(admin);
  return res.json({ message: "Account details updated", token, admin });
});

router.post("/change-password", requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "Current password and 8+ character new password required" });
  }

  const admins = await query("SELECT * FROM admins WHERE id = ? LIMIT 1", [req.admin.id]);
  const admin = admins[0];
  if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash))) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await query("UPDATE admins SET password_hash = ? WHERE id = ?", [hash, admin.id]);
  return res.json({ message: "Password updated" });
});

export default router;
