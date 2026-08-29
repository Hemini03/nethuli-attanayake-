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

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");
  const content = await getContent();

  return (
    <div className="px-5 pt-28 pb-24 md:px-8 md:pt-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {t("label")}
      </p>
      <RevealText as="h1" className="mt-6 font-display text-5xl italic md:text-7xl">
        {t("title")}
      </RevealText>
      <div className="mt-16 space-y-16">
        {content.journal.map((post) => (
          <Link
            key={post.slug}
            href={{
              pathname: "/journal/[slug]",
              params: { slug: post.slug },
            }}
            className="group grid gap-8 border-t border-hairline pt-8 md:grid-cols-12"
          >
            <RevealImage className="relative aspect-[16/10] overflow-hidden bg-paper-deep md:col-span-6">
              <Image
                src={post.cover.src}
                alt={loc(post.cover.alt, locale as Locale)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </RevealImage>
            <div className="md:col-span-6 md:self-end">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                {formatDate(post.date, locale)}
              </p>
              <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
                {loc(post.title, locale as Locale)}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
                {loc(post.excerpt, locale as Locale)}
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.24em]">
                {t("read")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
