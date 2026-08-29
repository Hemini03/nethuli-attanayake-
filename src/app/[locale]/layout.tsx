import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Preloader } from "@/components/site/Preloader";
import { ProgressBar } from "@/components/site/ProgressBar";
import { MotionProvider } from "@/lib/motion/provider";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/content/types";

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-family",
  style: ["normal", "italic"],
});

const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-family",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = {
    fr: "/",
    en: "/en",
  };

  return {
    metadataBase: new URL("https://nethuliattanayake.com"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "fr" ? "/" : "/en",
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
      siteName: "Nethuli Attanayake",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const content = await getContent();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <Preloader />
            <ProgressBar />
            <Header />
            <main id="main">{children}</main>
            <Footer content={content} locale={locale as Locale} />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
