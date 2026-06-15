import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { PageBanner } from "@/components/site/PageBanner";
import { usePageMeta } from "@/lib/usePageMeta";
import { mapGallery, usePublicList } from "@/services/content";
import galleryBanner from "@/assets/images/WhatsApp Image 2026-05-26 at 5.41.16 PM (2).jpeg";

const imageModules = import.meta.glob("../assets/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
});

const excludedImagePatterns = [
  /^WhatsApp Image 2026-05-26 at 5\.41\.16 PM \(2\)\.jpeg$/i,
  /^gallery-\d+\./i,
  /^facility-/i,
  /^doctor-\d+\./i,
  /^hero-/i,
  /^moryahospital\./i,
  /^moryahplushospital\./i,
];

function prettyAltFromPath(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function GalleryPage() {
  usePageMeta(
    "Gallery | Moryaplus Multi Speciality Hospital Kunjirwadi",
    "A visual tour of Morya Plus Hospital - facilities, departments and care moments.",
    {
      path: "/gallery",
      keywords:
        "Morya Plus Hospital gallery, hospital photos Kunjirwadi, ICU photos Kunjirwadi hospital, hospital facilities images Pune, Moryaplus hospital images",
    },
  );

  const [open, setOpen] = useState(null);
  const fallbackImages = useMemo(
    () =>
      Object.entries(imageModules)
        .sort(([left], [right]) => left.localeCompare(right))
        .filter(([path]) => {
          const fileName = path.split("/").pop() || "";
          return !excludedImagePatterns.some((pattern) => pattern.test(fileName));
        })
        .map(([path, src]) => ({
          src,
          alt: prettyAltFromPath(path),
        })),
    [],
  );
  const images = usePublicList("/gallery", fallbackImages, mapGallery);

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="A glimpse into our hospital, our team, our facilities, and the images you added in the assets folder."
        image={galleryBanner}
        imageClassName="object-[center_56%] md:object-[center_48%]"
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="container-x py-16">
        <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
          {images.map((image, index) => (
            <button
              key={`${image.alt}-${index}`}
              type="button"
              onClick={() => setOpen(index)}
              className="mb-4 block w-full overflow-hidden rounded-2xl shadow-card transition hover:shadow-soft"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full transition duration-500 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>
      {open !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={images[open].src}
            alt={images[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-soft"
          />
        </div>
      ) : null}
    </>
  );
}
