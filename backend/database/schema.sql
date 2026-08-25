CREATE DATABASE IF NOT EXISTS morya_plus_hospital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE morya_plus_hospital;

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
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  image VARCHAR(255),
  short_description TEXT,
  full_content LONGTEXT,
  facilities TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL UNIQUE,
  image VARCHAR(255),
  description TEXT,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  name VARCHAR(160) NOT NULL UNIQUE,
  designation VARCHAR(160),
  qualification VARCHAR(160),
  specialization VARCHAR(160),
  experience VARCHAR(80),
  description TEXT,
  department_id INT NULL,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_doctors_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(180),
  category VARCHAR(100),
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS insurance_partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(180) NOT NULL UNIQUE,
  logo VARCHAR(255),
  description TEXT,
  category ENUM('Health Insurance','General Insurance') DEFAULT 'General Insurance',
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO admins (username, email, password_hash)
VALUES ('moryaplushospital2026@gmail.com', 'moryaplushospital2026@gmail.com', '$2b$10$wKm3Vh2LxRI3MonFinUd6uVMlyl6HPsnAGWZJmAWAMoTdmUP74Zjq')
ON DUPLICATE KEY UPDATE
  username = VALUES(username),
  email = VALUES(email),
  password_hash = VALUES(password_hash);

INSERT INTO departments (name, slug, short_description, full_content, facilities, status) VALUES
('General Medicine', 'general-medicine', 'Comprehensive medical care for adults', 'Diagnosis, treatment, and prevention for adult illnesses including diabetes, hypertension, infections, thyroid concerns, and preventive care.', 'OPD consultations, chronic disease care, preventive screenings', 'Active'),
('Emergency Care & Trauma Center', 'emergency-care', '24/7 emergency response and trauma support', 'Round-the-clock emergency response with rapid triage, trauma stabilization, critical care backup, and immediate diagnostics.', 'Casualty, trauma bay, ambulance support, ICU backup', 'Active'),
('Orthopedic & Joint Replacement', 'orthopaedics', 'Bone, joint, trauma, and replacement surgery care', 'Comprehensive orthopedic services for fractures, joint pain, sports injuries, arthroscopy, and rehabilitation support.', 'Fracture care, joint replacement, arthroscopy, rehab', 'Active')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO facilities (title, description, status) VALUES
('ICU & Critical Care', 'Ventilator support, monitors, and intensivist-led critical care team.', 'Active'),
('Modular Operation Theatre', 'Modern operation theatre with sterile workflow and safe procedure support.', 'Active'),
('24x7 Pharmacy', 'In-house pharmacy with emergency medicines and surgical consumables.', 'Active');
