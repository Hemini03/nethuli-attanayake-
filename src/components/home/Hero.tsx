import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealText } from "@/components/motion/RevealText";
import { loc, type Locale, type SiteContent } from "@/lib/content/types";
import { getHeroLook } from "@/lib/content";

type Props = {
  content: SiteContent;
  locale: Locale;
};

export async function Hero({ content, locale }: Props) {
  const t = await getTranslations("hero");
  const { collection, look } = getHeroLook(content);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      <Image
        src={look.image.src}
        alt={loc(look.image.alt, locale)}
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-ink/45" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end px-5 pb-10 text-paper md:px-8 md:pb-12">
        <p className="text-[11px] uppercase tracking-[0.34em] text-oxblood">
          {collection.season} · {t("based")}
        </p>
        <RevealText
          as="h1"
          className="mt-6 font-sans text-[14vw] font-medium uppercase leading-[0.8] tracking-[-0.05em] md:text-[9vw]"
        >
          Nethuli
        </RevealText>
        <p className="mt-2 font-display text-[12vw] italic leading-[0.85] md:text-[7.5vw]">
          Attanayake
        </p>
        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="max-w-sm text-sm leading-6 text-paper/80">
            {loc(collection.excerpt, locale)}
          </p>
          <p className="text-[11px] uppercase tracking-[0.32em]">{t("scroll")}</p>
        </div>
      </div>
    </section>
  );
}
