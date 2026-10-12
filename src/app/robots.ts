import type { MetadataRoute } from "next";

const SITE = "https://www.nexoragrowth.es";

/* Se indexa el sitio entero salvo los endpoints (/api/). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
