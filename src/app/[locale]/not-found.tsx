import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col justify-end px-5 py-24 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">404</p>
      <h1 className="mt-6 font-display text-6xl italic md:text-8xl">Page introuvable</h1>
      <Link href="/" className="mt-10 text-[11px] uppercase tracking-[0.24em]">
        Retour
      </Link>
    </div>
  );
}
