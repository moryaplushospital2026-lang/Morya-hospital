import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ override: true });

const uniqueIndexes = [
  ["facilities", "uq_facilities_title", "title"],
  ["doctors", "uq_doctors_name", "name"],
  ["gallery", "uq_gallery_image", "image"],
  ["insurance_partners", "uq_insurance_company_name", "company_name"],
];

async function addUnique(conn, table, indexName, column) {
  try {
    await conn.query(`ALTER TABLE ${table} ADD UNIQUE KEY ${indexName} (${column})`);
  } catch (error) {
    if (!String(error.message).includes("Duplicate key name")) {
      throw error;
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

  await conn.query(`
    DELETE f1 FROM facilities f1
    JOIN facilities f2 ON f1.title = f2.title AND f1.id > f2.id
  `);

  for (const [table, indexName, column] of uniqueIndexes) {
    await addUnique(conn, table, indexName, column);
  }

  const [counts] = await conn.query(`
    SELECT
      (SELECT COUNT(*) FROM departments) departments,
      (SELECT COUNT(*) FROM facilities) facilities,
      (SELECT COUNT(*) FROM doctors) doctors,
      (SELECT COUNT(*) FROM blogs) blogs,
      (SELECT COUNT(*) FROM gallery) gallery,
      (SELECT COUNT(*) FROM insurance_partners) insurance
  `);
  console.log(counts[0]);
  await conn.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
