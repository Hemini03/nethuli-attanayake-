"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: "words",
        aria: "hidden",
      });

      gsap.from(split.words, {
        yPercent: 110,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.035,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
