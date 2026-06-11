import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Building2,
  FileText,
  HeartPulse,
  Image,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import "./admin.css";

const adminBase = "/morya_plus_the_admin_access_mp";

const links = [
  { to: `${adminBase}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
  { to: `${adminBase}/blogs`, label: "Blogs", icon: FileText },
  { to: `${adminBase}/departments`, label: "Departments", icon: HeartPulse },
  { to: `${adminBase}/facilities`, label: "Facilities", icon: Building2 },
  { to: `${adminBase}/doctors`, label: "Doctors", icon: Stethoscope },
  { to: `${adminBase}/gallery`, label: "Gallery", icon: Image },
  { to: `${adminBase}/insurance`, label: "Insurance", icon: ShieldCheck },
  { to: `${adminBase}/change-password`, label: "Password", icon: UserRound },
];

export function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("morya_admin_token");
    navigate(`${adminBase}/login`);
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>MP</span>
          <div>
            <strong>Morya Plus</strong>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={logout} className="admin-logout">
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
