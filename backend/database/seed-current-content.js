import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config({ override: true });

const db = process.env.DB_NAME || "morya_plus_hospital";
const upload = (folder, name) => `/uploads/seed/${folder}/${name}`;
const image = (name) => upload("images", name);
const healthInsuranceNames = new Set([
  "Aditya Birla Health Insurance Company Limited",
  "Care Health Insurance Limited",
  "Galaxy Health Insurance Company Limited",
  "ManipalCigna Health Insurance Company Limited",
  "Narayana Health Insurance Limited",
  "Niva Bupa Health Insurance Company Limited",
  "Star Health Allied Insurance Company Limited",
]);

const departments = [
  [
    "general-medicine",
    "General Medicine",
    "Comprehensive medical care for adults",
    "Our General Medicine department offers diagnosis, treatment, and prevention of a wide range of adult illnesses with an evidence-based, holistic approach.",
    "Experienced consultant physicians, Chronic disease management (Diabetes, Hypertension, Thyroid), Preventive health screenings, Daily OPD consultations",
  ],
  [
    "emergency-care",
    "Emergency Care & Trauma Center",
    "24/7 emergency response and trauma support",
    "Round-the-clock emergency response with rapid triage, trauma stabilization, advanced life support, and immediate access to critical care services.",
    "24x7 casualty and trauma bay, Emergency trauma management, Rapid triage protocols, On-call multispeciality team",
  ],
  [
    "icu-care",
    "ICU Care",
    "Advanced critical care unit",
    "Fully equipped Intensive Care Unit with multi-parameter monitors, ventilators, and a trained intensivist team delivering round-the-clock critical care.",
    "Ventilator support, Cardiac monitoring, Sepsis management, Post-operative ICU",
  ],
  [
    "general-surgery",
    "General Surgery",
    "Open and laparoscopic surgical care",
    "Our General Surgery team performs a wide range of elective and emergency procedures using modern laparoscopic and minimally invasive techniques.",
    "Laparoscopic Surgery, Hernia & Appendix, Gall Bladder Stones, Day-care Procedures",
  ],
  [
    "orthopaedics",
    "Orthopedic & Joint Replacement",
    "Bone, joint, trauma, and replacement surgery care",
    "Comprehensive orthopedic care including fracture management, joint replacement, sports injuries, arthroscopy, and rehabilitation support by experienced surgeons.",
    "Joint Replacement, Trauma & Fractures, Arthroscopy, Spine Care",
  ],
  [
    "gynaecology",
    "Gynaecologist & Obstetrics",
    "Women's health, maternity, and obstetric care",
    "Compassionate women's health services covering obstetric care, pregnancy care, painless delivery, gynaec surgeries, and infertility evaluation.",
    "Painless Delivery, Antenatal Care, Laparoscopic Gynaec Surgery, Menstrual Disorders",
  ],
  [
    "paediatrics",
    "Paediatrics",
    "Child health and vaccination",
    "Loving, child-friendly care from newborns to adolescents, including immunisation, growth monitoring, and paediatric emergency care.",
    "Newborn Care (NICU support), Vaccination, Growth & Nutrition, Paediatric ICU",
  ],
  [
    "diagnostics",
    "Diagnostics",
    "Lab, X-ray, Sonography and ECG",
    "In-house diagnostic services with accurate reports and quick turnaround - pathology, radiology, sonography, ECG, and 2D Echo.",
    "Pathology Lab, Digital X-Ray, Sonography, ECG & 2D Echo",
  ],
  [
    "pharmacy",
    "Pharmacy",
    "24x7 in-house medical store",
    "Round-the-clock in-house pharmacy stocking genuine medicines, surgical consumables, and emergency drugs at affordable prices.",
    "24x7 Availability, Genuine Branded Medicines, Affordable Pricing, Home Delivery (local)",
  ],
  [
    "neurology-neuro-surgery",
    "Neurology & Neuro Surgery",
    "Brain, spine, nerve, and neuro-trauma care",
    "Specialized neurology and neuro surgery care for disorders of the brain, spine, and nervous system with emergency evaluation and advanced treatment planning.",
    "Stroke Evaluation, Neuro-trauma Care, Spine & Nerve Disorder Management, Neuro Surgery Consultation",
  ],
  [
    "urology-nephrology",
    "Urology & Nephrology",
    "Kidney, urinary tract, and renal care",
    "Comprehensive urology and nephrology services for kidney health, urinary tract disorders, stone disease, and long-term renal care.",
    "Kidney Stone Management, Urinary Tract Care, Renal Function Evaluation, Chronic Kidney Disease Support",
  ],
  [
    "oncology-oncology-surgery",
    "Oncology & Oncology Surgery",
    "Cancer diagnosis, treatment guidance, and surgical care",
    "Dedicated oncology and oncology surgery services focused on cancer screening, diagnosis, treatment planning, and surgical management with multidisciplinary support.",
    "Cancer Screening Guidance, Oncology Consultation, Tumor Surgery Planning, Multidisciplinary Care Support",
  ],
  [
    "health-checkups",
    "Health Checkups",
    "Preventive wellness packages",
    "Affordable preventive health check packages for individuals, families, and corporates - designed by our physicians for early detection.",
    "Basic, Executive & Master Packages, Diabetes & Cardiac Profile, Whole-body Screening, Corporate Packages",
  ],
];

const facilities = [
  ["ICU & Critical Care", image("facility-icu.jpg"), "Ventilator, monitors, intensivist-led team."],
  [
    "Modular Operation Theatre",
    image("facility-ot.jpg"),
    "Modern OT with sterile workflow and lighting.",
  ],
  [
    "Diagnostic Imaging",
    image("facility-diagnostic.jpg"),
    "Digital X-Ray, sonography, and ECG/2D Echo.",
  ],
  [
    "24x7 Pharmacy",
    image("facility-pharmacy.jpg"),
    "In-house medical store with genuine medicines.",
  ],
  [
    "Reception & Lounge",
    image("facility-reception.jpg"),
    "Comfortable, accessible patient waiting area.",
  ],
  [
    "Private Patient Rooms",
    image("facility-room.jpg"),
    "Clean, comfortable rooms with attendant support.",
  ],
];

const doctors = [
  [
    "Dr. Yajinesh Kidiyoor",
    "Consultant Physician",
    "MD Physician",
    "General Medicine",
    "",
    "Focused on physician-led care with diagnosis and treatment for general medical conditions.",
    image("doctor-1.jpg"),
  ],
  [
    "Dr. Swapnil Bagdure",
    "Orthopaedic Consultant",
    "MBBS, Ortho",
    "Orthopaedics",
    "",
    "Provides orthopaedic consultation and treatment support for bone and joint conditions.",
    image("doctor-2.jpg"),
  ],
  [
    "Dr. Pratik Memane",
    "Consultant Pediatrician",
    "MBBS, Pediatrician",
    "Paediatrics",
    "",
    "Dedicated to child health, routine paediatric care, and age-specific medical guidance.",
    image("doctor-3.jpg"),
  ],
  [
    "Dr. Rutuja Bagdure",
    "Consultant Gynaecologist",
    "Gynaecologist",
    "Gynaecology",
    "",
    "Supports women's health with gynaecology consultation and treatment planning.",
    image("doctor-4.jpg"),
  ],
  [
    "Dr. Ameya Thakur",
    "Laparoscopic Surgeon",
    "Lap. Surgeon",
    "General Surgery",
    "",
    "Offers minimally invasive surgical care with a focus on safe and effective recovery.",
    image("doctor-1.jpg"),
  ],
  [
    "Dr. Mane",
    "Anesthesia Specialist",
    "Anesthesia",
    "Anesthesia",
    "",
    "Provides perioperative anesthesia care with attention to patient safety and comfort.",
    image("doctor-2.jpg"),
  ],
  [
    "Dr. Gaurav Pawale",
    "Consultant Gynecologist",
    "MBBS, DGO Gynecologist",
    "Gynaecology",
    "",
    "Experienced in obstetric and gynecological consultation with a patient-focused approach.",
    image("doctor-3.jpg"),
  ],
  [
    "Dr. Priyanka Memane",
    "Consultant Gynecologist",
    "MBBS, DGO",
    "Gynaecology",
    "",
    "Provides women's healthcare consultation and ongoing support across routine gynec issues.",
    image("doctor-4.jpg"),
  ],
  [
    "Dr. Anup Bhebd",
    "Consultant Neurologist",
    "Neurologist",
    "Neurology",
    "",
    "Evaluates and treats neurological conditions with careful diagnosis and clinical guidance.",
    image("doctor-1.jpg"),
  ],
  [
    "Dr. Mangesh Gaikwad",
    "Consultant Cardiologist",
    "Cardioligist",
    "Cardiology",
    "",
    "Provides heart health consultation, assessment, and treatment recommendations.",
    image("doctor-3.jpg"),
  ],
];

const blogs = [
  [
    "emergency-care-kunjirwadi-pune",
    "When to Choose an Emergency Hospital in Kunjirwadi, Pune",
    image("hero-emergency.jpg"),
    "Learn the warning signs that need immediate medical attention and how quick emergency care can make treatment safer for patients and families.",
    "Understand when to visit an emergency hospital in Kunjirwadi, Pune and why fast access to ICU, ambulance, and diagnostics can improve patient outcomes.",
    [
      "Choosing the right emergency hospital in Kunjirwadi, Pune can save valuable time when a patient is facing chest pain, severe breathing difficulty, trauma, high fever with confusion, sudden weakness, seizures, or uncontrolled bleeding. In these situations, rapid diagnosis and stabilisation matter more than waiting for routine consultation hours.",
      "A multispeciality hospital with 24x7 emergency services, ICU support, ambulance access, diagnostics, and specialist backup helps reduce delays in treatment. Families often search for terms like best emergency hospital near Pune-Solapur Highway or 24x7 hospital in Kunjirwadi because proximity and readiness are both essential during urgent care.",
      "At Morya Plus Hospital, patients can access emergency evaluation, critical care support, in-house diagnostics, and coordinated treatment under one roof. If you notice symptoms that feel urgent or dangerous, calling emergency support immediately is the safest next step.",
    ],
  ],
  [
    "preventive-health-checkups-pune",
    "Why Regular Health Checkups Matter for Families in Pune",
    image("facility-diagnostic.jpg"),
    "Preventive screening helps detect diabetes, blood pressure, thyroid issues, and heart risk factors early, often before symptoms become serious.",
    "Discover why regular health checkups in Pune help detect diabetes, hypertension, thyroid issues, and cardiac risk factors before complications grow.",
    [
      "Regular preventive health checkups are one of the most effective ways to protect long-term wellness. Many common conditions such as diabetes, hypertension, thyroid disorders, kidney concerns, and cholesterol imbalance can develop silently.",
      "People living around Kunjirwadi and the Pune-Solapur Highway often look for affordable health checkups in Pune that are nearby, reliable, and easy to access.",
      "At Morya Plus Hospital, preventive care is designed to support individuals, working professionals, senior citizens, and families who want early detection and practical guidance.",
    ],
  ],
  [
    "womens-child-healthcare-kunjirwadi",
    "Trusted Women and Child Healthcare in Kunjirwadi",
    image("gallery-1.jpg"),
    "From pregnancy care and gynaecology consultations to paediatric support and vaccinations, coordinated family care makes treatment more reassuring.",
    "Explore trusted women and child healthcare in Kunjirwadi, including pregnancy care, gynaecology support, paediatric consultation, and family-focused treatment.",
    [
      "Women and child healthcare needs often change quickly, whether a family is planning pregnancy, managing antenatal visits, seeking delivery support, addressing menstrual concerns, or booking routine paediatric care.",
      "Patients commonly search for gynaecologist in Kunjirwadi, pregnancy hospital in Pune, or child specialist near Pune-Solapur Highway when they want experienced consultation close to home.",
      "At Morya Plus Hospital, women and child services are supported by consultation, diagnostics, treatment planning, and compassionate communication.",
    ],
  ],
];

function displayName(fileName) {
  return fileName.replace(/\.[^.]+$/, "").replaceAll("_", " ");
}

async function upsertByKey(conn, table, keyColumn, keyValue, data) {
  const [rows] = await conn.query(`SELECT id FROM ${table} WHERE ${keyColumn} = ? LIMIT 1`, [
    keyValue,
  ]);
  const columns = Object.keys(data);
  const values = Object.values(data);
  if (rows.length) {
    await conn.query(
      `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE id = ?`,
      [...values, rows[0].id],
    );
    return rows[0].id;
  }
  const [result] = await conn.query(
    `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`,
    values,
  );
  return result.insertId;
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: db,
  });

  for (const [slug, name, short, full, facilitiesText] of departments) {
    await upsertByKey(conn, "departments", "slug", slug, {
      slug,
      name,
      short_description: short,
      full_content: full,
      facilities: facilitiesText,
      status: "Active",
    });
  }

  for (const [title, imagePath, description] of facilities) {
    await upsertByKey(conn, "facilities", "title", title, {
      title,
      image: imagePath,
      description,
      status: "Active",
    });
  }

  for (const [
    name,
    designation,
    qualification,
    specialization,
    experience,
    description,
    photo,
  ] of doctors) {
    await upsertByKey(conn, "doctors", "name", name, {
      name,
      designation,
      qualification,
      specialization,
      experience,
      description,
      photo,
      status: "Active",
    });
  }

  for (const [slug, title, imagePath, shortDescription, metaDescription, content] of blogs) {
    await upsertByKey(conn, "blogs", "slug", slug, {
      slug,
      title,
      image: imagePath,
      short_description: shortDescription,
      full_content: content.join("\n\n"),
      meta_title: title,
      meta_description: metaDescription,
      status: "Active",
    });
  }

  const galleryDir = path.resolve("backend/uploads/seed/gallery");
  for (const fileName of fs
    .readdirSync(galleryDir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))) {
    await upsertByKey(conn, "gallery", "image", upload("gallery", fileName), {
      image: upload("gallery", fileName),
      title: displayName(fileName),
      category: "Hospital",
      status: "Active",
    });
  }

  const insuranceDir = path.resolve("backend/uploads/seed/insurance");
  const seen = new Set();
  for (const fileName of fs
    .readdirSync(insuranceDir)
    .filter((file) => /\.(png|jpe?g|svg|gif|webp)$/i.test(file))) {
    const name = displayName(fileName);
    if (seen.has(name)) continue;
    seen.add(name);
    await upsertByKey(conn, "insurance_partners", "company_name", name, {
      company_name: name,
      logo: upload("insurance", fileName),
      description: "Insurance and cashless support partner listed with Morya Plus Hospital.",
      category: healthInsuranceNames.has(name) ? "Health Insurance" : "General Insurance",
      status: "Active",
    });
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
