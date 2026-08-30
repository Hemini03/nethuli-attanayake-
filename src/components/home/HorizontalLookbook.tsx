"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import { registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";
import { loc, type Collection, type Locale, type Look } from "@/lib/content/types";

type Item = {
  collection: Collection;
  look: Look;
};

type Props = {
  items: Item[];
  locale: Locale;
};

export function HorizontalLookbook({ items, locale }: Props) {
  const t = useTranslations("lookbook");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - section.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - section.clientWidth, 1)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-hairline">
      <div className="flex items-end justify-between px-5 pt-16 pb-8 md:px-8">
        <p className="text-[11px] uppercase tracking-[0.32em] text-oxblood">
          {t("label")}
        </p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          01 — {String(items.length).padStart(2, "0")}
        </p>
      </div>
      <div className="overflow-x-auto md:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-5 pb-16 md:px-8 md:pb-20"
        >
        {items.map(({ collection, look }) => (
          <Link
            key={`${collection.slug}-${look.number}`}
            href={{
              pathname: "/collections/[slug]",
              params: { slug: collection.slug },
            }}
            className="group w-[72vw] shrink-0 md:w-[28vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
              <Image
                src={look.image.src}
                alt={loc(look.image.alt, locale)}
                fill
                sizes="(min-width: 768px) 28vw, 72vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em]">
              <span>
                {t("look")} {look.number}
              </span>
              <span className="italic normal-case tracking-normal font-display text-lg">
                {collection.title}
              </span>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
