import { PageBanner } from "@/components/site/PageBanner";
import { facilities as fallbackFacilities } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapFacility, usePublicList } from "@/services/content";
import facilitiesBanner from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.10 PM.jpeg";
import facilityDiagnostic from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.25 PM.jpeg";
import facilityIcu from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.28 PM.jpeg";
import facilityOt from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.10 PM.jpeg";
import facilityPharmacy from "@/assets/images/WhatsApp Image 2026-05-26 at 5.37.02 PM.jpeg";
import facilityReception from "@/assets/images/WhatsApp Image 2026-05-26 at 5.36.53 PM.jpeg";
import facilityRoom from "@/assets/images/WhatsApp Image 2026-05-26 at 5.36.50 PM (1).jpeg";

const images = {
  icu: facilityIcu,
  ot: facilityOt,
  diagnostic: facilityDiagnostic,
  pharmacy: facilityPharmacy,
  reception: facilityReception,
  room: facilityRoom,
};

export function FacilitiesPage() {
  const facilities = usePublicList("/facilities", fallbackFacilities, mapFacility);

  usePageMeta(
    "Facilities | Moryaplus Multi Speciality Hospital Kunjirwadi",
    "Modern facilities at Morya Plus Hospital - ICU, modular OT, diagnostics, pharmacy, private rooms and 24x7 ambulance.",
  );

  return (
    <>
      <PageBanner
        title="Our Facilities"
        subtitle="World-class infrastructure designed around patient comfort and clinical excellence."
        image={facilitiesBanner}
        crumbs={[{ label: "Facilities" }]}
      />
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <article
              key={facility.name}
              className="overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facility.image || images[facility.img]}
                  alt={facility.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-1 text-lg font-semibold">{facility.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{facility.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
