import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { uniquePhotographers } from "@/lib/content/fallback";
import { loc, type Locale, type SiteContent } from "@/lib/content/types";

type Props = {
  content: SiteContent;
  locale: Locale;
};

export async function Footer({ content, locale }: Props) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const photographers = uniquePhotographers(content);

  return (
    <footer className="border-t border-hairline px-5 py-16 md:px-8">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
            {content.designer}
          </p>
          <p className="mt-6 font-display text-4xl italic leading-none md:text-6xl">
            {loc(content.location, locale)}
          </p>
        </div>
        <div className="space-y-4 text-sm leading-7 text-ink-soft md:col-span-3">
          <p className="whitespace-pre-line">{loc(content.address, locale)}</p>
          <p>
            <a href={`mailto:${content.email}`} className="underline-offset-4 hover:underline">
              {content.email}
            </a>
          </p>
          <p>
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {content.instagram}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.22em] md:col-span-4 md:items-end">
          <Link href="/collections">{nav("collections")}</Link>
          <Link href="/about">{nav("about")}</Link>
          <Link href="/contact">{nav("contact")}</Link>
        </div>
      </div>
      <div className="mt-16 border-t border-hairline pt-6 text-[11px] leading-6 tracking-[0.04em] text-ink-soft">
        <p>{t("sample")}</p>
        <p className="mt-2">{t("credits")}</p>
        <p className="mt-3">
          {photographers.map((person, index) => (
            <span key={person.name}>
              {index > 0 ? " · " : null}
              {person.url ? (
                <a href={person.url} target="_blank" rel="noreferrer" className="hover:text-ink">
                  {person.name}
                </a>
              ) : (
                person.name
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
