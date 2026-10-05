import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { ArchFrame } from "./Ornaments";
import { message } from "../data/wedding";

function DoorFace({ side }) {
  return (
    <div className={`paper absolute inset-y-0 w-[200%] bg-cream ${side === "left" ? "left-0" : "right-0"}`}>
      <div className="absolute inset-[12px]">
        <ArchFrame className="text-gold/70" />
      </div>
    </div>
  );
}

/**
 * A gatefold invitation: two paper doors with "Open" written across them.
 * Tapping swings the doors open and lets the couple's note rise into view.
 */
export function Gatefold() {
  const root = useRef(null);
  const letterRef = useRef(null);
  const opening = useRef(false);
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP({ scope: root });

  const reveal = contextSafe(() => {
    if (opening.current) return;
    opening.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(true);
        letterRef.current?.focus({ preventScroll: true });
      },
    });

    if (prefersReducedMotion()) {
      tl.to(".gf-cover", { autoAlpha: 0, duration: 0.5 });
      return;
    }

    tl.set(".gf-line", { autoAlpha: 0, y: 14 })
      .to(".gf-label", { autoAlpha: 0, y: -10, scale: 1.04, duration: 0.6, ease: "power2.out" })
      .to(".gf-door-left", { rotationY: -106, duration: 1.7, ease: "power3.inOut" }, "-=0.25")
      .to(".gf-door-right", { rotationY: 106, duration: 1.7, ease: "power3.inOut" }, "<")
      .to(".gf-shade", { opacity: 0.22, duration: 1.2, ease: "power1.in" }, "<")
      .to(".gf-door", { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, "-=0.75")
      .to(".gf-line", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "power2.out" }, "-=1.2");
  });

  return (
    <div ref={root} className="relative">
      <div
        ref={letterRef}
        tabIndex={-1}
        aria-hidden={!open}
        inert={!open}
        className="paper relative flex min-h-[23rem] flex-col items-center justify-center rounded-[3px] bg-cream px-9 py-14 text-center shadow-[0_34px_60px_-34px_rgba(84,48,18,0.5)] outline-none"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-[12px] border border-gold/35" />
        <h2 className="sr-only">A message from {message.signoff}</h2>
        <p className="gf-line font-display text-[1.25rem] italic text-gold-ink">{message.greeting}</p>
        {message.lines.map((line) => (
          <p key={line} className="gf-line mt-4 font-display text-[1.375rem] leading-[1.42] text-balance text-charcoal">
            {line}
          </p>
        ))}
        <p className="gf-line mt-7 font-display text-[1.5rem] italic text-wine">{message.signoff}</p>
      </div>

      {!open && (
        <div className="gf-cover absolute inset-0 [perspective:1600px]">
          <div className="gf-door gf-door-left absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden rounded-l-[3px] shadow-[inset_-1px_0_0_rgba(176,138,62,0.4)]">
            <DoorFace side="left" />
            <span className="gf-shade absolute inset-0 bg-[#3b2414] opacity-0" />
          </div>
          <div className="gf-door gf-door-right absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden rounded-r-[3px] shadow-[inset_1px_0_0_rgba(176,138,62,0.4)]">
            <DoorFace side="right" />
            <span className="gf-shade absolute inset-0 bg-[#3b2414] opacity-0" />
          </div>

          <button
            type="button"
            onClick={reveal}
            aria-label="Open a message for you"
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-[3px] px-10 pt-14"
          >
            <span className="gf-label flex flex-col items-center">
              <span className="font-display text-[5rem] leading-[0.9] font-medium text-wine italic transition-[letter-spacing] duration-700 group-hover:tracking-[0.04em]">
                Open
              </span>
              <span className="eyebrow mt-4">a message for you</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
