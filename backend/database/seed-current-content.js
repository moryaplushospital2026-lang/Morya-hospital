import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

dotenv.config({ override: true });

const db = process.env.DB_NAME || "morya_plus_hospital";
export const upload = (folder, name) => `/uploads/seed/${folder}/${name}`;
const image = (name) => upload("images", name);
export const healthInsuranceNames = new Set([
  "Aditya Birla Health Insurance Company Limited",
  "Care Health Insurance Limited",
  "Galaxy Health Insurance Company Limited",
  "ManipalCigna Health Insurance Company Limited",
  "Narayana Health Insurance Limited",
  "Niva Bupa Health Insurance Company Limited",
  "Star Health Allied Insurance Company Limited",
]);

export const departments = [
  [
    "general-medicine",
    "General Medicine",
    "Comprehensive medical care for adults",
    "Our General Medicine department offers diagnosis, treatment, and prevention of a wide range of adult illnesses with an evidence-based, holistic approach.",
    "Experienced consultant physicians, Chronic disease management (Diabetes, Hypertension, Thyroid), Preventive health screenings, Daily OPD consultations",
    "Fever & Infections, Diabetes, Hypertension, Thyroid, Asthma & COPD, Lifestyle disorders",
  ],
  [
    "emergency-care",
    "Emergency Care & Trauma Center",
    "24/7 emergency response and trauma support",
    "Round-the-clock emergency response with rapid triage, trauma stabilization, advanced life support, and immediate access to critical care services.",
    "24x7 casualty and trauma bay, Emergency trauma management, Rapid triage protocols, On-call multispeciality team",
    "Trauma & Accidents, Heart Attack, Stroke, Poisoning, Severe Infections, Pediatric Emergencies",
  ],
  [
    "icu-care",
    "ICU Care",
    "Advanced critical care unit",
    "Fully equipped Intensive Care Unit with multi-parameter monitors, ventilators, and a trained intensivist team delivering round-the-clock critical care.",
    "Ventilator support, Cardiac monitoring, Sepsis management, Post-operative ICU",
    "Respiratory Failure, Septic Shock, Cardiac Emergencies, Post-Surgical Care",
  ],
  [
    "general-surgery",
    "General Surgery",
    "Open and laparoscopic surgical care",
    "Our General Surgery team performs a wide range of elective and emergency procedures using modern laparoscopic and minimally invasive techniques.",
    "Laparoscopic Surgery, Hernia & Appendix, Gall Bladder Stones, Day-care Procedures",
    "Hernia, Appendicitis, Piles & Fissures, Gall Stones, Hydrocele, Abscess",
  ],
  [
    "orthopaedics",
    "Orthopedic & Joint Replacement",
    "Bone, joint, trauma, and replacement surgery care",
    "Comprehensive orthopedic care including fracture management, joint replacement, sports injuries, arthroscopy, and rehabilitation support by experienced surgeons.",
    "Joint Replacement, Trauma & Fractures, Arthroscopy, Spine Care",
    "Fractures, Knee & Hip Pain, Arthritis, Sports Injury, Back Pain",
  ],
  [
    "gynaecology",
    "Gynaecologist & Obstetrics",
    "Women's health, maternity, and obstetric care",
    "Compassionate women's health services covering obstetric care, pregnancy care, painless delivery, gynaec surgeries, and infertility evaluation.",
    "Painless Delivery, Antenatal Care, Laparoscopic Gynaec Surgery, Menstrual Disorders",
    "Pregnancy Care, PCOD/PCOS, Fibroids, Infertility, Menopause",
  ],
  [
    "paediatrics",
    "Paediatrics",
    "Child health and vaccination",
    "Loving, child-friendly care from newborns to adolescents, including immunisation, growth monitoring, and paediatric emergency care.",
    "Newborn Care (NICU support), Vaccination, Growth & Nutrition, Paediatric ICU",
    "Fever in Children, Asthma, Diarrhoea, Nutrition Issues, Routine Vaccination",
  ],
  [
    "diagnostics",
    "Diagnostics",
    "Lab, X-ray, Sonography and ECG",
    "In-house diagnostic services with accurate reports and quick turnaround - pathology, radiology, sonography, ECG, and 2D Echo.",
    "Pathology Lab, Digital X-Ray, Sonography, ECG & 2D Echo",
    "Health Checks, Pre-op Workup, Antenatal Sonography, Routine Blood Tests",
  ],
  [
    "pharmacy",
    "Pharmacy",
    "24x7 in-house medical store",
    "Round-the-clock in-house pharmacy stocking genuine medicines, surgical consumables, and emergency drugs at affordable prices.",
    "24x7 Availability, Genuine Branded Medicines, Affordable Pricing, Home Delivery (local)",
    "Prescription Medicines, Surgical Items, First Aid, Wellness Products",
  ],
  [
    "neurology-neuro-surgery",
    "Neurology & Neuro Surgery",
    "Brain, spine, nerve, and neuro-trauma care",
    "Specialized neurology and neuro surgery care for disorders of the brain, spine, and nervous system with emergency evaluation and advanced treatment planning.",
    "Stroke Evaluation, Neuro-trauma Care, Spine & Nerve Disorder Management, Neuro Surgery Consultation",
    "Stroke, Seizures, Head Injury, Spine Disorders, Neuropathy",
  ],
  [
    "urology-nephrology",
    "Urology & Nephrology",
    "Kidney, urinary tract, and renal care",
    "Comprehensive urology and nephrology services for kidney health, urinary tract disorders, stone disease, and long-term renal care.",
    "Kidney Stone Management, Urinary Tract Care, Renal Function Evaluation, Chronic Kidney Disease Support",
    "Kidney Stones, UTI, Prostate Concerns, Kidney Disease, Urinary Retention",
  ],
  [
    "oncology-oncology-surgery",
    "Oncology & Oncology Surgery",
    "Cancer diagnosis, treatment guidance, and surgical care",
    "Dedicated oncology and oncology surgery services focused on cancer screening, diagnosis, treatment planning, and surgical management with multidisciplinary support.",
    "Cancer Screening Guidance, Oncology Consultation, Tumor Surgery Planning, Multidisciplinary Care Support",
    "Breast Lumps, GI Tumors, Head & Neck Tumors, Soft Tissue Masses, Cancer Follow-up",
  ],
  [
    "health-checkups",
    "Health Checkups",
    "Preventive wellness packages",
    "Affordable preventive health check packages for individuals, families, and corporates - designed by our physicians for early detection.",
    "Basic, Executive & Master Packages, Diabetes & Cardiac Profile, Whole-body Screening, Corporate Packages",
    "Annual Checkup, Pre-Employment, Cardiac Risk, Diabetes Screening",
  ],
];

export const facilities = [
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

export const doctors = [
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

export const blogs = [
  [
    "emergency-care-kunjirwadi-pune",
    "When to Choose an Emergency Hospital in Kunjirwadi, Pune",
    image("hero-emergency.jpg"),
    "Learn the warning signs that need immediate medical attention and how quick emergency care can make treatment safer for patients and families.",
    "Understand when to visit an emergency hospital in Kunjirwadi, Pune and why fast access to ICU, ambulance, and diagnostics can improve patient outcomes.",
    [
      "Choosing the right emergency hospital in Kunjirwadi, Pune can save valuable time when a patient is facing chest pain, severe breathing difficulty, trauma, high fever with confusion, sudden weakness, seizures, or uncontrolled bleeding. In these situations, rapid diagnosis and stabilisation matter more than waiting for routine consultation hours.",
      "A multispeciality hospital with 24x7 emergency services, ICU support, ambulance access, diagnostics, and specialist backup helps reduce delays in treatment. Families often search for terms like best emergency hospital near Pune-Solapur Highway or 24x7 hospital in Kunjirwadi because proximity and readiness are both essential during urgent care.",
      "Immediate emergency evaluation is especially important when symptoms are sudden, severe, or life-threatening. Even a short delay can affect treatment decisions in cases like stroke, severe infection, head injury, or heart-related emergencies.",
      "Patients and families should also consider whether a hospital can provide quick imaging, pathology, pharmacy access, and referral support without requiring transfers to multiple locations. A single coordinated care setting is often more reassuring during stressful emergencies.",
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
      "Regular preventive health checkups are one of the most effective ways to protect long-term wellness. Many common conditions such as diabetes, hypertension, thyroid disorders, kidney concerns, and cholesterol imbalance can develop silently. By the time symptoms appear, treatment may become more complex and more expensive.",
      "People living around Kunjirwadi and the Pune-Solapur Highway often look for affordable health checkups in Pune that are nearby, reliable, and easy to access. A good checkup program should include physician review, pathology tests, blood sugar screening, blood pressure evaluation, and condition-based diagnostics depending on age and medical history.",
      "Preventive screening is useful not only for senior citizens but also for working adults, people with a family history of chronic disease, and anyone managing stress, irregular sleep, sedentary habits, or weight changes. Early detection gives patients more treatment options and more time to act.",
      "Health checkups also support better conversations with doctors. Instead of waiting for a major symptom, patients can track trends, understand risk factors, and receive practical guidance on nutrition, medication, exercise, and follow-up care.",
      "At Morya Plus Hospital, preventive care is designed to support individuals, working professionals, senior citizens, and families who want early detection and practical guidance. Annual screenings can help doctors identify risks sooner and create a treatment or lifestyle plan before complications develop.",
    ],
  ],
  [
    "womens-child-healthcare-kunjirwadi",
    "Trusted Women and Child Healthcare in Kunjirwadi",
    image("gallery-1.jpg"),
    "From pregnancy care and gynaecology consultations to paediatric support and vaccinations, coordinated family care makes treatment more reassuring.",
    "Explore trusted women and child healthcare in Kunjirwadi, including pregnancy care, gynaecology support, paediatric consultation, and family-focused treatment.",
    [
      "Women and child healthcare needs often change quickly, whether a family is planning pregnancy, managing antenatal visits, seeking delivery support, addressing menstrual concerns, or booking routine paediatric care. Choosing a hospital with both gynaecology and paediatrics under one roof can make care more consistent and less stressful for families.",
      "Patients commonly search for gynaecologist in Kunjirwadi, pregnancy hospital in Pune, or child specialist near Pune-Solapur Highway when they want experienced consultation close to home. Access to diagnostics, emergency backup, and specialist referrals within the same hospital also improves convenience during follow-up visits and urgent situations.",
      "For mothers, continuity of care matters from early pregnancy through postnatal recovery. For children, timely consultation, vaccination guidance, nutrition review, and fever management can help prevent avoidable complications and reduce family anxiety.",
      "Hospitals that offer coordinated care also make it easier for families to manage appointments, diagnostic tests, and follow-up plans without confusion. This becomes especially valuable when a mother or child needs repeated monitoring over time.",
      "At Morya Plus Hospital, women and child services are supported by consultation, diagnostics, treatment planning, and compassionate communication. This helps families feel informed and supported from routine care to more advanced medical needs.",
    ],
  ],
];

export function displayName(fileName) {
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

  for (const [slug, name, short, full, facilitiesText, conditions] of departments) {
    await upsertByKey(conn, "departments", "slug", slug, {
      slug,
      name,
      short_description: short,
      full_content: full,
      facilities: facilitiesText,
      conditions,
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

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
