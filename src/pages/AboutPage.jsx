import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Siren,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/site/PageBanner";
import { site, whyChooseUs } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import aboutBanner from "@/assets/images/hero-hospital.jpg";
import aboutTeam from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.24 PM.jpeg";

const aboutHighlights = [
  "13 departments with coordinated multispeciality care",
  "24x7 emergency, ICU, and ambulance support",
  "In-house diagnostics, pharmacy, and modern OT",
  "Transparent, affordable, and ethical treatment planning",
];

const careCommitments = [
  {
    title: "Clinical excellence",
    text: "We combine experienced consultants, timely diagnosis, and modern infrastructure to support safe, dependable treatment.",
  },
  {
    title: "Compassionate communication",
    text: "Patients and families receive clear guidance, respectful care, and honest conversations at every stage of treatment.",
  },
  {
    title: "Accessible healthcare",
    text: "Our team focuses on practical, affordable care so quality treatment remains within reach for the local community.",
  },
];

export function AboutPage() {
  usePageMeta(
    "About Us | Moryaplus Multi Speciality Hospital, Kunjirwadi Pune",
    `Learn about ${site.name} - our vision, mission, and commitment to compassionate, affordable healthcare in Kunjirwadi, Pune.`,
    {
      path: "/about",
      keywords:
        "about Morya Plus Hospital, multispeciality hospital Kunjirwadi, affordable hospital Pune Solapur Highway, patient centered hospital Pune, Moryaplus Hospital Pune",
    },
  );

  return (
    <>
      <PageBanner
        title="About Morya Plus Hospital"
        subtitle="A patient-first multispeciality hospital on the Pune-Solapur Highway, dedicated to ethical and affordable healthcare."
        image={aboutBanner}
        crumbs={[{ label: "About" }]}
      />

      <section className="container-x py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <img
              src={aboutTeam}
              alt="Morya Plus Hospital team"
              className="h-full min-h-[320px] w-full rounded-[2rem] object-cover object-center shadow-soft"
              loading="lazy"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-white/95 p-5 shadow-card backdrop-blur sm:inset-x-auto sm:right-6 sm:w-72">
              <div className="flex items-center gap-2 text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="text-sm font-semibold text-foreground">
                  {site.rating.score} / 5 patient rating
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Trusted by families across Kunjirwadi and the Pune-Solapur Highway corridor.
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Who We Are
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Professional care built on compassion, trust, and clinical discipline
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              {site.shortName} provides patient-centered healthcare with a strong focus on
              accuracy, safety, and affordability. Our goal is to make dependable medical care
              available close to home through experienced doctors, modern facilities, and a service
              culture that puts patients first.
            </p>

            <ul className="mt-5 grid gap-2.5">
              {aboutHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-brand-soft/50 px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <span className="text-sm text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 font-semibold text-white shadow-soft"
              >
                <CalendarCheck className="h-4 w-4" />
                Contact Hospital
              </Link>
              <a
                href={`tel:${site.phones.receptionTel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 font-semibold text-brand transition hover:bg-brand-soft"
              >
                <Phone className="h-4 w-4" />
                Call Reception
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-soft py-8">
        <div className="container-x grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <MapPin className="h-5 w-5 text-brand" />
            <h3 className="mt-3 font-semibold text-foreground">Strategic location</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.address.line2}, {site.address.locality}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <Clock3 className="h-5 w-5 text-brand" />
            <h3 className="mt-3 font-semibold text-foreground">Convenient access</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{site.hours.opd}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <Siren className="h-5 w-5 text-emergency" />
            <h3 className="mt-3 font-semibold text-foreground">Emergency readiness</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.hours.emergency}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <ShieldCheck className="h-5 w-5 text-teal" />
            <h3 className="mt-3 font-semibold text-foreground">Patient-first standards</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Ethical guidance, safety-focused care, and transparent treatment communication.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-card md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Our Vision
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              A trusted destination for healthcare
            </h3>
            <p className="mt-4 max-w-2xl text-foreground/75">
              To become a trusted healthcare destination by delivering ethical, affordable, and
              advanced medical care to every patient.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/75">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Deliver dependable healthcare with trust and transparency.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Make advanced treatment accessible and affordable for local families.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Build long-term community confidence through ethical medical care.
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-card md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
              Our Mission
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Compassion. Safety. Excellence.
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-foreground/75">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  Quality healthcare services with compassion.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  Ensure patient safety and satisfaction.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  Advanced diagnostic and treatment facilities.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  Build a healthier community through preventive care.
                </li>
              </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {careCommitments.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-border/70 bg-white p-6 shadow-card"
            >
              <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Why Families Choose Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Reliable hospital care with a strong local reputation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every service is designed to make care faster to access, easier to understand, and
            more reassuring for patients and their families.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-border/70 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-soft">
                <item.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 lg:pb-20">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <div className="grid gap-8 bg-gradient-to-r from-brand to-teal p-8 text-white md:p-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                Connect With Us
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Speak with our team and plan your care with confidence
              </h2>
              <p className="mt-4 max-w-2xl text-white/90">
                Whether you need a consultation, treatment guidance, or emergency support, our
                team is ready to help you choose the right next step.
              </p>
            </div>

            <div className="rounded-3xl bg-white/12 p-6 backdrop-blur-sm">
              <div className="space-y-3 text-sm text-white/90">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Reception: {site.phones.reception}
                </p>
                <p className="flex items-center gap-2">
                  <Siren className="h-4 w-4" />
                  Emergency: {site.phones.emergency}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {site.address.locality}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Contact Us
                </Link>
                <a
                  href={site.maps.profile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 font-semibold text-white"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
