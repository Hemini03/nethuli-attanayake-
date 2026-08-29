import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/site/ContactForm";
import { RevealText } from "@/components/motion/RevealText";
import { getContent } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const content = await getContent();

  return (
    <div className="grid gap-16 px-5 pt-28 pb-24 md:grid-cols-12 md:px-8 md:pt-32">
      <div className="md:col-span-7">
        <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
          {t("label")}
        </p>
        <RevealText as="h1" className="mt-6 font-display text-5xl italic md:text-7xl">
          {t("title")}
        </RevealText>
        <ContactForm content={content} />
      </div>
      <aside className="space-y-6 text-sm leading-7 text-ink-soft md:col-span-4 md:col-start-9 md:pt-20">
        <p className="whitespace-pre-line">{loc(content.address, locale as Locale)}</p>
        <p>
          <a href={`mailto:${content.email}`} className="hover:text-ink">
            {content.email}
          </a>
        </p>
        <p>
          <a href={content.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-ink">
            {content.instagram}
          </a>
        </p>
        <p>{loc(content.availability, locale as Locale)}</p>
      </aside>
    </div>
  );
}
