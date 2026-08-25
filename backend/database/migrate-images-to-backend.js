import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ override: true });

function backendPath(value) {
  if (!value) return value;
  return value
    .replace("/content/images/", "/uploads/seed/images/")
    .replace("/content/gallery/", "/uploads/seed/gallery/")
    .replace("/content/insurance/", "/uploads/seed/insurance/");
}

async function migrateTable(conn, table, column) {
  const [rows] = await conn.query(`SELECT id, ${column} AS file_path FROM ${table}`);
  for (const row of rows) {
    const nextPath = backendPath(row.file_path);
    if (nextPath !== row.file_path) {
      await conn.query(`UPDATE ${table} SET ${column} = ? WHERE id = ?`, [nextPath, row.id]);
    }
  }
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "morya_plus_hospital",
  });

  await migrateTable(conn, "blogs", "image");
  await migrateTable(conn, "facilities", "image");
  await migrateTable(conn, "doctors", "photo");
  await migrateTable(conn, "gallery", "image");
  await migrateTable(conn, "insurance_partners", "logo");

  const [rows] = await conn.query(`
    SELECT 'blogs' table_name, COUNT(*) old_paths FROM blogs WHERE image LIKE '/content/%'
    UNION ALL SELECT 'facilities', COUNT(*) FROM facilities WHERE image LIKE '/content/%'
    UNION ALL SELECT 'doctors', COUNT(*) FROM doctors WHERE photo LIKE '/content/%'
    UNION ALL SELECT 'gallery', COUNT(*) FROM gallery WHERE image LIKE '/content/%'
    UNION ALL SELECT 'insurance', COUNT(*) FROM insurance_partners WHERE logo LIKE '/content/%'
  `);
  console.log(rows);
  await conn.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
