import {
  Activity,
  Brain,
  Baby,
  Bone,
  BriefcaseMedical,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  Pill,
  Scissors,
  Siren,
  Stethoscope,
} from "lucide-react";

export const site = {
  name: "Moryaplus Multi Speciality Hospital",
  shortName: "Morya Plus Hospital",
  tagline: "Compassionate Healthcare, Advanced Treatment",
  description:
    "Morya Plus Multispeciality Hospital provides affordable, advanced, and patient-centered healthcare services in Kunjirwadi, Pune with 24/7 emergency care.",
  keywords:
    "Multispeciality Hospital in Kunjirwadi, Hospital in Pune Solapur Highway, Emergency Hospital Kunjirwadi, Morya Plus Hospital, Best Hospital in Kunjirwadi Pune",
  phones: {
    reception: "+91 7517369292",
    receptionTel: "+917517369292",
    emergency: "+91 9371639292",
    emergencyTel: "+919371639292",
  },
  whatsapp: "https://wa.me/919371639292",
  instagram: "https://www.instagram.com/morya_plus_hospital?igsh=MWY2NGhhemtqOTRvaA==",
  email: "moryaplusmultispeciality@gmail.com",
  address: {
    line1: "Morya Plus Multispeciality Hospital",
    line2: "937/1, Main Pune Solapur Highway",
    locality: "Kunjirwadi, Pune, Maharashtra, India",
  },
  maps: {
    profile:
      "https://www.google.com/maps/search/?api=1&query=Moryaplus%20Multi%20Speciality%20Hospital%2C%20Kunjirwadi%2C%20Pune",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1644.7850515399984!2d74.06673567594362!3d18.489091027387413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e7cc43bcc087%3A0x203e736412ab07c4!2sMoryaplus%20Multi%20Speciality%20Hospital!5e1!3m2!1sen!2sin!4v1781152168560!5m2!1sen!2sin",
  },
  hours: {
    opd: "Mon - Sat: 9:00 AM - 9:00 PM | Sun: 10:00 AM - 2:00 PM",
    emergency: "24 x 7 Emergency & Ambulance",
  },
  rating: { score: 4.8, count: 320 },
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/departments", label: "Departments" },
  { to: "/facilities", label: "Facilities" },
  { to: "/doctors", label: "Doctors" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export const departments = [
  {
    slug: "general-medicine",
    name: "General Medicine",
    icon: Stethoscope,
    short: "Comprehensive medical care for adults",
    summary:
      "Our General Medicine department offers diagnosis, treatment, and prevention of a wide range of adult illnesses with an evidence-based, holistic approach.",
    highlights: [
      "Experienced consultant physicians",
      "Chronic disease management (Diabetes, Hypertension, Thyroid)",
      "Preventive health screenings",
      "Daily OPD consultations",
    ],
    conditions: [
      "Fever & Infections",
      "Diabetes",
      "Hypertension",
      "Thyroid",
      "Asthma & COPD",
      "Lifestyle disorders",
    ],
  },
  {
    slug: "emergency-care",
    name: "Emergency Care & Trauma Center",
    icon: Siren,
    short: "24/7 emergency response and trauma support",
    summary:
      "Round-the-clock emergency response with rapid triage, trauma stabilization, advanced life support, and immediate access to critical care services.",
    highlights: [
      "24x7 casualty and trauma bay",
      "Emergency trauma management",
      "Rapid triage protocols",
      "On-call multispeciality team",
    ],
    conditions: [
      "Trauma & Accidents",
      "Heart Attack",
      "Stroke",
      "Poisoning",
      "Severe Infections",
      "Pediatric Emergencies",
    ],
  },
  {
    slug: "icu-care",
    name: "ICU Care",
    icon: Activity,
    short: "Advanced critical care unit",
    summary:
      "Fully equipped Intensive Care Unit with multi-parameter monitors, ventilators, and a trained intensivist team delivering round-the-clock critical care.",
    highlights: [
      "Ventilator support",
      "Cardiac monitoring",
      "Sepsis management",
      "Post-operative ICU",
    ],
    conditions: [
      "Respiratory Failure",
      "Septic Shock",
      "Cardiac Emergencies",
      "Post-Surgical Care",
    ],
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    icon: Scissors,
    short: "Open and laparoscopic surgical care",
    summary:
      "Our General Surgery team performs a wide range of elective and emergency procedures using modern laparoscopic and minimally invasive techniques.",
    highlights: [
      "Laparoscopic Surgery",
      "Hernia & Appendix",
      "Gall Bladder Stones",
      "Day-care Procedures",
    ],
    conditions: [
      "Hernia",
      "Appendicitis",
      "Piles & Fissures",
      "Gall Stones",
      "Hydrocele",
      "Abscess",
    ],
  },
  {
    slug: "orthopaedics",
    name: "Orthopedic & Joint Replacement",
    icon: Bone,
    short: "Bone, joint, trauma, and replacement surgery care",
    summary:
      "Comprehensive orthopedic care including fracture management, joint replacement, sports injuries, arthroscopy, and rehabilitation support by experienced surgeons.",
    highlights: ["Joint Replacement", "Trauma & Fractures", "Arthroscopy", "Spine Care"],
    conditions: ["Fractures", "Knee & Hip Pain", "Arthritis", "Sports Injury", "Back Pain"],
  },
  {
    slug: "gynaecology",
    name: "Gynaecologist & Obstetrics",
    icon: HeartPulse,
    short: "Women's health, maternity, and obstetric care",
    summary:
      "Compassionate women's health services covering obstetric care, pregnancy care, painless delivery, gynaec surgeries, and infertility evaluation.",
    highlights: [
      "Painless Delivery",
      "Antenatal Care",
      "Laparoscopic Gynaec Surgery",
      "Menstrual Disorders",
    ],
    conditions: ["Pregnancy Care", "PCOD/PCOS", "Fibroids", "Infertility", "Menopause"],
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    icon: Baby,
    short: "Child health and vaccination",
    summary:
      "Loving, child-friendly care from newborns to adolescents, including immunisation, growth monitoring, and paediatric emergency care.",
    highlights: [
      "Newborn Care (NICU support)",
      "Vaccination",
      "Growth & Nutrition",
      "Paediatric ICU",
    ],
    conditions: [
      "Fever in Children",
      "Asthma",
      "Diarrhoea",
      "Nutrition Issues",
      "Routine Vaccination",
    ],
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    icon: Microscope,
    short: "Lab, X-ray, Sonography and ECG",
    summary:
      "In-house diagnostic services with accurate reports and quick turnaround - pathology, radiology, sonography, ECG, and 2D Echo.",
    highlights: ["Pathology Lab", "Digital X-Ray", "Sonography", "ECG & 2D Echo"],
    conditions: ["Health Checks", "Pre-op Workup", "Antenatal Sonography", "Routine Blood Tests"],
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    short: "24x7 in-house medical store",
    summary:
      "Round-the-clock in-house pharmacy stocking genuine medicines, surgical consumables, and emergency drugs at affordable prices.",
    highlights: [
      "24x7 Availability",
      "Genuine Branded Medicines",
      "Affordable Pricing",
      "Home Delivery (local)",
    ],
    conditions: ["Prescription Medicines", "Surgical Items", "First Aid", "Wellness Products"],
  },
  {
    slug: "neurology-neuro-surgery",
    name: "Neurology & Neuro Surgery",
    icon: Brain,
    short: "Brain, spine, nerve, and neuro-trauma care",
    summary:
      "Specialized neurology and neuro surgery care for disorders of the brain, spine, and nervous system with emergency evaluation and advanced treatment planning.",
    highlights: [
      "Stroke Evaluation",
      "Neuro-trauma Care",
      "Spine & Nerve Disorder Management",
      "Neuro Surgery Consultation",
    ],
    conditions: [
      "Stroke",
      "Seizures",
      "Head Injury",
      "Spine Disorders",
      "Neuropathy",
    ],
  },
  {
    slug: "urology-nephrology",
    name: "Urology & Nephrology",
    icon: Activity,
    short: "Kidney, urinary tract, and renal care",
    summary:
      "Comprehensive urology and nephrology services for kidney health, urinary tract disorders, stone disease, and long-term renal care.",
    highlights: [
      "Kidney Stone Management",
      "Urinary Tract Care",
      "Renal Function Evaluation",
      "Chronic Kidney Disease Support",
    ],
    conditions: [
      "Kidney Stones",
      "UTI",
      "Prostate Concerns",
      "Kidney Disease",
      "Urinary Retention",
    ],
  },
  {
    slug: "oncology-oncology-surgery",
    name: "Oncology & Oncology Surgery",
    icon: BriefcaseMedical,
    short: "Cancer diagnosis, treatment guidance, and surgical care",
    summary:
      "Dedicated oncology and oncology surgery services focused on cancer screening, diagnosis, treatment planning, and surgical management with multidisciplinary support.",
    highlights: [
      "Cancer Screening Guidance",
      "Oncology Consultation",
      "Tumor Surgery Planning",
      "Multidisciplinary Care Support",
    ],
    conditions: [
      "Breast Lumps",
      "GI Tumors",
      "Head & Neck Tumors",
      "Soft Tissue Masses",
      "Cancer Follow-up",
    ],
  },
  {
    slug: "health-checkups",
    name: "Health Checkups",
    icon: ClipboardCheck,
    short: "Preventive wellness packages",
    summary:
      "Affordable preventive health check packages for individuals, families, and corporates - designed by our physicians for early detection.",
    highlights: [
      "Basic, Executive & Master Packages",
      "Diabetes & Cardiac Profile",
      "Whole-body Screening",
      "Corporate Packages",
    ],
    conditions: ["Annual Checkup", "Pre-Employment", "Cardiac Risk", "Diabetes Screening"],
  },
];

export const facilities = [
  { name: "ICU & Critical Care", desc: "Ventilator, monitors, intensivist-led team.", img: "icu" },
  {
    name: "Modular Operation Theatre",
    desc: "Modern OT with sterile workflow and lighting.",
    img: "ot",
  },
  {
    name: "Diagnostic Imaging",
    desc: "Digital X-Ray, sonography, and ECG/2D Echo.",
    img: "diagnostic",
  },
  {
    name: "24x7 Pharmacy",
    desc: "In-house medical store with genuine medicines.",
    img: "pharmacy",
  },
  {
    name: "Reception & Lounge",
    desc: "Comfortable, accessible patient waiting area.",
    img: "reception",
  },
  {
    name: "Private Patient Rooms",
    desc: "Clean, comfortable rooms with attendant support.",
    img: "room",
  },
];

export const doctors = [
  {
    name: "Dr. Harshad Hon",
    specialty: "MD Physician",
    role: "Consultant Physician",
    img: "doctor-harshad-hon",
    bio: "Focused on physician-led care with diagnosis and treatment for general medical conditions.",
  },
  {
    name: "Dr. Swapnil Bagdure",
    specialty: "MBBS, Ortho",
    role: "Orthopaedic Consultant",
    img: "doctor-swapnil-bagdure",
    bio: "Provides orthopaedic consultation and treatment support for bone and joint conditions.",
  },
  {
    name: "Dr. Pratik Memane",
    specialty: "MBBS, Pediatrician",
    role: "Consultant Pediatrician",
    img: "doctor-pratik-memane",
    bio: "Dedicated to child health, routine paediatric care, and age-specific medical guidance.",
  },
  {
    name: "Dr. Priyanka Memane",
    specialty: "Gynaecologist",
    role: "Consultant Gynaecologist",
    img: "doctor-4",
    bio: "Supports women's health with gynaecology consultation and treatment planning.",
  },
  {
    name: "Dr. Ameya Thakur",
    specialty: "Lap. Surgeon",
    role: "Laparoscopic Surgeon",
    img: null,
    bio: "",
  },
  {
    name: "Dr. Vitthal Shendage",
    specialty: "Anesthesia",
    role: "Anesthesia Specialist",
    img: null,
    bio: "",
  },
  {
    name: "Dr. Aniita Gawali",
    specialty: "MBBS, DGO Gynecologist",
    role: "Consultant Gynecologist",
    img: null,
    bio: "",
  },
  // {
  //   name: "Dr. Priyanka Memane",
  //   specialty: "MBBS, DGO",
  //   role: "Consultant Gynecologist",
  //   img: "doctor-4",
  //   bio: "Provides women's healthcare consultation and ongoing support across routine gynec issues.",
  // },
  {
    name: "Dr. Anup Bhende",
    specialty: "Neurologist",
    role: "Consultant Neurologist",
    img: null,
    bio: "",
  },
  {
    name: "Dr. Mangesh Gaikwad",
    specialty: "Cardioligist",
    role: "Consultant Cardiologist",
    img: null,
    bio: "",
  },
];

export const testimonials = [
  {
    name: "Suresh M.",
    text: "Clean hospital, helpful staff, and quick treatment. Highly recommend Morya Plus.",
    rating: 5,
  },
  {
    name: "Anjali P.",
    text: "Doctors explained everything clearly and treated us with care. Very satisfied with the service.",
    rating: 5,
  },
  {
    name: "Rakesh B.",
    text: "Good emergency support and affordable healthcare service. The ambulance reached on time.",
    rating: 5,
  },
  {
    name: "Meena S.",
    text: "Painless delivery, caring nursing staff, and a very supportive gynaecologist.",
    rating: 5,
  },
  {
    name: "Vijay K.",
    text: "Affordable health checkup package and reports delivered the same day.",
    rating: 5,
  },
  {
    name: "Sunita R.",
    text: "Modern facilities, hygienic rooms, and a doctor who actually listens.",
    rating: 5,
  },
];

export const whyChooseUs = [
  {
    icon: BriefcaseMedical,
    title: "Multispeciality Under One Roof",
    desc: "All major specialities, diagnostics, and pharmacy in a single facility.",
  },
  {
    icon: Siren,
    title: "24x7 Emergency & Ambulance",
    desc: "Round-the-clock casualty, ICU, and rapid ambulance response.",
  },
  {
    icon: HeartPulse,
    title: "Patient-First Approach",
    desc: "Compassionate care, transparent pricing, and ethical treatment.",
  },
  {
    icon: Microscope,
    title: "Modern Equipment",
    desc: "Up-to-date diagnostics, modular OT, and well-equipped ICU.",
  },
];

export const stats = [
  { value: 12000, suffix: "+", label: "Patients Treated" },
  { value: 25, suffix: "+", label: "Specialist Doctors" },
  { value: 50, suffix: "+", label: "Beds Capacity" },
  { value: 13, suffix: "", label: "Departments" },
];

export const faqs = [
  {
    q: "Where is Morya Plus Multispeciality Hospital located?",
    a: "We are located at 937/1, Main Pune-Solapur Highway, Kunjirwadi, Pune, Maharashtra.",
  },
  {
    q: "Do you offer 24/7 emergency services?",
    a: "Yes. Our emergency department, ICU, and ambulance services run 24x7. Call +91 9371639292 for emergencies.",
  },
  {
    q: "Which insurance and cashless facilities are accepted?",
    a: "We work with major TPAs and offer cashless treatment for several insurance providers. Please contact reception for confirmation.",
  },
  {
    q: "How can I book an appointment?",
    a: "You can call reception at +91 7517369292, WhatsApp us, or use the appointment form on this website.",
  },
  {
    q: "Do you have in-house pharmacy and diagnostics?",
    a: "Yes - pharmacy, pathology, X-ray, sonography, and ECG/2D Echo are all available in-house.",
  },
];
