"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loc, type Locale, type SiteContent } from "@/lib/content/types";

type Props = {
  content: SiteContent;
  locale: Locale;
};

export function CollectionIndex({ content, locale }: Props) {
  const t = useTranslations("index");
  const [active, setActive] = useState(0);
  const current = content.collections[active] ?? content.collections[0];

  return (
    <section className="border-b border-hairline px-5 py-20 md:px-8 md:py-28">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-12">
        <ol className="md:col-span-6">
          {content.collections.map((collection, index) => (
            <li key={collection.slug} className="border-t border-hairline last:border-b">
              <Link
                href={{
                  pathname: "/collections/[slug]",
                  params: { slug: collection.slug },
                }}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group flex items-baseline justify-between gap-4 py-5 md:py-7"
              >
                <span className="w-10 text-[11px] tracking-[0.2em] text-ink-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-4xl italic leading-none transition-opacity md:text-6xl group-hover:opacity-100">
                  <span className={index === active ? "opacity-100" : "opacity-35"}>
                    {collection.title}
                  </span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  {collection.season}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="relative hidden aspect-[3/4] overflow-hidden md:col-span-6 md:block">
          <Image
            key={current.slug}
            src={current.cover.src}
            alt={loc(current.cover.alt, locale)}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 py-4 text-[11px] uppercase tracking-[0.22em] text-paper">
            <span>{current.year}</span>
            <span>{t("view")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
