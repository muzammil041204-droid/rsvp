import { gsap, ScrollTrigger, ScrollSmoother, useGSAP, MOTION_OK } from "../lib/gsap";

const HIDDEN = {
  up: { autoAlpha: 0, y: 28 },
  fade: { autoAlpha: 0 },
  scale: { autoAlpha: 0, y: 16, scale: 0.96 },
};

/**
 * Page-wide motion: smooth wheel scrolling on desktop (touch keeps native
 * scrolling) and a gentle reveal for any element marked with data-reveal.
 */
export function usePageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and (pointer: fine) and (min-width: 768px)`, () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        effects: false,
        smoothTouch: false,
      });
      return () => smoother.kill();
    });

    mm.add(MOTION_OK, () => {
      const targets = gsap.utils.toArray("[data-reveal]");
      targets.forEach((el) => gsap.set(el, HIDDEN[el.dataset.reveal] ?? HIDDEN.up));

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: "power2.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });
}
