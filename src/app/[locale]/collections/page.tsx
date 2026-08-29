import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { getContent } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("index");
  const content = await getContent();

  return (
    <div className="px-5 pt-28 pb-24 md:px-8 md:pt-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <RevealText
        as="h1"
        className="mt-6 font-display text-5xl italic md:text-7xl"
      >
        {t("label")}
      </RevealText>
      <div className="mt-16 space-y-20">
        {content.collections.map((collection, index) => (
          <Link
            key={collection.slug}
            href={{
              pathname: "/collections/[slug]",
              params: { slug: collection.slug },
            }}
            className="group grid items-end gap-8 border-t border-hairline pt-8 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                {String(index + 1).padStart(2, "0")} · {collection.season} · {collection.year}
              </p>
              <h2 className="mt-4 font-display text-5xl italic md:text-7xl">
                {collection.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft">
                {loc(collection.excerpt, locale as Locale)}
              </p>
            </div>
            <RevealImage className="relative aspect-[3/4] overflow-hidden bg-paper-deep md:col-span-7">
              <Image
                src={collection.cover.src}
                alt={loc(collection.cover.alt, locale as Locale)}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </RevealImage>
          </Link>
        ))}
      </div>
    </div>
  );
}
