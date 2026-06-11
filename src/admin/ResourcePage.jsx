import { useCallback, useEffect, useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2, Upload } from "lucide-react";
import { adminModules } from "./adminConfig";
import { api, assetUrl } from "@/services/api";

function emptyForm(module) {
  return Object.fromEntries(
    module.fields.map(([name]) => [name, name === "status" ? "Active" : ""]),
  );
}

export function ResourcePage({ resource }) {
  const module = adminModules[resource];
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm(module));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.get(`/admin/${module.endpoint}`));
    } finally {
      setLoading(false);
    }
  }, [module.endpoint]);

  useEffect(() => {
    load();
  }, [load, resource]);

  useEffect(() => {
    if (resource !== "doctors") return;

    api
      .get("/admin/departments")
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, [resource]);

  const visibleItems = useMemo(() => {
    const search = query.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(search));
  }, [items, query]);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm(module));
    setFile(null);
    setPreview("");
  }

  function startEdit(item) {
    setEditing(item);
    setForm({ ...emptyForm(module), ...item });
    setPreview(assetUrl(item[module.imageField]));
    setFile(null);
  }

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    const body = new FormData();
    module.fields.forEach(([name]) => body.append(name, form[name] ?? ""));
    if (file) body.append("image", file);
    if (!file && editing?.[module.imageField])
      body.append(module.imageField, editing[module.imageField]);

    try {
      if (editing) {
        await api.formPut(`/admin/${module.endpoint}/${editing.id}`, body);
        setMessage("Updated successfully");
      } else {
        await api.formPost(`/admin/${module.endpoint}`, body);
        setMessage("Created successfully");
      }
      startCreate();
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function remove(item) {
    if (!window.confirm("Delete this record?")) return;
    await api.delete(`/admin/${module.endpoint}/${item.id}`);
    setMessage("Deleted successfully");
    await load();
  }

  return (
    <section>
      <div className="admin-page-title">
        <div>
          <span>Content Management</span>
          <h1>{module.title}</h1>
        </div>
        <button type="button" onClick={startCreate} className="admin-primary-button">
          <Plus size={18} /> Add New
        </button>
      </div>

      {message ? <div className="admin-toast">{message}</div> : null}

      <div className="admin-work-grid">
        <form onSubmit={submit} className="admin-form-card">
          <h2>{editing ? `Edit ${module.title}` : `Add ${module.title}`}</h2>
          <label className="admin-upload">
            <Upload size={18} />
            Upload image/photo/logo
            <small>JPG, PNG, WEBP, SVG up to 5 MB</small>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={(event) => {
                const selected = event.target.files?.[0] || null;
                setFile(selected);
                setPreview(selected ? URL.createObjectURL(selected) : "");
              }}
            />
          </label>
          {preview ? <img src={preview} alt="Preview" className="admin-preview" /> : null}

          {module.fields.map(([name, label, type, required]) => (
            <label key={name}>
              {label}
              {type === "textarea" ? (
                <textarea
                  value={form[name] ?? ""}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                  required={required}
                  rows={name === "full_content" ? 7 : 3}
                />
              ) : type === "select" ? (
                <select
                  value={form[name] || "Active"}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              ) : type === "department" ? (
                <select
                  value={form[name] ?? ""}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                >
                  <option value="">No department selected</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              ) : type === "insuranceCategory" ? (
                <select
                  value={form[name] || "General Insurance"}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                  required={required}
                >
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="General Insurance">General Insurance</option>
                </select>
              ) : (
                <input
                  type={type}
                  value={form[name] ?? ""}
                  onChange={(event) => setForm({ ...form, [name]: event.target.value })}
                  required={required}
                />
              )}
            </label>
          ))}
          <button type="submit" className="admin-primary-button">
            {editing ? "Update" : "Save"}
          </button>
        </form>

        <div className="admin-table-card">
          <div className="admin-table-tools">
            <div className="admin-search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search records..."
              />
            </div>
            <span>{visibleItems.length} records</span>
          </div>

          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  {module.columns.map((column) => (
                    <th key={column}>{column.replace(/_/g, " ")}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={module.columns.length + 2}>Loading...</td>
                  </tr>
                ) : visibleItems.length ? (
                  visibleItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item[module.imageField] ? (
                          <img
                            src={assetUrl(item[module.imageField])}
                            alt=""
                            className="admin-thumb"
                          />
                        ) : (
                          <span className="admin-empty-thumb">-</span>
                        )}
                      </td>
                      {module.columns.map((column) => (
                        <td key={column}>{item[column] || "-"}</td>
                      ))}
                      <td>
                        <div className="admin-actions">
                          <button type="button" onClick={() => startEdit(item)} aria-label="Edit">
                            <Edit3 size={16} />
                          </button>
                          <button type="button" onClick={() => remove(item)} aria-label="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={module.columns.length + 2}>No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
