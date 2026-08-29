# Nethuli Attanayake — Editorial Fashion Portfolio

A sample bilingual portfolio for **Nethuli Attanayake**, a recently graduated fashion designer based in France. Photography, type, and space do the talking. Replace the sample lookbooks with her real work.

French is the default language. English lives at `/en`. Collection titles stay French in both languages.

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · GSAP · Lenis · Sanity · Vercel

The site runs immediately on fallback content. Sanity is optional until you connect a project.

## Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` — French home
- `/en` — English home
- `/studio` — Sanity Studio (after env vars are set)

## Customize in five minutes

1. Bio, email, Instagram, city, degree — edit [`src/lib/content/fallback.ts`](src/lib/content/fallback.ts) or the Sanity **Site** document.
2. Replace Unsplash URLs with her own photography (`fashionImage` fields in Studio, or `src` in fallback).
3. Rewrite collection titles and stories if her names differ.
4. Point a domain on Vercel.

Sample copy and images are placeholders. Photographer credits are listed in the footer.

## Sanity (optional)

1. Create a project at [sanity.io](https://www.sanity.io).
2. Copy [`.env.example`](.env.example) to `.env.local`.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
4. Create a write token and set `SANITY_API_WRITE_TOKEN`.
5. Seed the sample universe:

```bash
npm run seed
```

6. Open `/studio` to edit collections, process images, journal notes, and the about page.

Until those variables exist, the public site uses [`src/lib/content/fallback.ts`](src/lib/content/fallback.ts).

## Contact form

The contact form opens a `mailto:` draft by default. If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, it sends through Resend instead.

## Deploy

Push to GitHub and import the repo in Vercel. Add the same env vars in the Vercel project if you are using Sanity or Resend.

## Notes

- `prefers-reduced-motion` disables Lenis, the preloader, SplitText, and pinned lookbook scrolling.
- Unsplash photographs are licensed for this sample and should be replaced before presenting the site as her official portfolio.
