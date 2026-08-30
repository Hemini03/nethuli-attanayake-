"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] flex-col justify-end px-5 py-24 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">Error</p>
      <h1 className="mt-6 font-display text-6xl italic md:text-8xl">
        Something went wrong
      </h1>
      <div className="mt-10 flex gap-8 text-[11px] uppercase tracking-[0.24em]">
        <button type="button" onClick={() => retry()}>
          Try again
        </button>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
