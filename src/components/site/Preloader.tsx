"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { usePathname } from "@/i18n/navigation";
import { registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";

const STORAGE_KEY = "nethuli-intro";

function useHasSeenIntro() {
  return useSyncExternalStore(
    () => () => undefined,
    () =>
      sessionStorage.getItem(STORAGE_KEY) === "1" || prefersReducedMotion(),
    () => false,
  );
}

export function Preloader() {
  const seen = useHasSeenIntro();
  const pathname = usePathname();
  const initialPath = useRef(pathname);
  const [done, setDone] = useState(false);
  const visible = !seen && !done;

  useEffect(() => {
    if (pathname === initialPath.current) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setDone(true);
  }, [pathname]);

  useEffect(() => {
    if (seen) return;

    registerGsap();

    const counter = { value: 0 };
    const number = document.querySelector<HTMLElement>("[data-preloader-count]");
    const root = document.querySelector<HTMLElement>("[data-preloader]");
    if (!root || !number) {
      const fallback = window.setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setDone(true);
      }, 0);
      return () => window.clearTimeout(fallback);
    }

    const finish = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setDone(true);
    };

    const timeout = window.setTimeout(finish, 3200);

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        window.clearTimeout(timeout);
        finish();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        number.textContent = String(Math.round(counter.value)).padStart(2, "0");
      },
    })
      .to("[data-preloader-word]", { y: 0, duration: 1.1, stagger: 0.08 }, 0)
      .to(root, { yPercent: -100, duration: 1.05, delay: 0.15 });

    return () => {
      window.clearTimeout(timeout);
      tl.kill();
    };
  }, [seen]);

  if (!visible) return null;

  return (
    <div
      data-preloader
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-paper px-5 py-6 text-ink md:px-8"
    >
      <p className="text-[11px] uppercase tracking-[0.32em]">Paris — 2026</p>
      <div className="overflow-hidden">
        <p
          data-preloader-word
          className="translate-y-full font-sans text-[12vw] font-medium uppercase leading-[0.85] tracking-[-0.04em] md:text-[9vw]"
        >
          Nethuli
        </p>
        <p
          data-preloader-word
          className="translate-y-full font-display text-[11vw] italic leading-[0.9] md:text-[8vw]"
        >
          Attanayake
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p className="max-w-xs text-[11px] uppercase tracking-[0.28em] text-ink-soft">
          Design de mode
        </p>
        <p
          data-preloader-count
          className="font-display text-6xl italic leading-none md:text-8xl"
        >
          00
        </p>
      </div>
    </div>
  );
}
