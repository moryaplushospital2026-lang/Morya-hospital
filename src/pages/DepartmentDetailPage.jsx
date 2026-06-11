import { CalendarCheck, CheckCircle2, Phone, Siren } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAppointmentModal } from "@/components/site/AppointmentModalContext";
import { PageBanner } from "@/components/site/PageBanner";
import { departments, site } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapDepartment, usePublicItem } from "@/services/content";
import departmentBanner from "@/assets/images/hero-doctors.jpg";
import { NotFoundPage } from "./NotFoundPage";

export function DepartmentDetailPage() {
  const { slug } = useParams();
  const { openAppointment } = useAppointmentModal();
  const fallbackDepartment = departments.find((item) => item.slug === slug);
  const [department, loaded] = usePublicItem(
    `/departments/${slug}`,
    fallbackDepartment,
    mapDepartment,
  );

  usePageMeta(
    department
      ? `${department.name} | Moryaplus Hospital Kunjirwadi`
      : "Department Not Found | Moryaplus Hospital",
    department ? department.summary : "The department page you are looking for could not be found.",
  );

  if (!department && loaded) {
    return <NotFoundPage />;
  }

  if (!department) return null;

  const Icon = department.icon;

  return (
    <>
      <PageBanner
        title={department.name}
        subtitle={department.short}
        image={departmentBanner}
        crumbs={[{ label: "Departments", to: "/departments" }, { label: department.name }]}
      />

      <section className="container-x grid gap-8 py-14 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-card">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white shadow-soft">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold">About {department.name}</h2>
            <p className="mt-3 text-foreground/80">{department.summary}</p>
          </div>

          <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-card">
            <h3 className="font-display text-xl font-bold">What we offer</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {department.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-card">
            <h3 className="font-display text-xl font-bold">Common conditions treated</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {department.conditions.map((condition) => (
                <span
                  key={condition}
                  className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl gradient-brand p-6 text-white shadow-soft">
            <h3 className="text-lg font-bold">Need consultation?</h3>
            <p className="mt-1 text-sm text-white/85">
              Speak to our {department.name.toLowerCase()} team today.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={`tel:${site.phones.receptionTel}`}
                className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 hover:bg-white/25"
              >
                <Phone className="h-4 w-4" /> {site.phones.reception}
              </a>
              <a
                href={`tel:${site.phones.emergencyTel}`}
                className="flex items-center gap-2 rounded-full bg-emergency px-4 py-2.5 font-semibold"
              >
                <Siren className="h-4 w-4 animate-pulse" /> Emergency | {site.phones.emergency}
              </a>
              <button
                type="button"
                onClick={openAppointment}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 font-semibold text-brand"
              >
                <CalendarCheck className="h-4 w-4" /> Book Appointment
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-white p-6 shadow-card">
            <h3 className="font-semibold">Other departments</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {departments
                .filter((item) => item.slug !== department.slug)
                .slice(0, 6)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/departments/${item.slug}`}
                      className="text-foreground/80 hover:text-brand"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link to="/departments" className="mt-4 inline-block text-sm font-semibold text-brand">
              View all →
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
