"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";
import { registerGsap } from "@/lib/motion/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function RevealImage({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.35,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
