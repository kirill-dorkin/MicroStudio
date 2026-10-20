import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Only the production deployment is indexable; previews are closed. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
