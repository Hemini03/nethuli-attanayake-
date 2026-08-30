"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loc, type Collection, type Locale, type Look } from "@/lib/content/types";

type Item = {
  collection: Collection;
  look: Look;
};

type Props = {
  items: Item[];
  locale: Locale;
};

export function HorizontalLookbook({ items, locale }: Props) {
  const t = useTranslations("lookbook");

  return (
    <section className="border-b border-hairline">
      <div className="flex items-end justify-between px-5 pt-16 pb-8 md:px-8">
        <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
          {t("label")}
        </p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          01 — {String(items.length).padStart(2, "0")}
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex w-max gap-6 px-5 pb-16 md:px-8 md:pb-20">
          {items.map(({ collection, look }) => (
            <Link
              key={`${collection.slug}-${look.number}`}
              href={{
                pathname: "/collections/[slug]",
                params: { slug: collection.slug },
              }}
              className="group w-[72vw] shrink-0 md:w-[28vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                <Image
                  src={look.image.src}
                  alt={loc(look.image.alt, locale)}
                  fill
                  sizes="(min-width: 768px) 28vw, 72vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em]">
                <span>
                  {t("look")} {look.number}
                </span>
                <span className="italic normal-case tracking-normal font-display text-lg">
                  {collection.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
