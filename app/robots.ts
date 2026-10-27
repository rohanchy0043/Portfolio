import type { MetadataRoute } from "next";
import { siteConfig, siteRootUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: siteConfig.basePath ? siteConfig.basePath + "/" : "/",
    },
    sitemap: siteRootUrl() + "/sitemap.xml",
    host: siteConfig.siteUrl,
  };
}
