"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const href = { pathname, params } as never;

  return (
    <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.28em]">
      <Link
        href={href}
        locale="fr"
        className={locale === "fr" ? "opacity-100" : "opacity-40 hover:opacity-100"}
      >
        FR
      </Link>
      <span className="opacity-30">/</span>
      <Link
        href={href}
        locale="en"
        className={locale === "en" ? "opacity-100" : "opacity-40 hover:opacity-100"}
      >
        EN
      </Link>
    </div>
  );
}
