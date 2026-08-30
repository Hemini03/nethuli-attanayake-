"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type AppPath = "/" | "/collections" | "/journal" | "/about" | "/contact";

const links: { href: AppPath; key: "collections" | "journal" | "about" | "contact" }[] = [
  { href: "/collections", key: "collections" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: AppPath;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const locale = useLocale();
  const path = getPathname({ locale, href });

  return (
    <a href={path} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 px-5 py-5 md:px-8 ${
          onHome ? "text-paper" : "text-ink"
        }`}
      >
        <div className="pointer-events-auto flex items-start justify-between">
          <NavAnchor href="/" className="text-[12px] font-medium uppercase tracking-[0.34em]">
            Nethuli Attanayake
          </NavAnchor>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.28em] opacity-80 transition-opacity hover:opacity-100"
              >
                {t(link.key)}
              </NavAnchor>
            ))}
            <LanguageSwitcher />
          </nav>
          <button
            type="button"
            className="text-[11px] uppercase tracking-[0.28em] md:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            {t("menu")}
          </button>
        </div>
      </header>
      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col justify-between bg-paper px-5 py-5 text-ink md:hidden">
          <div className="flex items-start justify-between">
            <p className="text-[12px] uppercase tracking-[0.34em]">Nethuli</p>
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.28em]"
              onClick={() => setOpen(false)}
            >
              {t("close")}
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl italic leading-none"
              >
                {t(link.key)}
              </NavAnchor>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      ) : null}
    </>
  );
}
