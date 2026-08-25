CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  image VARCHAR(255),
  short_description TEXT,
  full_content LONGTEXT,
  meta_title VARCHAR(220),
  meta_description TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  icon VARCHAR(120),
  image VARCHAR(255),
  short_description TEXT,
  full_content LONGTEXT,
  facilities TEXT,
  conditions TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  photo VARCHAR(255),
  designation VARCHAR(180),
  qualification VARCHAR(180),
  specialization VARCHAR(180),
  experience VARCHAR(120),
  department_id INT NULL,
  description TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_doctors_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180),
  image VARCHAR(255) NOT NULL,
  category VARCHAR(120),
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS insurance_partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(180) NOT NULL,
  logo VARCHAR(255),
  description TEXT,
  category ENUM('Health Insurance','General Insurance') DEFAULT 'General Insurance',
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO admins (username, email, password_hash)
VALUES (
  'moryaplushospital2026',
  'moryaplushospital2026@gmail.com',
  '$2b$10$/ku9GJAzKkLOUwzaBzedKe70ILRgb2fPTDn3A90/y8h8HiXiX7N0y'
)
ON DUPLICATE KEY UPDATE
  username = VALUES(username),
  email = VALUES(email),
  password_hash = VALUES(password_hash);

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM gallery;
DELETE FROM insurance_partners;
DELETE FROM doctors;
DELETE FROM facilities;
DELETE FROM blogs;
DELETE FROM departments;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO departments (slug, name, short_description, full_content, facilities, conditions, status) VALUES
('general-medicine', 'General Medicine', 'Comprehensive medical care for adults', 'Our General Medicine department offers diagnosis, treatment, and prevention of a wide range of adult illnesses with an evidence-based, holistic approach.', 'Experienced consultant physicians, Chronic disease management (Diabetes, Hypertension, Thyroid), Preventive health screenings, Daily OPD consultations', 'Fever & Infections, Diabetes, Hypertension, Thyroid, Asthma & COPD, Lifestyle disorders', 'Active'),
('emergency-care', 'Emergency Care & Trauma Center', '24/7 emergency response and trauma support', 'Round-the-clock emergency response with rapid triage, trauma stabilization, advanced life support, and immediate access to critical care services.', '24x7 casualty and trauma bay, Emergency trauma management, Rapid triage protocols, On-call multispeciality team', 'Trauma & Accidents, Heart Attack, Stroke, Poisoning, Severe Infections, Pediatric Emergencies', 'Active'),
('icu-care', 'ICU Care', 'Advanced critical care unit', 'Fully equipped Intensive Care Unit with multi-parameter monitors, ventilators, and a trained intensivist team delivering round-the-clock critical care.', 'Ventilator support, Cardiac monitoring, Sepsis management, Post-operative ICU', 'Respiratory Failure, Septic Shock, Cardiac Emergencies, Post-Surgical Care', 'Active'),
('general-surgery', 'General Surgery', 'Open and laparoscopic surgical care', 'Our General Surgery team performs a wide range of elective and emergency procedures using modern laparoscopic and minimally invasive techniques.', 'Laparoscopic Surgery, Hernia & Appendix, Gall Bladder Stones, Day-care Procedures', 'Hernia, Appendicitis, Piles & Fissures, Gall Stones, Hydrocele, Abscess', 'Active'),
('orthopaedics', 'Orthopedic & Joint Replacement', 'Bone, joint, trauma, and replacement surgery care', 'Comprehensive orthopedic care including fracture management, joint replacement, sports injuries, arthroscopy, and rehabilitation support by experienced surgeons.', 'Joint Replacement, Trauma & Fractures, Arthroscopy, Spine Care', 'Fractures, Knee & Hip Pain, Arthritis, Sports Injury, Back Pain', 'Active'),
('gynaecology', 'Gynaecologist & Obstetrics', 'Women''s health, maternity, and obstetric care', 'Compassionate women''s health services covering obstetric care, pregnancy care, painless delivery, gynaec surgeries, and infertility evaluation.', 'Painless Delivery, Antenatal Care, Laparoscopic Gynaec Surgery, Menstrual Disorders', 'Pregnancy Care, PCOD/PCOS, Fibroids, Infertility, Menopause', 'Active'),
('paediatrics', 'Paediatrics', 'Child health and vaccination', 'Loving, child-friendly care from newborns to adolescents, including immunisation, growth monitoring, and paediatric emergency care.', 'Newborn Care (NICU support), Vaccination, Growth & Nutrition, Paediatric ICU', 'Fever in Children, Asthma, Diarrhoea, Nutrition Issues, Routine Vaccination', 'Active'),
('diagnostics', 'Diagnostics', 'Lab, X-ray, Sonography and ECG', 'In-house diagnostic services with accurate reports and quick turnaround - pathology, radiology, sonography, ECG, and 2D Echo.', 'Pathology Lab, Digital X-Ray, Sonography, ECG & 2D Echo', 'Health Checks, Pre-op Workup, Antenatal Sonography, Routine Blood Tests', 'Active'),
('pharmacy', 'Pharmacy', '24x7 in-house medical store', 'Round-the-clock in-house pharmacy stocking genuine medicines, surgical consumables, and emergency drugs at affordable prices.', '24x7 Availability, Genuine Branded Medicines, Affordable Pricing, Home Delivery (local)', 'Prescription Medicines, Surgical Items, First Aid, Wellness Products', 'Active'),
('neurology-neuro-surgery', 'Neurology & Neuro Surgery', 'Brain, spine, nerve, and neuro-trauma care', 'Specialized neurology and neuro surgery care for disorders of the brain, spine, and nervous system with emergency evaluation and advanced treatment planning.', 'Stroke Evaluation, Neuro-trauma Care, Spine & Nerve Disorder Management, Neuro Surgery Consultation', 'Stroke, Seizures, Head Injury, Spine Disorders, Neuropathy', 'Active'),
('urology-nephrology', 'Urology & Nephrology', 'Kidney, urinary tract, and renal care', 'Comprehensive urology and nephrology services for kidney health, urinary tract disorders, stone disease, and long-term renal care.', 'Kidney Stone Management, Urinary Tract Care, Renal Function Evaluation, Chronic Kidney Disease Support', 'Kidney Stones, UTI, Prostate Concerns, Kidney Disease, Urinary Retention', 'Active'),
('oncology-oncology-surgery', 'Oncology & Oncology Surgery', 'Cancer diagnosis, treatment guidance, and surgical care', 'Dedicated oncology and oncology surgery services focused on cancer screening, diagnosis, treatment planning, and surgical management with multidisciplinary support.', 'Cancer Screening Guidance, Oncology Consultation, Tumor Surgery Planning, Multidisciplinary Care Support', 'Breast Lumps, GI Tumors, Head & Neck Tumors, Soft Tissue Masses, Cancer Follow-up', 'Active'),
('health-checkups', 'Health Checkups', 'Preventive wellness packages', 'Affordable preventive health check packages for individuals, families, and corporates - designed by our physicians for early detection.', 'Basic, Executive & Master Packages, Diabetes & Cardiac Profile, Whole-body Screening, Corporate Packages', 'Annual Checkup, Pre-Employment, Cardiac Risk, Diabetes Screening', 'Active')
ON DUPLICATE KEY UPDATE name = VALUES(name), short_description = VALUES(short_description), full_content = VALUES(full_content), facilities = VALUES(facilities), conditions = VALUES(conditions), status = VALUES(status);


INSERT INTO facilities (title, image, description, status) VALUES
('ICU & Critical Care', '/uploads/seed/images/facility-icu.jpg', 'Ventilator, monitors, intensivist-led team.', 'Active'),
('Modular Operation Theatre', '/uploads/seed/images/facility-ot.jpg', 'Modern OT with sterile workflow and lighting.', 'Active'),
('Diagnostic Imaging', '/uploads/seed/images/facility-diagnostic.jpg', 'Digital X-Ray, sonography, and ECG/2D Echo.', 'Active'),
('24x7 Pharmacy', '/uploads/seed/images/facility-pharmacy.jpg', 'In-house medical store with genuine medicines.', 'Active'),
('Reception & Lounge', '/uploads/seed/images/facility-reception.jpg', 'Comfortable, accessible patient waiting area.', 'Active'),
('Private Patient Rooms', '/uploads/seed/images/facility-room.jpg', 'Clean, comfortable rooms with attendant support.', 'Active')
ON DUPLICATE KEY UPDATE image = VALUES(image), description = VALUES(description), status = VALUES(status);


INSERT INTO doctors (name, designation, qualification, specialization, experience, description, photo, status) VALUES
('Dr. Yajinesh Kidiyoor', 'Consultant Physician', 'MD Physician', 'General Medicine', NULL, 'Focused on physician-led care with diagnosis and treatment for general medical conditions.', '/uploads/seed/images/doctor-1.jpg', 'Active'),
('Dr. Swapnil Bagdure', 'Orthopaedic Consultant', 'MBBS, Ortho', 'Orthopaedics', NULL, 'Provides orthopaedic consultation and treatment support for bone and joint conditions.', '/uploads/seed/images/doctor-2.jpg', 'Active'),
('Dr. Pratik Memane', 'Consultant Pediatrician', 'MBBS, Pediatrician', 'Paediatrics', NULL, 'Dedicated to child health, routine paediatric care, and age-specific medical guidance.', '/uploads/seed/images/doctor-3.jpg', 'Active'),
('Dr. Rutuja Bagdure', 'Consultant Gynaecologist', 'Gynaecologist', 'Gynaecology', NULL, 'Supports women''s health with gynaecology consultation and treatment planning.', '/uploads/seed/images/doctor-4.jpg', 'Active'),
('Dr. Ameya Thakur', 'Laparoscopic Surgeon', 'Lap. Surgeon', 'General Surgery', NULL, 'Offers minimally invasive surgical care with a focus on safe and effective recovery.', '/uploads/seed/images/doctor-1.jpg', 'Active'),
('Dr. Mane', 'Anesthesia Specialist', 'Anesthesia', 'Anesthesia', NULL, 'Provides perioperative anesthesia care with attention to patient safety and comfort.', '/uploads/seed/images/doctor-2.jpg', 'Active'),
('Dr. Gaurav Pawale', 'Consultant Gynecologist', 'MBBS, DGO Gynecologist', 'Gynaecology', NULL, 'Experienced in obstetric and gynecological consultation with a patient-focused approach.', '/uploads/seed/images/doctor-3.jpg', 'Active'),
('Dr. Priyanka Memane', 'Consultant Gynecologist', 'MBBS, DGO', 'Gynaecology', NULL, 'Provides women''s healthcare consultation and ongoing support across routine gynec issues.', '/uploads/seed/images/doctor-4.jpg', 'Active'),
('Dr. Anup Bhebd', 'Consultant Neurologist', 'Neurologist', 'Neurology', NULL, 'Evaluates and treats neurological conditions with careful diagnosis and clinical guidance.', '/uploads/seed/images/doctor-1.jpg', 'Active'),
('Dr. Mangesh Gaikwad', 'Consultant Cardiologist', 'Cardioligist', 'Cardiology', NULL, 'Provides heart health consultation, assessment, and treatment recommendations.', '/uploads/seed/images/doctor-3.jpg', 'Active')
ON DUPLICATE KEY UPDATE designation = VALUES(designation), qualification = VALUES(qualification), specialization = VALUES(specialization), experience = VALUES(experience), description = VALUES(description), photo = VALUES(photo), status = VALUES(status);


INSERT INTO blogs (slug, title, image, short_description, full_content, meta_title, meta_description, status) VALUES
('emergency-care-kunjirwadi-pune', 'When to Choose an Emergency Hospital in Kunjirwadi, Pune', '/uploads/seed/images/hero-emergency.jpg', 'Learn the warning signs that need immediate medical attention and how quick emergency care can make treatment safer for patients and families.', 'Choosing the right emergency hospital in Kunjirwadi, Pune can save valuable time when a patient is facing chest pain, severe breathing difficulty, trauma, high fever with confusion, sudden weakness, seizures, or uncontrolled bleeding. In these situations, rapid diagnosis and stabilisation matter more than waiting for routine consultation hours.

A multispeciality hospital with 24x7 emergency services, ICU support, ambulance access, diagnostics, and specialist backup helps reduce delays in treatment. Families often search for terms like best emergency hospital near Pune-Solapur Highway or 24x7 hospital in Kunjirwadi because proximity and readiness are both essential during urgent care.

Immediate emergency evaluation is especially important when symptoms are sudden, severe, or life-threatening. Even a short delay can affect treatment decisions in cases like stroke, severe infection, head injury, or heart-related emergencies.

Patients and families should also consider whether a hospital can provide quick imaging, pathology, pharmacy access, and referral support without requiring transfers to multiple locations. A single coordinated care setting is often more reassuring during stressful emergencies.

At Morya Plus Hospital, patients can access emergency evaluation, critical care support, in-house diagnostics, and coordinated treatment under one roof. If you notice symptoms that feel urgent or dangerous, calling emergency support immediately is the safest next step.', 'When to Choose an Emergency Hospital in Kunjirwadi, Pune', 'Understand when to visit an emergency hospital in Kunjirwadi, Pune and why fast access to ICU, ambulance, and diagnostics can improve patient outcomes.', 'Active'),
('preventive-health-checkups-pune', 'Why Regular Health Checkups Matter for Families in Pune', '/uploads/seed/images/facility-diagnostic.jpg', 'Preventive screening helps detect diabetes, blood pressure, thyroid issues, and heart risk factors early, often before symptoms become serious.', 'Regular preventive health checkups are one of the most effective ways to protect long-term wellness. Many common conditions such as diabetes, hypertension, thyroid disorders, kidney concerns, and cholesterol imbalance can develop silently. By the time symptoms appear, treatment may become more complex and more expensive.

People living around Kunjirwadi and the Pune-Solapur Highway often look for affordable health checkups in Pune that are nearby, reliable, and easy to access. A good checkup program should include physician review, pathology tests, blood sugar screening, blood pressure evaluation, and condition-based diagnostics depending on age and medical history.

Preventive screening is useful not only for senior citizens but also for working adults, people with a family history of chronic disease, and anyone managing stress, irregular sleep, sedentary habits, or weight changes. Early detection gives patients more treatment options and more time to act.

Health checkups also support better conversations with doctors. Instead of waiting for a major symptom, patients can track trends, understand risk factors, and receive practical guidance on nutrition, medication, exercise, and follow-up care.

At Morya Plus Hospital, preventive care is designed to support individuals, working professionals, senior citizens, and families who want early detection and practical guidance. Annual screenings can help doctors identify risks sooner and create a treatment or lifestyle plan before complications develop.', 'Why Regular Health Checkups Matter for Families in Pune', 'Discover why regular health checkups in Pune help detect diabetes, hypertension, thyroid issues, and cardiac risk factors before complications grow.', 'Active'),
('womens-child-healthcare-kunjirwadi', 'Trusted Women and Child Healthcare in Kunjirwadi', '/uploads/seed/images/gallery-1.jpg', 'From pregnancy care and gynaecology consultations to paediatric support and vaccinations, coordinated family care makes treatment more reassuring.', 'Women and child healthcare needs often change quickly, whether a family is planning pregnancy, managing antenatal visits, seeking delivery support, addressing menstrual concerns, or booking routine paediatric care. Choosing a hospital with both gynaecology and paediatrics under one roof can make care more consistent and less stressful for families.

Patients commonly search for gynaecologist in Kunjirwadi, pregnancy hospital in Pune, or child specialist near Pune-Solapur Highway when they want experienced consultation close to home. Access to diagnostics, emergency backup, and specialist referrals within the same hospital also improves convenience during follow-up visits and urgent situations.

For mothers, continuity of care matters from early pregnancy through postnatal recovery. For children, timely consultation, vaccination guidance, nutrition review, and fever management can help prevent avoidable complications and reduce family anxiety.

Hospitals that offer coordinated care also make it easier for families to manage appointments, diagnostic tests, and follow-up plans without confusion. This becomes especially valuable when a mother or child needs repeated monitoring over time.

At Morya Plus Hospital, women and child services are supported by consultation, diagnostics, treatment planning, and compassionate communication. This helps families feel informed and supported from routine care to more advanced medical needs.', 'Trusted Women and Child Healthcare in Kunjirwadi', 'Explore trusted women and child healthcare in Kunjirwadi, including pregnancy care, gynaecology support, paediatric consultation, and family-focused treatment.', 'Active')
ON DUPLICATE KEY UPDATE title = VALUES(title), image = VALUES(image), short_description = VALUES(short_description), full_content = VALUES(full_content), meta_title = VALUES(meta_title), meta_description = VALUES(meta_description), status = VALUES(status);


INSERT INTO gallery (image, title, category, status) VALUES
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.50 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.50 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.50 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.50 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.51 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.51 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.51 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.51 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.52 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.52 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.52 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.52 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.52 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.52 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.53 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.53 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.55 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.55 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.58 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.58 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.58 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.58 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.58 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.58 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.59 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.59 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.59 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.36.59 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.36.59 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.36.59 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.00 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.37.00 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.00 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.37.00 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.00 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.37.00 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.01 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.37.01 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.02 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.37.02 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.02 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.37.02 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.37.03 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.37.03 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.06 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.06 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.07 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.07 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.07 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.07 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.10 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.10 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.11 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.11 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.11 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.11 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.11 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.11 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.12 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.12 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.12 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.12 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.12 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.12 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.13 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.13 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.13 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.13 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.13 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.13 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.14 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.14 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.14 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.14 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.15 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.15 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.15 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.15 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.16 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.16 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.16 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.16 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.16 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.16 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.18 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.18 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.18 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.18 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.19 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.19 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.20 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.20 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.21 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.21 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.22 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.22 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.23 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.23 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.23 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.23 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.24 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.24 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.25 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.41.25 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.25 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.25 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.27 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.27 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.41.28 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.41.28 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.52 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.42.52 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.52 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.52 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.53 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.53 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.54 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.42.54 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.54 PM (2).jpeg', 'WhatsApp Image 2026-05-26 at 5.42.54 PM (2)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.54 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.54 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.55 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.55 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.56 PM (1).jpeg', 'WhatsApp Image 2026-05-26 at 5.42.56 PM (1)', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.56 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.56 PM', 'Hospital', 'Active'),
('/uploads/seed/gallery/WhatsApp Image 2026-05-26 at 5.42.57 PM.jpeg', 'WhatsApp Image 2026-05-26 at 5.42.57 PM', 'Hospital', 'Active')
ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), status = VALUES(status);


INSERT INTO insurance_partners (company_name, logo, description, category, status) VALUES
('Acko General Insurance Limited', '/uploads/seed/insurance/Acko_General_Insurance_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Aditya Birla Health Insurance Company Limited', '/uploads/seed/insurance/Aditya_Birla_Health_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Bajaj Allianz General Insurance', '/uploads/seed/insurance/Bajaj_Allianz_General_Insurance.gif', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Care Health Insurance Limited', '/uploads/seed/insurance/Care_Health_Insurance_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Cholamandalam MS General Insurance Company Limited', '/uploads/seed/insurance/Cholamandalam_MS_General_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Galaxy Health Insurance Company Limited', '/uploads/seed/insurance/Galaxy_Health_Insurance_Company_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Go Digit General Insurance', '/uploads/seed/insurance/Go_Digit_General_Insurance.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('HDFC ERGO General Insurance Company Limited', '/uploads/seed/insurance/HDFC_ERGO_General_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('ICICI Lombard General Insurance', '/uploads/seed/insurance/ICICI_Lombard_General_Insurance.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('IFFCO Tokio General Insurance Company Limited', '/uploads/seed/insurance/IFFCO_Tokio_General_Insurance_Company_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('IndusInd General Insurance', '/uploads/seed/insurance/IndusInd_General_Insurance.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Kshema General Insurance Limited', '/uploads/seed/insurance/Kshema_General_Insurance_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Liberty General Insurance Limited', '/uploads/seed/insurance/Liberty_General_Insurance_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Magma General Insurance Limited', '/uploads/seed/insurance/Magma_General_Insurance_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('ManipalCigna Health Insurance Company Limited', '/uploads/seed/insurance/ManipalCigna_Health_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Narayana Health Insurance Limited', '/uploads/seed/insurance/Narayana_Health_Insurance_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('National Insurance Company Limited', '/uploads/seed/insurance/National_Insurance_Company_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Navi General Insurance Limited', '/uploads/seed/insurance/Navi_General_Insurance_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('New India Assurance Company Limited', '/uploads/seed/insurance/New_India_Assurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Niva Bupa Health Insurance Company Limited', '/uploads/seed/insurance/Niva_Bupa_Health_Insurance_Company_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Raheja QBE General Insurance Company Limited', '/uploads/seed/insurance/Raheja_QBE_General_Insurance_Company_Limited.jpg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Reliance General Insurance Company Limited', '/uploads/seed/insurance/Reliance_General_Insurance_Company_Limited.jpg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Royal Sundaram General Insurance Company Limited', '/uploads/seed/insurance/Royal_Sundaram_General_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('SBI General Insurance Company Limited', '/uploads/seed/insurance/SBI_General_Insurance_Company_Limited.webp', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Shriram General Insurance Company Limited', '/uploads/seed/insurance/Shriram_General_Insurance_Company_Limited.jpg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Star Health Allied Insurance Company Limited', '/uploads/seed/insurance/Star_Health_Allied_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'Health Insurance', 'Active'),
('Tata AIG General Insurance Company Limited', '/uploads/seed/insurance/Tata_AIG_General_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('The Oriental Insurance Company Limited', '/uploads/seed/insurance/The_Oriental_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('United India Insurance Company Limited', '/uploads/seed/insurance/United_India_Insurance_Company_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Universal Sompo General Insurance Company Limited', '/uploads/seed/insurance/Universal_Sompo_General_Insurance_Company_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Zuno General Insurance Limited', '/uploads/seed/insurance/Zuno_General_Insurance_Limited.png', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active'),
('Zurich Kotak General Insurance Company India Limited', '/uploads/seed/insurance/Zurich_Kotak_General_Insurance_Company_India_Limited.svg', 'Insurance and cashless support partner listed with Morya Plus Hospital.', 'General Insurance', 'Active')
ON DUPLICATE KEY UPDATE logo = VALUES(logo), description = VALUES(description), category = VALUES(category), status = VALUES(status);

