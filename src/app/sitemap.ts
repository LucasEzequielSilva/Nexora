import type { MetadataRoute } from "next";

const SITE = "https://www.nexoragrowth.es";

/* Páginas públicas indexables. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/casos/raquel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/casos/mbcell`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
