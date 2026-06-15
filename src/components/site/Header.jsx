import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo/Morya.svg";
import { nav, site } from "@/data/site";
import { useAppointmentModal } from "./AppointmentModalContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openAppointment } = useAppointmentModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-soft" : "bg-white"
      }`}
    >
      <div className="hidden bg-brand text-xs text-white md:block">
        <div className="container-x flex items-center justify-between py-2">
          <span>
            {site.hours.emergency} | {site.address.line2}, {site.address.locality}
          </span>
          <span className="flex items-center gap-4">
            <a href={`mailto:${site.email}`} className="hover:underline">
              {site.email}
            </a>
            <a href={`tel:${site.phones.receptionTel}`} className="hover:underline">
              {site.phones.reception}
            </a>
          </span>
        </div>
      </div>

      <div className="container-x flex items-center justify-between py-4 md:py-5">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="Moryaplus Hospital logo"
            width="270"
            height="95"
            className="h-14 w-auto md:h-16"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-brand-soft px-3 py-2 text-sm font-semibold text-brand"
                  : "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-brand-soft hover:text-brand"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openAppointment}
            className="hidden items-center gap-2 rounded-full gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 md:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            className="ml-1 inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container-x grid gap-1 py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md bg-brand-soft px-3 py-3 text-sm font-semibold text-brand"
                    : "rounded-md px-3 py-3 text-sm font-medium text-foreground/90 hover:bg-brand-soft hover:text-brand"
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={openAppointment}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-4 py-3 text-sm font-semibold text-white"
            >
              <CalendarCheck className="h-4 w-4" /> Book Appointment
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
