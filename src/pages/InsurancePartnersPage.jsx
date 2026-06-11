import { Link } from "react-router-dom";
import { PageBanner } from "@/components/site/PageBanner";
import { insuranceLogos } from "@/data/insuranceLogos";
import { site } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapInsurance, usePublicList } from "@/services/content";
import heroHospital from "@/assets/images/moryahplushospital.png";

const healthInsuranceNames = new Set([
  "Aditya Birla Health Insurance Company Limited",
  "Care Health Insurance Limited",
  "Galaxy Health Insurance Company Limited",
  "ManipalCigna Health Insurance Company Limited",
  "Narayana Health Insurance Limited",
  "Niva Bupa Health Insurance Company Limited",
  "Star Health Allied Insurance Company Limited",
  "Star Health & Allied Insurance Company Limited",
]);

const darkSurfaceLogoNames = new Set([
  "Galaxy Health Insurance Company Limited",
  "IFFCO Tokio General Insurance Company Limited",
  "National Insurance Company Limited",
  "Universal Sompo General Insurance Company Limited",
  "Zurich Kotak General Insurance Company India Limited",
]);

const logoPresentation = {
  "Aditya Birla Health Insurance Company Limited": {
    cardClassName: "border-slate-800/80 bg-slate-900",
  },
  "ICICI Lombard General Insurance": {
    imageClassName: "scale-[1.75]",
  },
  "New India Assurance Company Limited": {
    cardClassName: "border-slate-800/80 bg-slate-900",
  },
  "The Oriental Insurance Company Limited": {
    cardClassName: "border-slate-800/80 bg-slate-900",
  },
};

function withLogoPresentation(logo) {
  const presentation = logoPresentation[logo.name] || {};

  return {
    ...logo,
    needsDarkSurface: logo.needsDarkSurface || darkSurfaceLogoNames.has(logo.name),
    imageClassName: logo.imageClassName || presentation.imageClassName || "",
    cardClassName: logo.cardClassName || presentation.cardClassName || "",
  };
}

function isHealthInsurance(logo) {
  if (logo.category) {
    return logo.category === "Health Insurance";
  }

  const name = (logo.name || logo.company_name || "").toLowerCase();
  return (
    healthInsuranceNames.has(logo.name) ||
    name.includes("health insurance") ||
    name.includes("niva bupa") ||
    name.includes("star health") ||
    name.includes("care health") ||
    name.includes("manipalcigna") ||
    name.includes("narayana health")
  );
}

export function InsurancePartnersPage() {
  const dynamicLogos = usePublicList("/insurance", insuranceLogos, mapInsurance).map(
    withLogoPresentation,
  );
  const healthLogos = dynamicLogos.filter(isHealthInsurance);
  const generalLogos = dynamicLogos.filter((logo) => !isHealthInsurance(logo));

  usePageMeta(
    "Insurance & Cashless Partners | Moryaplus Hospital Kunjirwadi Pune",
    `Browse insurance and cashless support partners available through ${site.shortName}.`,
  );

  return (
    <>
      <PageBanner
        title="Insurance & Cashless Partners"
        subtitle="Explore the insurers whose logos are currently listed with our hospital support desk."
        image={heroHospital}
        imageClassName="object-cover object-[72%_center]"
        crumbs={[{ label: "Insurance Partners" }]}
      />

      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Cashless Support
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Supported Insurance Company partners
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our team assists patients with documentation, coordination, and cashless treatment
            guidance for listed providers, subject to policy approval and hospital processes.
          </p>
        </div>

        <InsuranceSection
          title="Health Insurance"
          description="Health insurance companies currently listed with our support desk."
          logos={healthLogos}
        />

        <InsuranceSection
          title="General Insurance"
          description="General insurance companies currently listed for insurance and cashless coordination."
          logos={generalLogos}
        />

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full gradient-brand px-6 py-3 font-semibold text-white"
          >
            Contact Insurance Desk
          </Link>
        </div>
      </section>
    </>
  );
}

function InsuranceSection({ title, description, logos }) {
  return (
    <section className="mt-12 first:mt-10">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-sm font-semibold text-brand">{logos.length} companies</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {logos.map((logo) => (
          <article
            key={logo.name}
            className={`flex min-h-40 flex-col items-center justify-center rounded-3xl border p-6 shadow-card ${
              logo.cardClassName ||
              (logo.needsDarkSurface
                ? "border-slate-800/80 bg-slate-900"
                : "border-border/70 bg-white")
            }`}
          >
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name}
                className={`max-h-20 w-full object-contain ${logo.imageClassName}`}
                loading="lazy"
              />
            ) : (
              <div className="flex h-20 w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted text-xs font-semibold text-muted-foreground">
                No logo uploaded
              </div>
            )}
            <p
              className={`mt-4 text-center text-sm font-medium leading-relaxed ${
                logo.cardClassName || logo.needsDarkSurface ? "text-white/90" : "text-foreground/80"
              }`}
            >
              {logo.name}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
