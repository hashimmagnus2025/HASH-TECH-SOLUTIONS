"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
/**
 * Word-by-word mask reveal — each word sits inside an overflow-hidden mask
 * and rises into place. No SplitText dependency: plain word-splitting is
 * enough for the headline lengths this site uses.
 */
export default function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  trigger = "scroll"
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const wordEls = el.querySelectorAll("[data-word]");
    if (reducedMotion) {
      gsap.set(wordEls, {
        yPercent: 0,
        opacity: 1
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(wordEls, {
        yPercent: 110,
        opacity: 0
      }, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        delay,
        stagger: 0.045,
        ease: "power3.out",
        scrollTrigger: trigger === "scroll" ? {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        } : undefined
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [reducedMotion, delay, trigger]);
  const ref = containerRef;
  const content = words.map((word, index) => <span key={index} className="inline-block overflow-hidden pb-1 align-bottom">
      <span data-word className="inline-block will-change-transform">
        {word}
        {index < words.length - 1 ? " " : ""}
      </span>
    </span>);
  if (as === "h1") {
    return <h1 ref={ref} className={className}>
        {content}
      </h1>;
  }
  if (as === "h3") {
    return <h3 ref={ref} className={className}>
        {content}
      </h3>;
  }
  if (as === "p") {
    return <p ref={ref} className={className}>
        {content}
      </p>;
  }
  return <h2 ref={ref} className={className}>
      {content}
    </h2>;
}
