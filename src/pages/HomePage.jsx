import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  HeartPulse,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Quote,
  Search,
  Siren,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppointmentModal } from "@/components/site/AppointmentModalContext";
import { Counter } from "@/components/site/Counter";
import { insuranceLogos } from "@/data/insuranceLogos";
import {
  departments as fallbackDepartments,
  doctors as fallbackDoctors,
  faqs,
  facilities as fallbackFacilities,
  site,
  stats,
  testimonials,
  whyChooseUs,
} from "@/data/site";
import { mapDepartment, mapDoctor, mapFacility, usePublicList } from "@/services/content";
import { faqSchema, usePageMeta } from "@/lib/usePageMeta";
import doctor1Image from "@/assets/images/doctor-1.jpg";
import doctor2Image from "@/assets/images/doctor-2.jpg";
import doctor3Image from "@/assets/images/doctor-3.jpg";
import doctor4Image from "@/assets/images/doctor-4.jpg";
import facilityDiagnostic from "@/assets/images/facility-diagnostic.jpg";
import facilityIcu from "@/assets/images/facility-icu.jpg";
import facilityOt from "@/assets/images/facility-ot.jpg";
import facilityPharmacy from "@/assets/images/facility-pharmacy.jpg";
import facilityReception from "@/assets/images/facility-reception.jpg";
import facilityRoom from "@/assets/images/facility-room.jpg";
import heroDoctors from "@/assets/images/hero-doctors.jpg";
import heroEmergency from "@/assets/images/hero-emergency.jpg";
import heroHospital from "@/assets/images/hero-hospital.jpg";

const facilityImages = {
  icu: facilityIcu,
  ot: facilityOt,
  diagnostic: facilityDiagnostic,
  pharmacy: facilityPharmacy,
  reception: facilityReception,
  room: facilityRoom,
};

const doctorImages = {
  "doctor-1": doctor1Image,
  "doctor-2": doctor2Image,
  "doctor-3": doctor3Image,
  "doctor-4": doctor4Image,
};

const slides = [
  {
    img: heroHospital,
    imgClassName: "object-cover object-[72%_center]",
    eyebrow: "Welcome to Morya Plus",
    title: "Compassionate Healthcare, Advanced Treatment",
    text: "Morya Plus Multispeciality Hospital in Kunjirwadi offers trusted medical care, 24/7 emergency support, diagnostics, ICU, surgery, and specialist consultations under one roof.",
  },
  {
    img: heroEmergency,
    eyebrow: "Always available",
    title: "24/7 Emergency Care in Kunjirwadi",
    text: "Round-the-clock casualty, ICU, and advanced life-support ambulance service.",
  },
  {
    img: heroDoctors,
    imgClassName: "object-cover object-[center_38%] md:object-[center_30%]",
    eyebrow: "Specialist team",
    title: "Affordable Multispeciality Hospital on Pune-Solapur Highway",
    text: "Experienced consultants across 11+ departments under one roof.",
  },
];

const trustItems = [
  { icon: Clock3, label: "24/7 Emergency Care" },
  { icon: HeartPulse, label: "ICU & Ambulance" },
  { icon: Star, label: "Expert Doctors" },
  { icon: CreditCard, label: "Cashless Support" },
  { icon: Search, label: "Advanced Diagnostics" },
];

const packageItems = [
  {
    title: "Basic Health Checkup",
    text: "Routine screening for general wellness, blood pressure, sugar, and essential lab tests.",
  },
  {
    title: "Diabetes Screening",
    text: "Targeted testing and physician-led review for early detection and ongoing diabetes care.",
  },
  {
    title: "Heart Checkup",
    text: "Cardiac-focused screening including ECG and heart risk assessment for preventive care.",
  },
  {
    title: "Executive Full Body Checkup",
    text: "Comprehensive preventive screening package for busy professionals and families.",
  },
];

export function HomePage() {
  const { openAppointment } = useAppointmentModal();
  const departments = usePublicList("/departments", fallbackDepartments, mapDepartment);
  const doctors = usePublicList("/doctors", fallbackDoctors, mapDoctor);
  const facilities = usePublicList("/facilities", fallbackFacilities, mapFacility);

  usePageMeta(
    "Morya Plus Hospital Kunjirwadi Pune | 24x7 Emergency & Multispeciality Care",
    site.description,
    {
      path: "/",
      keywords:
        "Morya Plus Hospital, Moryaplus Multi Speciality Hospital, multispeciality hospital in Kunjirwadi Pune, best hospital in Kunjirwadi, emergency hospital Kunjirwadi, ICU hospital Pune Solapur Highway, hospital near Loni Kalbhor, hospital near Uruli Kanchan, cashless hospital Kunjirwadi",
      schema: faqSchema(faqs),
    },
  );

  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickActions onOpenAppointment={openAppointment} />
      <About />
      <StatsSection />
      <PackagesSection />
      <DepartmentsSection departments={departments} />
      <DoctorsSpotlightSection doctors={doctors} onOpenAppointment={openAppointment} />
      <FacilitiesSection facilities={facilities} />
      <WhyChooseUsSection />
      <EmergencySection />
      <InsuranceSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}

function Hero() {
  const { openAppointment } = useAppointmentModal();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-700">
        <img
          src={slides[index].img}
          alt={slides[index].title}
          className={`h-full w-full ${slides[index].imgClassName ?? "object-cover"}`}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.05_250/.85)] via-[oklch(0.2_0.05_250/.55)] to-transparent" />
      </div>

      <div className="container-x relative flex h-full items-center">
        <div className="fade-up max-w-2xl text-white" key={slides[index].title}>
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur">
            {slides[index].eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {slides[index].title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">{slides[index].text}</p>
          <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/80">
            24/7 Emergency | ICU & Ambulance | Expert Doctors | Cashless Support
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phones.receptionTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand shadow-soft transition hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={`tel:${site.phones.emergencyTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-emergency px-5 py-3 font-semibold text-white shadow-soft transition hover:scale-[1.02]"
            >
              <Siren className="h-4 w-4 animate-pulse" /> Emergency
            </a>
            <button
              type="button"
              onClick={openAppointment}
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-3 font-semibold text-white shadow-soft transition hover:scale-[1.02]"
            >
              <CalendarCheck className="h-4 w-4" /> Book Appointment
            </button>
            <a
              href={site.maps.profile}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((index + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30 md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setIndex(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === slideIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="container-x py-6">
      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border/60 p-4"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActions({ onOpenAppointment }) {
  const items = [
    {
      icon: Siren,
      label: "24/7 Emergency",
      desc: site.phones.emergency,
      href: `tel:${site.phones.emergencyTel}`,
      color: "bg-emergency text-white",
    },
    {
      icon: CalendarCheck,
      label: "Book Appointment",
      desc: "Fast & easy",
      action: onOpenAppointment,
      color: "bg-brand text-white",
    },
    {
      icon: Search,
      label: "Find Department",
      desc: "11+ specialities",
      href: "/departments",
      color: "bg-teal text-white",
    },
    {
      icon: Star,
      label: "Google Reviews",
      desc: `${site.rating.score} star rating`,
      href: site.maps.profile,
      color: "bg-amber-500 text-white",
      external: true,
    },
    {
      icon: MessageSquare,
      label: "Contact Hospital",
      desc: site.phones.reception,
      href: "/contact",
      color: "bg-[oklch(0.35_0.08_245)] text-white",
    },
  ];

  return (
    <section className="relative z-10 py-8">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-soft md:grid-cols-3 md:gap-4 md:p-5 lg:grid-cols-5">
          {items.map((item) => {
            const content = (
              <div className="group flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-muted">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-soft transition group-hover:scale-105 ${item.color}`}
                >
                  <item.icon className="h-6 w-6" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            );

            return item.action ? (
              <button key={item.label} type="button" onClick={item.action} className="text-left">
                {content}
              </button>
            ) : item.href.startsWith("/") ? (
              <Link key={item.label} to={item.href}>
                {content}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, desc, center = false }) {
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {kicker ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">{kicker}</span>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {desc ? <p className="mt-3 text-muted-foreground">{desc}</p> : null}
    </div>
  );
}

function About() {
  return (
    <section className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
      <div className="relative">
        <img
          src={heroHospital}
          alt="Morya Plus Hospital exterior"
          className="h-[420px] w-full rounded-3xl object-cover shadow-soft"
          loading="lazy"
        />
        <div className="absolute -bottom-6 -right-4 hidden w-56 rounded-2xl bg-white p-5 shadow-soft sm:block md:right-6">
          <div className="flex items-center gap-2 text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span className="text-sm font-semibold text-foreground">{site.rating.score} / 5</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on {site.rating.count}+ Google reviews
          </p>
        </div>
      </div>
      <div>
        <SectionTitle
          kicker="About Morya Plus"
          title="Trusted Hospital Care at Kunjirwadi, Pune Solapur Highway"
        />
        <p className="mt-5 leading-relaxed text-foreground/80">
          Morya Plus Multispeciality Hospital is committed to providing ethical, affordable, and
          patient-focused healthcare with modern facilities and experienced doctors. From routine
          consultations to emergency care, we aim to deliver dependable treatment with compassion
          and clinical excellence.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "11+ Specialities",
            "Emergency & ICU Support",
            "Diagnostics & Pharmacy",
            "Affordable Patient Care",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="inline-block h-2 w-2 rounded-full gradient-brand" /> {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 font-semibold text-white"
          >
            More about us
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-brand hover:bg-brand-soft"
          >
            Contact Hospital
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="container-x grid grid-cols-2 gap-4 py-14 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border/70 bg-white p-6 text-center shadow-card"
        >
          <div className="font-display text-3xl font-bold gradient-text md:text-4xl">
            <Counter value={item.value} suffix={item.suffix} />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </section>
  );
}

function PackagesSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <SectionTitle
          kicker="Health Packages"
          title="Preventive Health Checkup Packages"
          desc="Stay ahead of health concerns with routine screening and doctor-guided preventive care packages."
          center
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packageItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border/70 bg-brand-soft p-6 shadow-card"
            >
              <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 font-semibold text-white"
          >
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
}

function DepartmentsSection({ departments }) {
  return (
    <section className="container-x py-16">
      <SectionTitle
        kicker="Specialities"
        title="Our Specialities"
        desc="Comprehensive care across medicine, surgery, orthopaedics, gynaecology, paediatrics, diagnostics, emergency, and more."
        center
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {departments.map((department) => (
          <Link
            key={department.slug}
            to={`/departments/${department.slug}`}
            className="group rounded-2xl border border-border/70 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:gradient-brand group-hover:text-white">
              <department.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{department.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{department.short}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Learn more <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/departments"
          className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 font-semibold text-white"
        >
          View All Departments
        </Link>
      </div>
    </section>
  );
}

function DoctorsSpotlightSection({ doctors, onOpenAppointment }) {
  return (
    <section className="bg-brand-soft py-16">
      <div className="container-x">
        <SectionTitle
          kicker="Doctor Spotlight"
          title="Meet Our Specialists"
          desc="Our experienced consultants are dedicated to accurate diagnosis, ethical treatment, and compassionate patient care."
          center
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.slice(0, 4).map((doctor) => (
            <article
              key={doctor.name}
              className="overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={doctor.image || doctorImages[doctor.img]}
                  alt={doctor.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-brand">{doctor.specialty}</p>
                <p className="mt-1 text-xs text-muted-foreground">{doctor.role}</p>
                <p className="mt-3 text-sm text-foreground/75">{doctor.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-xs font-semibold text-white"
                  >
                    <CalendarCheck className="h-3.5 w-3.5" /> Book Appointment
                  </button>
                  <a
                    href={`tel:${site.phones.receptionTel}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-brand"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call Hospital
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 font-semibold text-white"
          >
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection({ facilities }) {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container-x">
        <SectionTitle
          kicker="Facilities"
          title="Modern Facilities for Better Care"
          desc="Our hospital infrastructure is designed to support fast diagnosis, safe procedures, and comfortable patient recovery."
          center
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <article
              key={facility.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facility.image || facilityImages[facility.img]}
                  alt={facility.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground">{facility.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{facility.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 font-semibold text-white"
          >
            See all facilities
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section className="container-x py-16">
      <SectionTitle kicker="Why Choose Us" title="Why Patients Choose Morya Plus" center />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/70 bg-white p-6 text-center shadow-card"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-soft">
              <item.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmergencySection() {
  return (
    <section className="bg-emergency py-16 text-white">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Emergency Support
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            24/7 Emergency Support When Every Minute Matters
          </h2>
          <p className="mt-4 max-w-2xl text-white/90">
            Our emergency team is available round the clock for urgent medical care, trauma support,
            and ambulance assistance.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phones.emergencyTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-emergency"
            >
              <Siren className="h-4 w-4" /> Call Emergency Now
            </a>
            <a
              href={site.maps.profile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold text-white"
            >
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
          <ul className="space-y-3 text-sm text-white/90">
            {[
              "24/7 emergency doctors on standby",
              "Rapid ambulance and trauma support",
              "ICU and critical care backup",
              "Immediate access to diagnostics",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  const homepageInsuranceLogos = insuranceLogos.slice(0, 8);

  return (
    <section className="container-x py-16">
      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-card">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(13,111,193,0.12),_transparent_35%),linear-gradient(135deg,rgba(240,248,255,0.92),rgba(226,245,248,0.96))] p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Insurance & Cashless
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
              Trusted Insurance Partners
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cashless and insurance support with leading healthcare insurance providers.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {homepageInsuranceLogos.map((logo) => (
                <div
                  key={logo.name}
                  className={`flex h-36 items-center justify-center rounded-3xl border p-6 shadow-sm lg:h-40 ${
                    logo.cardClassName ||
                    (logo.needsDarkSurface
                      ? "border-slate-800/80 bg-slate-900"
                      : "border-border/60 bg-white")
                  }`}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`max-h-20 w-full object-contain lg:max-h-24 ${logo.imageClassName}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/insurance-partners"
                className="inline-flex items-center justify-center rounded-full gradient-brand px-6 py-3 font-semibold text-white"
              >
                View All Insurance Partners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="container-x py-16">
      <SectionTitle
        kicker="Testimonials"
        title="What Our Patients Say"
        desc="Real experiences from patients and families who trusted Morya Plus for their care."
        center
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.name}-${testimonial.text}`}
            className="rounded-2xl border border-border/70 bg-white p-6 shadow-card"
          >
            <Quote className="h-7 w-7 text-brand/30" />
            <blockquote className="mt-3 text-foreground/85">"{testimonial.text}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full gradient-brand font-semibold text-white">
                {testimonial.name.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-semibold">{testimonial.name}</div>
                <div className="flex text-amber-500">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                      key={`${testimonial.name}-${index}`}
                      className="h-3.5 w-3.5 fill-amber-500"
                    />
                  ))}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function GoogleProfile() {
  return (
    <section className="bg-gradient-to-br from-brand to-teal py-14 text-white">
      <div className="container-x grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Google Business
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Loved by our patients on Google
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`google-star-${index}`} className="h-6 w-6 fill-amber-300" />
              ))}
            </div>
            <span className="text-2xl font-bold">{site.rating.score}</span>
            <span className="text-white/80">/ 5 | {site.rating.count}+ reviews</span>
          </div>
          <p className="mt-4 max-w-md text-white/85">
            Real reviews from real patients. Help others by sharing your experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.maps.profile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-brand"
            >
              <Star className="h-4 w-4" /> Review us on Google
            </a>
            <a
              href={site.maps.profile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" /> View on Google Maps
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {testimonials.slice(0, 4).map((testimonial) => (
            <div
              key={`${testimonial.name}-highlight`}
              className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="flex text-amber-300">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={`${testimonial.name}-small-${index}`}
                    className="h-3.5 w-3.5 fill-amber-300"
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-white/90">"{testimonial.text}"</p>
              <p className="mt-2 text-xs text-white/70">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppointmentSection({ onOpenAppointment }) {
  return (
    <section id="appointment" className="container-x py-16">
      <div className="overflow-hidden rounded-3xl shadow-soft">
        <div className="gradient-brand grid gap-8 p-10 text-white md:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Book an Appointment</h2>
            <p className="mt-3 max-w-2xl text-white/90">
              Use our dedicated appointment page to send a focused booking request to the hospital
              team without mixing it with the general contact form.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/90">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Reception | {site.phones.reception}
              </p>
              <p className="flex items-center gap-2">
                <Siren className="h-4 w-4" /> Emergency | {site.phones.emergency}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {site.address.line2}, {site.address.locality}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-3xl bg-white/12 p-6 backdrop-blur-sm">
            <p className="text-sm text-white/85">
              Go to the dedicated appointment page for the booking form and hospital details.
            </p>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand"
            >
              <CalendarCheck className="h-4 w-4" /> Open Appointment Form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-x py-16">
      <SectionTitle kicker="FAQ" title="Frequently Asked Questions" center />
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-border rounded-2xl border border-border/70 bg-white shadow-card">
        {faqs.map((faq, index) => (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              {open === index ? (
                <Minus className="h-4 w-4 text-brand" />
              ) : (
                <Plus className="h-4 w-4 text-brand" />
              )}
            </button>
            {open === index ? (
              <div className="px-5 pb-5 text-sm text-foreground/75">{faq.a}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
