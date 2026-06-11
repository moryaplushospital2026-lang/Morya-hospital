import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

const cards = [
  ["blogs", "Total Blogs"],
  ["departments", "Total Departments"],
  ["doctors", "Total Doctors"],
  ["facilities", "Total Facilities"],
  ["gallery", "Total Gallery Images"],
  ["insurance", "Total Insurance Partners"],
];

export function DashboardPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then(setCounts)
      .catch(() => setCounts({}));
  }, []);

  return (
    <section>
      <div className="admin-page-title">
        <div>
          <span>Overview</span>
          <h1>Dashboard</h1>
        </div>
        <Link to="/" className="admin-secondary-button">
          View Website
        </Link>
      </div>
      <div className="admin-card-grid">
        {cards.map(([key, label]) => (
          <article key={key} className="admin-stat-card">
            <span>{label}</span>
            <strong>{counts[key] ?? 0}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
