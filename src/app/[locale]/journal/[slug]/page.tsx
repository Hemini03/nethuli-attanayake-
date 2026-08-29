import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealText } from "@/components/motion/RevealText";
import { getContent, getJournalPost } from "@/lib/content";
import { loc, type Locale } from "@/lib/content/types";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return content.journal.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await getContent();
  const post = getJournalPost(content, slug);
  if (!post) return {};

  return {
    title: `${loc(post.title, locale as Locale)} — Nethuli Attanayake`,
    description: loc(post.excerpt, locale as Locale),
    openGraph: {
      title: `${loc(post.title, locale as Locale)} — Nethuli Attanayake`,
      description: loc(post.excerpt, locale as Locale),
      images: [{ url: post.cover.src }],
    },
  };
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JournalPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await getContent();
  const post = getJournalPost(content, slug);
  if (!post) notFound();
  const t = await getTranslations("common");
  const paragraphs = loc(post.body, locale as Locale).split("\n\n");

  return (
    <article className="px-5 pt-28 pb-24 md:px-8 md:pt-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
        {formatDate(post.date, locale)}
      </p>
      <RevealText
        as="h1"
        className="mt-6 max-w-4xl font-display text-5xl italic leading-[1.05] md:text-7xl"
      >
        {loc(post.title, locale as Locale)}
      </RevealText>
      <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-paper-deep">
        <Image
          src={post.cover.src}
          alt={loc(post.cover.alt, locale as Locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mx-auto mt-16 max-w-2xl space-y-6 text-base leading-8 text-ink-soft">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-20 border-t border-hairline pt-8">
        <Link href="/journal" className="text-[11px] uppercase tracking-[0.24em]">
          {t("back")}
        </Link>
      </div>
    </article>
  );
}
