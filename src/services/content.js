import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { api, assetUrl } from "@/services/api";

export function usePublicList(path, fallback, mapper = (item) => item) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let alive = true;
    api
      .get(path)
      .then((data) => {
        if (alive && Array.isArray(data) && data.length) setItems(data.map(mapper));
      })
      .catch(() => {
        if (alive) setItems(fallback);
      });
    return () => {
      alive = false;
    };
  }, [fallback, mapper, path]);

  return items;
}

export function usePublicItem(path, fallback, mapper = (item) => item) {
  const [item, setItem] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    setItem(fallback);
    setLoaded(false);
    api
      .get(path)
      .then((data) => {
        if (alive) setItem(mapper(data));
      })
      .catch(() => {
        if (alive) setItem(fallback);
      })
      .finally(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, [fallback, mapper, path]);

  return [item, loaded];
}

export function mapDepartment(item) {
  return {
    ...item,
    icon: item.icon || Activity,
    name: item.name,
    short: item.short_description || item.short || "",
    summary: item.full_content || item.summary || item.short_description || "",
    highlights: splitText(item.facilities || item.highlights),
    conditions: splitText(item.conditions),
    image: assetUrl(item.image),
  };
}

export function mapFacility(item) {
  return {
    ...item,
    name: item.title || item.name,
    desc: item.description || item.desc,
    image: assetUrl(item.image),
    img: item.img,
  };
}

export function mapDoctor(item) {
  return {
    ...item,
    name: item.name,
    specialty: item.qualification || item.specialty || item.specialization,
    role: item.designation || item.role,
    bio: item.description || item.bio,
    image: assetUrl(item.photo),
    img: item.img,
  };
}

export function mapBlog(item) {
  return {
    ...item,
    title: item.title,
    excerpt: item.short_description || item.excerpt,
    description: item.meta_description || item.description,
    category: item.category || "Hospital Updates",
    readTime: item.readTime || "4 min read",
    image: assetUrl(item.image) || item.image,
    imageAlt: item.title,
    content: splitParagraphs(item.full_content || item.content),
  };
}

export function mapGallery(item) {
  return {
    src: assetUrl(item.image) || item.src,
    alt: item.title || item.alt || "Hospital gallery image",
    category: item.category,
  };
}

export function mapInsurance(item) {
  return {
    ...item,
    name: item.company_name || item.name,
    src: assetUrl(item.logo) || item.src,
    imageClassName: item.imageClassName || "",
  };
}

function splitParagraphs(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitText(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
