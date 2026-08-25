function normalizeApiBase(value) {
  const base = (value || "http://localhost:5001/api").replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
}

const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL);
const UPLOAD_BASE = API_BASE.replace(/\/api\/?$/, "");

export function assetUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:") || path.startsWith("/src/")) {
    return path;
  }
  return `${UPLOAD_BASE}${path}`;
}

function token() {
  return localStorage.getItem("morya_admin_token");
}

async function request(path, options = {}) {
  const headers = options.body instanceof FormData ? {} : { "Content-Type": "application/json" };
  if (token()) headers.Authorization = `Bearer ${token()}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    let message = "Something went wrong";
    if (isJson) {
      const error = await response.json();
      message = error.message || message;
    } else {
      message = response.statusText;
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  if (!isJson) {
    throw new Error("Backend API is not connected. Check Hostinger Node app and /api routing.");
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  formPost: (path, body) => request(path, { method: "POST", body }),
  formPut: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export async function fetchWithFallback(path, fallback) {
  try {
    const data = await api.get(path);
    return data.length ? data : fallback;
  } catch {
    return fallback;
  }
}
