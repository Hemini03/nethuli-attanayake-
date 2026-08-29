"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";

export function ProgressBar() {
  useEffect(() => {
    registerGsap();
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    if (!bar || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
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

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === document.documentElement)
        .forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      data-progress
      className="pointer-events-none fixed top-0 left-0 z-[70] h-px w-full origin-left bg-oxblood mix-blend-multiply"
    />
  );
}
