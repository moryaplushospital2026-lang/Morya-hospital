import { Breadcrumb } from "./Breadcrumb";

export function PageBanner({ title, subtitle, crumbs, image, imageClassName = "" }) {
  return (
    <section className="relative overflow-hidden">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.18_0.04_250/.88),oklch(0.22_0.05_235/.72),oklch(0.24_0.06_210/.55))]" />
      <div className="relative container-x py-16 text-white md:py-24">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p> : null}
      </div>
    </section>
  );
}
