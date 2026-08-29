import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { CollectionIndex } from "@/components/home/CollectionIndex";
import { HorizontalLookbook } from "@/components/home/HorizontalLookbook";
import { AtelierStrip } from "@/components/home/AtelierStrip";
import { getContent, getFeaturedLooks } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContent();
  const looks = getFeaturedLooks(content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.designer,
    jobTitle: locale === "fr" ? "Designeuse de mode" : "Fashion designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    email: content.email,
    url: "https://nethuliattanayake.com",
    description: loc(content.bio, locale as Locale),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero content={content} locale={locale as Locale} />
      <Manifesto content={content} locale={locale as Locale} />
      <CollectionIndex content={content} locale={locale as Locale} />
      <HorizontalLookbook items={looks} locale={locale as Locale} />
      <AtelierStrip content={content} locale={locale as Locale} />
    </>
  );
}
