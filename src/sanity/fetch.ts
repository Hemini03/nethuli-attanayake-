import imageUrlBuilder from "@sanity/image-url";
import type {
  Collection,
  FashionImage,
  JournalPost,
  Localized,
  ProcessKind,
  SiteContent,
} from "@/lib/content/types";
import { sanityClient } from "./client";
import { hasSanityConfig } from "./env";

type SanityImageValue = {
  url?: string;
  altFr?: string;
  altEn?: string;
  photographer?: string;
  photographerUrl?: string;
  width?: number;
  height?: number;
  image?: {
    asset?: { _ref?: string; url?: string };
  };
};

function asLocalized(value?: { fr?: string; en?: string } | null): Localized {
  return {
    fr: value?.fr || "",
    en: value?.en || "",
  };
}

function mapImage(value?: SanityImageValue | null): FashionImage {
  const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;
  const uploaded = value?.image?.asset
    ? builder?.image(value.image).width(1800).quality(80).url()
    : undefined;

  return {
    src: uploaded || value?.url || "",
    alt: { fr: value?.altFr || "", en: value?.altEn || "" },
    photographer: value?.photographer,
    photographerUrl: value?.photographerUrl,
    width: value?.width || 1600,
    height: value?.height || 2133,
  };
}

const query = `{
  "settings": *[_type == "siteSettings"][0],
  "collections": *[_type == "collection"] | order(year desc),
  "journal": *[_type == "journalPost"] | order(date desc)
}`;

export async function fetchSanityContent(): Promise<SiteContent | null> {
  if (!hasSanityConfig || !sanityClient) return null;

  const data = await sanityClient.fetch<{
    settings?: Record<string, unknown>;
    collections?: Record<string, unknown>[];
    journal?: Record<string, unknown>[];
  }>(query);

  if (!data?.settings || !data.collections?.length) {
    return null;
  }

  const settings = data.settings;
  const collections: Collection[] = data.collections.map((item) => {
    const slugValue = item.slug as { current?: string } | string | undefined;
    const slug = typeof slugValue === "string" ? slugValue : slugValue?.current || "";
    const looks = (item.looks as Record<string, unknown>[] | undefined) ?? [];
    const process = (item.process as Record<string, unknown>[] | undefined) ?? [];

    return {
      slug,
      title: String(item.title || ""),
      season: String(item.season || ""),
      year: String(item.year || ""),
      excerpt: asLocalized(item.excerpt as Localized),
      story: asLocalized(item.story as Localized),
      cover: mapImage(item.cover as SanityImageValue),
      looks: looks.map((look) => ({
        number: String(look.number || ""),
        title: asLocalized(look.title as Localized),
        image: mapImage(look.image as SanityImageValue),
      })),
      process: process.map((entry) => ({
        kind: (entry.kind as ProcessKind) || "toile",
        title: asLocalized(entry.title as Localized),
        caption: asLocalized(entry.caption as Localized),
        image: mapImage(entry.image as SanityImageValue),
      })),
    };
  });

  const journal: JournalPost[] = (data.journal ?? []).map((item) => {
    const slugValue = item.slug as { current?: string } | string | undefined;
    const slug = typeof slugValue === "string" ? slugValue : slugValue?.current || "";
    return {
      slug,
      title: asLocalized(item.title as Localized),
      date: String(item.date || ""),
      excerpt: asLocalized(item.excerpt as Localized),
      body: asLocalized(item.body as Localized),
      cover: mapImage(item.cover as SanityImageValue),
    };
  });

  return {
    designer: String(settings.designer || "Nethuli Attanayake"),
    location: asLocalized(settings.location as Localized),
    email: String(settings.email || ""),
    instagram: String(settings.instagram || ""),
    instagramUrl: String(settings.instagramUrl || ""),
    address: asLocalized(settings.address as Localized),
    manifesto: asLocalized(settings.manifesto as Localized),
    availability: asLocalized(settings.availability as Localized),
    bio: asLocalized(settings.bio as Localized),
    education: ((settings.education as Record<string, unknown>[]) || []).map((item) => ({
      year: String(item.year || ""),
      school: asLocalized(item.school as Localized),
      detail: asLocalized(item.detail as Localized),
    })),
    skills: ((settings.skills as Localized[]) || []).map((item) => asLocalized(item)),
    portrait: mapImage(settings.portrait as SanityImageValue),
    heroCollectionSlug: String(settings.heroCollectionSlug || collections[0]?.slug || ""),
    collections,
    journal,
  };
}
