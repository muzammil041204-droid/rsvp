import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
gsap.defaults({ ease: "power2.out", duration: 1 });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Freezes page scrolling while an overlay is open, with or without ScrollSmoother. */
export function lockScroll() {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(true);
  else document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(false);
  else document.documentElement.style.overflow = "";
}

/** Resolves when the promise settles or after `ms`, whichever comes first. */
export function within(promise, ms) {
  return Promise.race([promise.catch(() => {}), new Promise((resolve) => setTimeout(resolve, ms))]);
}

export { gsap, ScrollTrigger, ScrollSmoother, useGSAP };
