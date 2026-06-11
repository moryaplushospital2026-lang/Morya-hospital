import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ override: true });

const healthInsuranceNames = [
  "Aditya Birla Health Insurance Company Limited",
  "Care Health Insurance Limited",
  "Galaxy Health Insurance Company Limited",
  "ManipalCigna Health Insurance Company Limited",
  "Narayana Health Insurance Limited",
  "Niva Bupa Health Insurance Company Limited",
  "Star Health Allied Insurance Company Limited",
];

async function columnExists(conn) {
  const [rows] = await conn.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = ? AND table_name = 'insurance_partners' AND column_name = 'category'
    `,
    [process.env.DB_NAME || "morya_plus_hospital"],
  );
  return rows.length > 0;
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "morya_plus_hospital",
  });

  if (!(await columnExists(conn))) {
    await conn.query(`
      ALTER TABLE insurance_partners
      ADD COLUMN category ENUM('Health Insurance','General Insurance') DEFAULT 'General Insurance'
      AFTER description
    `);
  }

  await conn.query("UPDATE insurance_partners SET category = 'General Insurance'");
  await conn.query(
    `UPDATE insurance_partners SET category = 'Health Insurance' WHERE company_name IN (${healthInsuranceNames.map(() => "?").join(", ")})`,
    healthInsuranceNames,
  );

  const [counts] = await conn.query(`
    SELECT category, COUNT(*) total
    FROM insurance_partners
    GROUP BY category
    ORDER BY category
  `);
  console.log(counts);
  await conn.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
