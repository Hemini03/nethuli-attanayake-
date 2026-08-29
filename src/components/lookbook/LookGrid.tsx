import Image from "next/image";
import { RevealImage } from "@/components/motion/RevealImage";
import { loc, type Locale, type Look } from "@/lib/content/types";

type Props = {
  looks: Look[];
  locale: Locale;
};

export function LookGrid({ looks, locale }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-6">
      {looks.map((look, index) => {
        const wide = index % 5 === 0 || index % 5 === 3;
        return (
          <article
            key={look.number}
            className={wide ? "md:col-span-7" : "md:col-span-5"}
          >
            <RevealImage className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
              <Image
                src={look.image.src}
                alt={loc(look.image.alt, locale)}
                fill
                sizes={wide ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                className="object-cover"
              />
            </RevealImage>
            <div className="mt-3 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em]">
              <span>{look.number}</span>
              <span className="font-display text-lg italic normal-case tracking-normal">
                {loc(look.title, locale)}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
