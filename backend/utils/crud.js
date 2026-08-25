import { query } from "../config/db.js";

const tables = {
  blogs: {
    table: "blogs",
    image: "image",
    columns: [
      "title",
      "slug",
      "image",
      "short_description",
      "full_content",
      "meta_title",
      "meta_description",
      "status",
    ],
    publicOrder: "created_at DESC",
  },
  departments: {
    table: "departments",
    image: "image",
    columns: ["name", "slug", "image", "short_description", "full_content", "facilities", "status"],
    publicOrder: "name ASC",
  },
  facilities: {
    table: "facilities",
    image: "image",
    columns: ["title", "image", "description", "status"],
    publicOrder: "title ASC",
  },
  doctors: {
    table: "doctors",
    image: "photo",
    columns: [
      "photo",
      "name",
      "designation",
      "qualification",
      "specialization",
      "experience",
      "description",
      "department_id",
      "status",
    ],
    publicOrder: "name ASC",
  },
  gallery: {
    table: "gallery",
    image: "image",
    columns: ["image", "title", "category", "status"],
    publicOrder: "created_at DESC",
  },
  insurance: {
    table: "insurance_partners",
    image: "logo",
    columns: ["company_name", "logo", "description", "category", "status"],
    publicOrder: "company_name ASC",
  },
};

function configFor(resource) {
  const config = tables[resource];
  if (!config) throw new Error(`Unknown resource: ${resource}`);
  return config;
}

export async function listPublic(resource) {
  const config = configFor(resource);
  return query(
    `SELECT * FROM ${config.table} WHERE status = 'Active' ORDER BY ${config.publicOrder}`,
  );
}

export async function listAdmin(resource) {
  const config = configFor(resource);
  return query(`SELECT * FROM ${config.table} ORDER BY updated_at DESC, id DESC`);
}

export async function getBySlug(resource, slug) {
  const config = configFor(resource);
  const rows = await query(`SELECT * FROM ${config.table} WHERE slug = ? AND status = 'Active'`, [
    slug,
  ]);
  return rows[0] || null;
}

export async function createItem(resource, body, imagePath) {
  const config = configFor(resource);
  const data = { ...body };
  if (imagePath) data[config.image] = imagePath;
  const columns = config.columns.filter((column) => data[column] !== undefined);
  const placeholders = columns.map(() => "?").join(", ");
  const values = columns.map((column) => data[column] || null);
  const result = await query(
    `INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`,
    values,
  );
  return { id: result.insertId };
}

export async function updateItem(resource, id, body, imagePath) {
  const config = configFor(resource);
  const data = { ...body };
  if (imagePath) data[config.image] = imagePath;
  const columns = config.columns.filter((column) => data[column] !== undefined);
  const values = columns.map((column) => data[column] || null);
  await query(
    `UPDATE ${config.table} SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE id = ?`,
    [...values, id],
  );
}

export async function deleteItem(resource, id) {
  const config = configFor(resource);
  await query(`DELETE FROM ${config.table} WHERE id = ?`, [id]);
}

export async function dashboardCounts() {
  const resources = ["blogs", "departments", "doctors", "facilities", "gallery", "insurance"];
  const entries = await Promise.all(
    resources.map(async (resource) => {
      const config = configFor(resource);
      const rows = await query(`SELECT COUNT(*) AS total FROM ${config.table}`);
      return [resource, rows[0].total];
    }),
  );
  return Object.fromEntries(entries);
}
