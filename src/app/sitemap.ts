import type { MetadataRoute } from "next";

const SITE = "https://www.nexoragrowth.es";

/* Páginas públicas indexables. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/vsl-1`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
