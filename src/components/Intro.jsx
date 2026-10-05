import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollSmoother, lockScroll, unlockScroll, prefersReducedMotion } from "../lib/gsap";

const VIDEO = `${import.meta.env.BASE_URL}intro/invitation-open.mp4`;
const POSTER = `${import.meta.env.BASE_URL}intro/poster.webp`;

// Centre of the wax seal on the first frame, as a fraction of the card
const SEAL = { x: 50.1, y: 48.8 };

/**
 * The sealed gatefold card shown before the site. Tapping the seal plays the
 * opening once, then the card dissolves into the website. It is shown on every
 * visit and removed from the page after it has played.
 */
export function Intro({ onReveal, onDone }) {
  const root = useRef(null);
  const video = useRef(null);
  const started = useRef(false);
  const finished = useRef(false);
  const failed = useRef(false);
  const pulse = useRef(null);
  const [ready, setReady] = useState(false);

  // Always open at the top of the page, with the site behind it frozen
  useEffect(() => {
    window.scrollTo(0, 0);
    lockScroll();
    root.current.querySelector(".intro-seal").focus({ preventScroll: true });
    return unlockScroll;
  }, []);

  // Download the whole clip up front (iOS ignores preload) so it plays without stalling
  useEffect(() => {
    let url;
    let cancelled = false;
    const fallback = setTimeout(() => setReady(true), 6000);

    fetch(VIDEO)
      .then((res) => {
        if (!res.ok) throw new Error(`Intro video: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        video.current.src = url;
      })
      .catch(() => {
        if (!cancelled) video.current.src = VIDEO;
      });

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const { contextSafe } = useGSAP({ scope: root });

  // A slow ring around the seal once the card is ready to open
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      pulse.current = gsap.fromTo(
        ".intro-ring",
        { scale: 1, autoAlpha: 0.85 },
        { scale: 1.3, autoAlpha: 0, duration: 2.2, ease: "power1.out", repeat: -1, repeatDelay: 0.4 },
      );
      gsap.fromTo(".intro-hint", { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 1 });
    },
    { scope: root, dependencies: [ready] },
  );

  const finish = contextSafe(() => {
    if (finished.current) return;
    finished.current = true;
    // The browser may have restored an old scroll position while the card was up
    window.scrollTo(0, 0);
    ScrollSmoother.get()?.scrollTop(0);
    onReveal();
    gsap
      .timeline({ onComplete: onDone })
      .to(".intro-card", { scale: 1.06, duration: 1.6, ease: "power2.inOut" })
      .to(root.current, { autoAlpha: 0, duration: 1.3, ease: "power2.inOut" }, 0.25);
  });

  const open = contextSafe(() => {
    if (started.current) return;
    started.current = true;
    pulse.current?.kill();
    gsap.to(".intro-ring, .intro-hint", { autoAlpha: 0, duration: 0.4, overwrite: true });

    if (failed.current || prefersReducedMotion()) return finish();

    // Safety net in case playback stalls part-way
    const stall = setTimeout(finish, 12000);
    video.current.addEventListener("ended", () => clearTimeout(stall), { once: true });
    video.current.play().catch(() => {
      clearTimeout(stall);
      finish();
    });
  });

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      className="fixed inset-0 z-[70] overflow-hidden bg-black"
    >
      <div className="intro-card absolute top-1/2 left-1/2 aspect-[608/1080] w-[min(100vw,calc(100dvh*608/1080))] -translate-x-1/2 -translate-y-1/2">
        <video
          ref={video}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlayThrough={() => setReady(true)}
          onEnded={finish}
          onError={() => {
            failed.current = true;
            setReady(true);
          }}
          className="size-full object-cover"
        />

        <button
          type="button"
          onClick={open}
          aria-label="Break the seal and open the invitation"
          className="intro-seal absolute aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-[#e9cf8f]"
          style={{ left: `${SEAL.x}%`, top: `${SEAL.y}%` }}
        >
          <span aria-hidden="true" className="intro-ring absolute inset-[11%] rounded-full border border-[#e9cf8f] opacity-0" />
        </button>
      </div>

      <p className="intro-hint pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-[0.6875rem] font-semibold tracking-[0.32em] text-ocher uppercase opacity-0">
        Tap the seal to open
      </p>
    </div>
  );
}
