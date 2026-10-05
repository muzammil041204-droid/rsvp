import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { useCountdown } from "../hooks/useCountdown";
import { useSiteRevealed } from "../lib/intro";
import { wedding } from "../data/wedding";

const pad = (n) => String(n).padStart(2, "0");

export function Countdown() {
  const root = useRef(null);
  const revealed = useSiteRevealed();
  const { done, days, hours, minutes, seconds } = useCountdown(wedding.startsAt);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => gsap.set(".cd-in", { autoAlpha: 0, y: 14 }));
    },
    { scope: root },
  );

  // Follows the hero once the intro card has opened
  useGSAP(
    () => {
      if (!revealed) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(".cd-in", { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.14, delay: 1.7, ease: "power2.out" });
      });
    },
    { scope: root, dependencies: [revealed] },
  );

  const units = [
    ["Days", days],
    ["Hours", hours],
    ["Minutes", minutes],
    ["Seconds", seconds],
  ];

  return (
    <section ref={root} aria-labelledby="countdown-title" className="px-4 pt-12 pb-20 text-center md:pt-20 md:pb-24">
      <h2 id="countdown-title" className="cd-in eyebrow">
        {done ? "The auspicious hour is here" : "Counting down to the muhurtham"}
      </h2>

      {done ? (
        <p className="cd-in mx-auto mt-6 max-w-sm font-display text-[1.75rem] leading-snug italic text-wine">
          Today we begin our forever. Thank you for being here.
        </p>
      ) : (
        <>
          <div aria-hidden="true" className="cd-in mx-auto mt-7 grid max-w-[25rem] grid-cols-4">
            {units.map(([label, value], i) => (
              <div key={label} className={`flex flex-col items-center ${i ? "border-l border-gold/35" : ""}`}>
                <span className="font-display text-[2.75rem] leading-none font-medium text-charcoal tabular-nums lining-nums md:text-[3.25rem]">
                  {pad(value)}
                </span>
                <span className="mt-2.5 text-[0.625rem] font-semibold tracking-[0.26em] text-muted uppercase">{label}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">
            {days} days, {hours} hours and {minutes} minutes to go.
          </p>
        </>
      )}

      <p className="cd-in mt-8 font-display text-[1.125rem] text-muted italic">
        {wedding.longDate} · {wedding.muhurtham}
      </p>
    </section>
  );
}
