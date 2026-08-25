import { Clock, Instagram, Mail, MapPin, Phone, Siren } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo/Morya.svg";
import { departments, nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 bg-[oklch(0.18_0.03_250)] text-white/90">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Moryaplus"
              width="270"
              height="95"
              loading="lazy"
              decoding="async"
              className="h-12 w-auto rounded-lg bg-white p-1"
            />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Committed to providing high-quality, affordable, and patient-centered healthcare under
            one roof.
          </p>
          <a
            href={`tel:${site.phones.emergencyTel}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold shadow-soft"
          >
            <Siren className="h-4 w-4 animate-pulse" /> Emergency | {site.phones.emergency}
          </a>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/70 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-white/70 hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Departments</h4>
          <ul className="space-y-2 text-sm">
            {departments.slice(0, 8).map((department) => (
              <li key={department.slug}>
                <Link
                  to={`/departments/${department.slug}`}
                  className="text-white/70 hover:text-white"
                >
                  {department.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-teal" />
              <a
                href={site.maps.profile}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-white hover:underline"
              >
                {site.address.line2}, {site.address.locality}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal" />
              <a href={`tel:${site.phones.receptionTel}`} className="hover:text-white">
                Reception | {site.phones.reception}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Siren className="h-4 w-4 text-emergency" />
              <a href={`tel:${site.phones.emergencyTel}`} className="hover:text-white">
                Emergency | {site.phones.emergency}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal" />
              <a
                href={`mailto:${site.email}`}
                className="whitespace-nowrap text-xs sm:text-sm hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-teal" />
              <span>
                {site.hours.opd}
                <br />
                {site.hours.emergency}
              </span>
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Morya Plus Hospital on Instagram"
              className="inline-flex items-center gap-2 text-sm text-teal hover:underline"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/60">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
