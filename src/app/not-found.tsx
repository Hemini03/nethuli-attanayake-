import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import { Link } from "@/i18n/navigation";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-family",
  style: ["normal", "italic"],
});

const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-family",
});

export default function RootNotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans text-ink">
        <div className="flex min-h-svh flex-col justify-end px-5 py-24 md:px-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">404</p>
          <h1 className="mt-6 font-display text-6xl italic">Page introuvable</h1>
          <Link href="/" className="mt-10 text-[11px] uppercase tracking-[0.24em]">
            Retour
          </Link>
        </div>
      </body>
    </html>
  );
}
