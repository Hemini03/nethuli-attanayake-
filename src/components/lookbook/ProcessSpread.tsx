import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealImage } from "@/components/motion/RevealImage";
import { loc, type Locale, type ProcessItem } from "@/lib/content/types";

type Props = {
  items: ProcessItem[];
  locale: Locale;
};

export async function ProcessSpread({ items, locale }: Props) {
  const t = await getTranslations("process");

  return (
    <section className="border-t border-hairline px-5 py-24 md:px-8 md:py-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <div className="mt-12 space-y-24">
        {items.map((item, index) => (
          <article
            key={`${item.kind}-${index}`}
            className={`grid items-center gap-10 md:grid-cols-12 ${
              index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <RevealImage className="relative aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-7">
              <Image
                src={item.image.src}
                alt={loc(item.image.alt, locale)}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </RevealImage>
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-oxblood">
                {t(item.kind)}
              </p>
              <h3 className="mt-4 font-display text-4xl italic md:text-5xl">
                {loc(item.title, locale)}
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-7 text-ink-soft">
                {loc(item.caption, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
