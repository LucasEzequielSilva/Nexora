import type { MetadataRoute } from "next";

const SITE = "https://www.nexoragrowth.es";

/* Se indexa el sitio entero salvo los endpoints (/api/) y la página del pitch deck. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/vsl-1/pitch-deck"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
