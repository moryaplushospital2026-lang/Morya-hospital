import { PageBanner } from "@/components/site/PageBanner";
import { doctors as fallbackDoctors } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapDoctor, usePublicList } from "@/services/content";
import d1 from "@/assets/images/doctor-1.jpg";
import d2 from "@/assets/images/doctor-2.jpg";
import d3 from "@/assets/images/doctor-3.jpg";
import d4 from "@/assets/images/doctor-4.jpg";
import doctorsBanner from "@/assets/images/moryahplushospital.png";

const images = {
  "doctor-1": d1,
  "doctor-2": d2,
  "doctor-3": d3,
  "doctor-4": d4,
};

export function DoctorsPage() {
  const doctors = usePublicList("/doctors", fallbackDoctors, mapDoctor);

  usePageMeta(
    "Our Doctors & Team | Moryaplus Hospital Kunjirwadi Pune",
    "Meet the experienced consultants and specialists at Morya Plus Multispeciality Hospital, Kunjirwadi.",
  );

  return (
    <>
      <PageBanner
        title="Our Doctors"
        subtitle="A team of experienced consultants dedicated to compassionate, evidence-based care."
        image={doctorsBanner}
        imageClassName="object-[center_58%] md:object-[center_52%]"
        crumbs={[{ label: "Doctors" }]}
      />
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={doctor.image || images[doctor.img]}
                  alt={doctor.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h2 className="font-semibold">{doctor.name}</h2>
                <p className="text-sm text-brand">{doctor.specialty}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{doctor.role}</p>
                <p className="mt-3 text-sm text-foreground/75">{doctor.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
