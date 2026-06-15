import fs from "fs";
import path from "path";
import {
  blogs,
  departments,
  displayName,
  doctors,
  facilities,
  healthInsuranceNames,
  upload,
} from "./seed-current-content.js";

const schemaPath = path.resolve("backend/database/schema-hostinger.sql");
const outputPath = path.resolve("backend/database/hostinger-full-import.sql");

function sql(value) {
  if (value === null || value === undefined || value === "") return "NULL";
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function upsert(table, columns, values, updateColumns) {
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values
    .map((row) => `(${row.map(sql).join(", ")})`)
    .join(",\n")}\nON DUPLICATE KEY UPDATE ${updateColumns
    .map((column) => `${column} = VALUES(${column})`)
    .join(", ")};\n`;
}

const image = (name) => upload("images", name);
const sections = [
  fs.readFileSync(schemaPath, "utf8").trim(),
  [
    "SET FOREIGN_KEY_CHECKS = 0;",
    "DELETE FROM gallery;",
    "DELETE FROM insurance_partners;",
    "DELETE FROM doctors;",
    "DELETE FROM facilities;",
    "DELETE FROM blogs;",
    "DELETE FROM departments;",
    "SET FOREIGN_KEY_CHECKS = 1;",
  ].join("\n"),
  upsert(
    "departments",
    ["slug", "name", "short_description", "full_content", "facilities", "conditions", "status"],
    departments.map(([slug, name, short, full, facilitiesText, conditions]) => [
      slug,
      name,
      short,
      full,
      facilitiesText,
      conditions,
      "Active",
    ]),
    ["name", "short_description", "full_content", "facilities", "conditions", "status"],
  ),
  upsert(
    "facilities",
    ["title", "image", "description", "status"],
    facilities.map(([title, imagePath, description]) => [title, imagePath, description, "Active"]),
    ["image", "description", "status"],
  ),
  upsert(
    "doctors",
    ["name", "designation", "qualification", "specialization", "experience", "description", "photo", "status"],
    doctors.map(([name, designation, qualification, specialization, experience, description, photo]) => [
      name,
      designation,
      qualification,
      specialization,
      experience,
      description,
      photo,
      "Active",
    ]),
    ["designation", "qualification", "specialization", "experience", "description", "photo", "status"],
  ),
  upsert(
    "blogs",
    ["slug", "title", "image", "short_description", "full_content", "meta_title", "meta_description", "status"],
    blogs.map(([slug, title, imagePath, shortDescription, metaDescription, content]) => [
      slug,
      title,
      imagePath,
      shortDescription,
      content.join("\n\n"),
      title,
      metaDescription,
      "Active",
    ]),
    ["title", "image", "short_description", "full_content", "meta_title", "meta_description", "status"],
  ),
];

const galleryDir = path.resolve("backend/uploads/seed/gallery");
const galleryRows = fs
  .readdirSync(galleryDir)
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .map((fileName) => [
    upload("gallery", fileName),
    displayName(fileName),
    "Hospital",
    "Active",
  ]);

if (galleryRows.length) {
  sections.push(
    upsert(
      "gallery",
      ["image", "title", "category", "status"],
      galleryRows,
      ["title", "category", "status"],
    ),
  );
}

const insuranceDir = path.resolve("backend/uploads/seed/insurance");
const seenInsuranceNames = new Set();
const insuranceRows = fs
  .readdirSync(insuranceDir)
  .filter((file) => /\.(png|jpe?g|svg|gif|webp)$/i.test(file))
  .flatMap((fileName) => {
    const name = displayName(fileName);
    if (seenInsuranceNames.has(name)) return [];
    seenInsuranceNames.add(name);
    return [
      [
        name,
        upload("insurance", fileName),
        "Insurance and cashless support partner listed with Morya Plus Hospital.",
        healthInsuranceNames.has(name) ? "Health Insurance" : "General Insurance",
        "Active",
      ],
    ];
  });

if (insuranceRows.length) {
  sections.push(
    upsert(
      "insurance_partners",
      ["company_name", "logo", "description", "category", "status"],
      insuranceRows,
      ["logo", "description", "category", "status"],
    ),
  );
}

fs.writeFileSync(outputPath, `${sections.join("\n\n")}\n`, "utf8");

console.log(`Wrote ${outputPath}`);
console.log({
  departments: departments.length,
  facilities: facilities.length,
  doctors: doctors.length,
  blogs: blogs.length,
  gallery: galleryRows.length,
  insurance: insuranceRows.length,
});
