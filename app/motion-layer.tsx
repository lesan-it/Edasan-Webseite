"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const targets = document.querySelectorAll<HTMLElement>(
      ".home-v15 .soft-hero-content, .v15-section-heading, .v15-path, .v15-insight-inner > *, .v15-page-hero > *, .v15-offer, .v15-product"
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).animate(
          [{ opacity: 0.55, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 440, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
