import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LookGrid } from "@/components/lookbook/LookGrid";
import { ProcessSpread } from "@/components/lookbook/ProcessSpread";
import { RevealText } from "@/components/motion/RevealText";
import { getCollection, getContent } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return content.collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await getContent();
  const collection = getCollection(content, slug);
  if (!collection) return {};

  return {
    title: `${collection.title} — Nethuli Attanayake`,
    description: loc(collection.excerpt, locale as Locale),
    openGraph: {
      title: `${collection.title} — Nethuli Attanayake`,
      description: loc(collection.excerpt, locale as Locale),
      images: [{ url: collection.cover.src }],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await getContent();
  const collection = getCollection(content, slug);
  if (!collection) notFound();

  const t = await getTranslations("common");
  const index = content.collections.findIndex((item) => item.slug === slug);
  const next = content.collections[(index + 1) % content.collections.length];

  return (
    <article>
      <section className="relative h-[88svh] min-h-[560px] overflow-hidden bg-ink">
        <Image
          src={collection.cover.src}
          alt={loc(collection.cover.alt, locale as Locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-paper md:px-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
            {collection.season} · {collection.year}
          </p>
          <h1 className="mt-4 font-display text-6xl italic leading-none md:text-8xl">
            {collection.title}
          </h1>
        </div>
      </section>
      <section className="grid gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.28em] text-oxblood md:col-span-3">
          {collection.season}
        </p>
        <RevealText
          as="p"
          className="font-display text-2xl italic leading-[1.25] md:col-span-8 md:text-4xl"
        >
          {loc(collection.story, locale as Locale)}
        </RevealText>
      </section>
      <section className="px-5 pb-8 md:px-8">
        <LookGrid looks={collection.looks} locale={locale as Locale} />
      </section>
      <ProcessSpread items={collection.process} locale={locale as Locale} />
      <div className="flex items-center justify-between border-t border-hairline px-5 py-10 text-[11px] uppercase tracking-[0.24em] md:px-8">
        <Link href="/collections">{t("allCollections")}</Link>
        <Link
          href={{
            pathname: "/collections/[slug]",
            params: { slug: next.slug },
          }}
        >
          {t("next")} — {next.title}
        </Link>
      </div>
    </article>
  );
}
