import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";

const site = "https://nethuliattanayake.com";

function localize(path: string, locale: string) {
  if (locale === routing.defaultLocale) {
    return `${site}${path}`;
  }
  return `${site}/${locale}${path === "/" ? "" : path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const staticPaths = ["/", "/collections", "/journal", "/about", "/contact"];
  const collectionPaths = content.collections.map(
    (collection) => `/collections/${collection.slug}`,
  );
  const journalPaths = content.journal.map((post) => `/journal/${post.slug}`);
  const aboutPaths = { fr: "/a-propos", en: "/about" };

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of [...staticPaths, ...collectionPaths, ...journalPaths]) {
      const localized =
        path === "/about" ? aboutPaths[locale] : path;
      entries.push({
        url: localize(localized, locale),
        lastModified: new Date(),
        alternates: {
          languages: {
            fr: localize(path === "/about" ? "/a-propos" : path, "fr"),
            en: localize(path === "/about" ? "/about" : path, "en"),
          },
        },
      });
    }
  }

  return entries;
}
