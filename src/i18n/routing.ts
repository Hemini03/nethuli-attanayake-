import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/collections": "/collections",
    "/collections/[slug]": "/collections/[slug]",
    "/journal": "/journal",
    "/journal/[slug]": "/journal/[slug]",
    "/about": {
      fr: "/a-propos",
      en: "/about",
    },
    "/contact": "/contact",
  },
});

export type Locale = (typeof routing.locales)[number];
