import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { loc, type Locale, type SiteContent } from "@/lib/content/types";

type Props = {
  content: SiteContent;
  locale: Locale;
};

export async function AtelierStrip({ content, locale }: Props) {
  const t = await getTranslations("atelier");
  const process = content.collections[0]?.process ?? [];

  return (
    <section className="border-b border-hairline px-5 py-24 md:px-8 md:py-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <RevealText
        as="h2"
        className="mt-6 max-w-3xl font-display text-4xl italic leading-[1.1] md:text-6xl"
      >
        {t("title")}
      </RevealText>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {process.map((item) => (
          <article key={item.kind}>
            <RevealImage className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image
                src={item.image.src}
                alt={loc(item.image.alt, locale)}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </RevealImage>
            <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-oxblood">
              {item.kind}
            </p>
            <h3 className="mt-2 font-display text-2xl italic">
              {loc(item.title, locale)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {loc(item.caption, locale)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
