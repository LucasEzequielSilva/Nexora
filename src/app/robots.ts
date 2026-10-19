import type { MetadataRoute } from "next";

const SITE = "https://www.nexoragrowth.es";

/* Se indexa el sitio entero salvo los endpoints (/api/) y la página de prueba (/prueba). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/prueba"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
