import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { getContent } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const content = await getContent();

  return (
    <div className="px-5 pt-28 pb-24 md:px-8 md:pt-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <div className="mt-8 grid gap-12 md:grid-cols-12">
        <RevealImage className="relative aspect-[3/4] overflow-hidden bg-paper-deep md:col-span-5">
          <Image
            src={content.portrait.src}
            alt={loc(content.portrait.alt, locale as Locale)}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </RevealImage>
        <div className="md:col-span-7 md:pt-10">
          <RevealText
            as="h1"
            className="font-display text-5xl italic leading-none md:text-7xl"
          >
            {content.designer}
          </RevealText>
          <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-ink-soft">
            {loc(content.location, locale as Locale)}
          </p>
          <p className="mt-10 max-w-xl text-base leading-8 text-ink-soft">
            {loc(content.bio, locale as Locale)}
          </p>
          <section className="mt-16 border-t border-hairline pt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-oxblood">
              {t("availability")}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7">
              {loc(content.availability, locale as Locale)}
            </p>
          </section>
        </div>
      </div>
      <section className="mt-24 grid gap-12 border-t border-hairline pt-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-oxblood">
            {t("education")}
          </p>
          <ul className="mt-8 space-y-8">
            {content.education.map((item) => (
              <li key={item.year} className="grid grid-cols-[72px_1fr] gap-4">
                <p className="text-[11px] tracking-[0.18em] text-ink-soft">{item.year}</p>
                <div>
                  <p className="font-display text-2xl italic">
                    {loc(item.school, locale as Locale)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {loc(item.detail, locale as Locale)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-oxblood">
            {t("skills")}
          </p>
          <ul className="mt-8 space-y-3">
            {content.skills.map((skill) => (
              <li
                key={skill.fr}
                className="border-b border-hairline pb-3 font-display text-3xl italic"
              >
                {loc(skill, locale as Locale)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
