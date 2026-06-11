import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/site/PageBanner";
import { departments as fallbackDepartments } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapDepartment, usePublicList } from "@/services/content";
import departmentsBanner from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.25 PM (1).jpeg";

export function DepartmentsPage() {
  const departments = usePublicList("/departments", fallbackDepartments, mapDepartment);

  usePageMeta(
    "Departments & Specialities | Moryaplus Hospital Kunjirwadi",
    "Explore 11+ departments including Emergency, ICU, Surgery, Orthopaedics, Gynaecology, Paediatrics, Diagnostics and more at Morya Plus Hospital.",
  );

  return (
    <>
      <PageBanner
        title="Departments & Specialities"
        subtitle="Comprehensive care across 11+ specialities - all under one roof."
        image={departmentsBanner}
        crumbs={[{ label: "Departments" }]}
      />

      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <Link
              key={department.slug}
              to={`/departments/${department.slug}`}
              className="group rounded-2xl border border-border/70 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:gradient-brand group-hover:text-white">
                <department.icon className="h-7 w-7" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{department.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{department.short}</p>
              <p className="mt-3 line-clamp-3 text-sm text-foreground/75">{department.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                View details <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
