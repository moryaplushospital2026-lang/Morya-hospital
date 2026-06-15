import { Clock, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { PageBanner } from "@/components/site/PageBanner";
import { site } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import contactBanner from "@/assets/images/WhatsApp Image 2026-05-26 at 5.36.53 PM.jpeg";

export function ContactPage() {
  usePageMeta(
    "Contact | Moryaplus Multi Speciality Hospital Kunjirwadi Pune",
    `Contact ${site.name}. Reception: ${site.phones.reception}, Emergency: ${site.phones.emergency}. Kunjirwadi, Pune.`,
    {
      path: "/contact",
      keywords:
        "Morya Plus Hospital contact number, hospital in Kunjirwadi contact, emergency hospital Kunjirwadi phone number, hospital near Pune Solapur Highway address, Moryaplus Hospital location",
      schema: {
        "@type": "ContactPage",
        name: "Contact Morya Plus Hospital",
        url: "https://moryaplushospital.com/contact",
        mainEntity: {
          "@id": "https://moryaplushospital.com/#hospital",
        },
      },
    },
  );

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We're here to help - call us, message us, or visit us in Kunjirwadi."
        image={contactBanner}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-x grid gap-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <ContactCard
          icon={Phone}
          title="Reception"
          value={site.phones.reception}
          href={`tel:${site.phones.receptionTel}`}
        />
        <ContactCard
          icon={Siren}
          title="Emergency | 24x7"
          value={site.phones.emergency}
          href={`tel:${site.phones.emergencyTel}`}
          emergency
        />
        <ContactCard icon={Mail} title="Email" value={site.email} href={`mailto:${site.email}`} />
        <ContactCard
          icon={MessageCircle}
          title="WhatsApp"
          value="Chat with us"
          href={site.whatsapp}
          external
        />
      </section>

      <section className="container-x grid gap-8 pb-16 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-card">
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Send your enquiry to our hospital team. For emergencies please call directly.
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-[320px] overflow-hidden rounded-3xl border border-border/70 shadow-card">
            <iframe
              title="Map"
              src={site.maps.embed}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-3 rounded-3xl border border-border/70 bg-white p-6 text-sm shadow-card">
            <h3 className="flex items-center gap-2 font-semibold">
              <MapPin className="h-5 w-5 text-brand" /> Address
            </h3>
            <p className="text-foreground/80">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.locality}
            </p>
            <h3 className="flex items-center gap-2 border-t pt-3 font-semibold">
              <Clock className="h-5 w-5 text-brand" /> Hours
            </h3>
            <p className="text-foreground/80">
              {site.hours.opd}
              <br />
              {site.hours.emergency}
            </p>
            <a
              href={site.maps.profile}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 font-semibold text-white"
            >
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, title, value, href, external = false, emergency = false }) {
  const isEmail = title.toLowerCase() === "email";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`flex gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-card transition hover:shadow-soft ${
        isEmail ? "items-start" : "items-center"
      } ${
        emergency ? "ring-1 ring-emergency/30" : ""
      }`}
    >
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          isEmail ? "mt-0.5" : ""
        } ${
          emergency ? "bg-emergency text-white" : "gradient-brand text-white"
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
        <div
          className={`font-semibold text-foreground ${
            isEmail ? "break-words text-[0.95rem]" : "break-all"
          }`}
        >
          {value}
        </div>
      </div>
    </a>
  );
}
