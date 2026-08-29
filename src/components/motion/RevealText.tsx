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

    const split = SplitText.create(el, {
      type: "lines, words",
      mask: "lines",
    });

    const tween = gsap.from(split.words, {
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

    return () => {
      tween.kill();
      split.revert();
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
