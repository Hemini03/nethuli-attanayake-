import { fallbackContent } from "./fallback";
import type { Collection, JournalPost, SiteContent } from "./types";
import { hasSanityConfig } from "@/sanity/env";
import { fetchSanityContent } from "@/sanity/fetch";

export async function getContent(): Promise<SiteContent> {
  if (!hasSanityConfig) {
    return fallbackContent;
  }

  try {
    const live = await fetchSanityContent();
    if (live) {
      return live;
    }
  } catch (error) {
    console.error("Sanity fetch failed, using fallback content.", error);
  }

  return fallbackContent;
}

export function getCollection(
  content: SiteContent,
  slug: string,
): Collection | undefined {
  return content.collections.find((collection) => collection.slug === slug);
}

export function getJournalPost(
  content: SiteContent,
  slug: string,
): JournalPost | undefined {
  return content.journal.find((post) => post.slug === slug);
}

export function getHeroLook(content: SiteContent) {
  const collection =
    getCollection(content, content.heroCollectionSlug) ?? content.collections[0];
  return {
    collection,
    look: collection.looks[0],
  };
}

export function getFeaturedLooks(content: SiteContent, count = 8) {
  return content.collections.flatMap((collection) =>
    collection.looks.slice(0, 2).map((look) => ({
      collection,
      look,
    })),
  ).slice(0, count);
}
