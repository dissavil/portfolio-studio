import type { MetadataRoute } from "next";

import { projects, casePath } from "@/app/data/projects";
import { site } from "@/lib/site";

/**
 * Next сам отдаст это по /sitemap.xml.
 * Новый кейс в projects.ts → новая строка в карте сайта, вручную ничего не правим.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/cases", "/services", "/contacts"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseRoutes = projects.map((project) => ({
    url: `${site.url}${casePath(project.slug)}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseRoutes];
}
