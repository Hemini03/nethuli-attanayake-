import { createClient } from "@sanity/client";
import { fallbackContent } from "../src/lib/content/fallback";

function fashionImage(image: (typeof fallbackContent.portrait)) {
  return {
    url: image.src,
    altFr: image.alt.fr,
    altEn: image.alt.en,
    photographer: image.photographer,
    photographerUrl: image.photographerUrl,
    width: image.width,
    height: image.height,
  };
}

async function seed() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
    token,
    useCdn: false,
  });

  const { collections, journal, ...settings } = fallbackContent;

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    designer: settings.designer,
    email: settings.email,
    instagram: settings.instagram,
    instagramUrl: settings.instagramUrl,
    location: settings.location,
    address: settings.address,
    manifesto: settings.manifesto,
    availability: settings.availability,
    bio: settings.bio,
    portrait: fashionImage(settings.portrait),
    heroCollectionSlug: settings.heroCollectionSlug,
    education: settings.education,
    skills: settings.skills,
  });

  for (const collection of collections) {
    await client.createOrReplace({
      _id: `collection-${collection.slug}`,
      _type: "collection",
      title: collection.title,
      slug: { _type: "slug", current: collection.slug },
      season: collection.season,
      year: collection.year,
      excerpt: collection.excerpt,
      story: collection.story,
      cover: fashionImage(collection.cover),
      looks: collection.looks.map((look) => ({
        _key: look.number,
        number: look.number,
        title: look.title,
        image: fashionImage(look.image),
      })),
      process: collection.process.map((item) => ({
        _key: item.kind,
        kind: item.kind,
        title: item.title,
        caption: item.caption,
        image: fashionImage(item.image),
      })),
    });
  }

  for (const post of journal) {
    await client.createOrReplace({
      _id: `journal-${post.slug}`,
      _type: "journalPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      date: post.date,
      excerpt: post.excerpt,
      body: post.body,
      cover: fashionImage(post.cover),
    });
  }

  console.log("Seeded Sanity with the sample Nethuli lookbooks.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
