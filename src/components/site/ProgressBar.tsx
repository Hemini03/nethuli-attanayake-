"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    }, bar);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      data-progress
      className="pointer-events-none fixed top-0 left-0 z-[70] h-px w-full origin-left bg-oxblood mix-blend-multiply"
    />
  );
}
