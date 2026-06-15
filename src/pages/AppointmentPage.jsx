import { Clock, MapPin, Phone, Siren } from "lucide-react";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { PageBanner } from "@/components/site/PageBanner";
import { site } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import appointmentBanner from "@/assets/images/hero-doctors.jpg";

export function AppointmentPage() {
  usePageMeta(
    "Book Appointment | Moryaplus Multi Speciality Hospital Kunjirwadi Pune",
    `Book an appointment with ${site.name}. Reception: ${site.phones.reception}. Kunjirwadi, Pune.`,
    {
      path: "/appointment",
      keywords:
        "book hospital appointment Kunjirwadi, doctor appointment Kunjirwadi Pune, Morya Plus Hospital appointment, online hospital appointment Pune Solapur Highway, emergency appointment Kunjirwadi",
      schema: {
        "@type": "Service",
        name: "Doctor appointment booking",
        provider: {
          "@id": "https://moryaplushospital.com/#hospital",
        },
        areaServed: "Kunjirwadi, Pune",
      },
    },
  );

  return (
    <>
      <PageBanner
        title="Book an Appointment"
        subtitle="Schedule your consultation with our hospital team through a dedicated appointment form."
        image={appointmentBanner}
        crumbs={[{ label: "Appointment" }]}
      />

      <section className="container-x grid gap-8 py-16 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-card">
          <h2 className="font-display text-2xl font-bold">Appointment Request</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in your appointment details and we will open WhatsApp with a dedicated booking
            request.
          </p>
          <div className="mt-5">
            <AppointmentForm />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3 rounded-3xl border border-border/70 bg-white p-6 text-sm shadow-card">
            <h3 className="font-semibold">Need quick help?</h3>
            <a
              href={`tel:${site.phones.receptionTel}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-brand"
            >
              <Phone className="h-4 w-4 text-brand" /> Reception | {site.phones.reception}
            </a>
            <a
              href={`tel:${site.phones.emergencyTel}`}
              className="flex items-center gap-2 text-foreground/80 hover:text-emergency"
            >
              <Siren className="h-4 w-4 text-emergency" /> Emergency | {site.phones.emergency}
            </a>
            <div className="border-t pt-3 text-foreground/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.locality}
                </span>
              </p>
            </div>
            <p className="flex items-start gap-2 text-foreground/80">
              <Clock className="mt-0.5 h-4 w-4 text-brand" />
              <span>
                {site.hours.opd}
                <br />
                {site.hours.emergency}
              </span>
            </p>
          </div>

          <div className="h-[320px] overflow-hidden rounded-3xl border border-border/70 shadow-card">
            <iframe
              title="Hospital map"
              src={site.maps.embed}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
