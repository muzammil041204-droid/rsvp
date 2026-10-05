import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, lockScroll, unlockScroll, prefersReducedMotion } from "../lib/gsap";
import { image } from "../lib/images";
import { ArrowIcon, CloseIcon } from "./Icons";

const centre = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

function inViewport(el) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

/**
 * Fullscreen photo viewer. The photo grows out of the printed photograph that
 * was tapped and settles back into it on close.
 */
export function Lightbox({ items, index, onIndexChange, onClose, getOrigin }) {
  const root = useRef(null);
  const closing = useRef(false);
  const previous = useRef(index);
  const pointer = useRef(null);

  const item = items[index];
  const photo = image(item.image);
  const count = items.length;

  const currentImg = () => root.current.querySelector(".lb-photo");

  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  // Opening: grow from the tapped photograph
  useGSAP(
    () => {
      const img = currentImg();
      const origin = getOrigin(index);
      const tl = gsap.timeline();
      tl.fromTo(".lb-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, ease: "power1.out" });

      if (origin && !prefersReducedMotion()) {
        const from = origin.getBoundingClientRect();
        const to = img.getBoundingClientRect();
        const a = centre(from);
        const b = centre(to);
        tl.fromTo(
          img,
          { x: a.x - b.x, y: a.y - b.y, scale: from.width / to.width, rotation: Number(origin.dataset.tilt) || 0 },
          { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.9, ease: "power3.inOut" },
          0,
        );
      } else {
        tl.fromTo(img, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.1);
      }

      tl.fromTo(".lb-chrome", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.55);
      root.current.querySelector(".lb-close").focus({ preventScroll: true });
    },
    { scope: root },
  );

  // Switching photos: a short slide in the direction of travel
  useGSAP(
    () => {
      if (previous.current === index) return;
      const direction = index > previous.current ? 1 : -1;
      previous.current = index;
      gsap.fromTo(currentImg(), { autoAlpha: 0, x: 36 * direction }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(".lb-caption", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.1 });
    },
    { scope: root, dependencies: [index] },
  );

  const { contextSafe } = useGSAP({ scope: root });

  const close = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;

    const img = currentImg();
    const origin = getOrigin(index);
    const tl = gsap.timeline({ onComplete: () => onClose(index) });
    tl.to(".lb-chrome", { autoAlpha: 0, duration: 0.25 });

    if (origin && inViewport(origin) && !prefersReducedMotion()) {
      const from = img.getBoundingClientRect();
      const to = origin.getBoundingClientRect();
      const a = centre(from);
      const b = centre(to);
      tl.to(
        img,
        {
          x: b.x - a.x,
          y: b.y - a.y,
          scale: to.width / from.width,
          rotation: Number(origin.dataset.tilt) || 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0,
      );
      tl.to(".lb-backdrop", { autoAlpha: 0, duration: 0.55, ease: "power1.in" }, 0.15);
      tl.set(img, { autoAlpha: 0 });
    } else {
      tl.to(img, { autoAlpha: 0, scale: 0.97, duration: 0.35 }, 0);
      tl.to(".lb-backdrop", { autoAlpha: 0, duration: 0.45 }, 0.1);
    }
  });

  const go = (step) => onIndexChange((index + step + count) % count);

  // Keyboard: Escape closes, arrows navigate, Tab stays inside the viewer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const focusables = [...root.current.querySelectorAll("button")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  // Swipe to navigate, tap outside the photo to close
  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && e.target === e.currentTarget) close();
  };

  return createPortal(
    <div ref={root} role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50">
      <div className="lb-backdrop absolute inset-0 bg-[#1b1310]/95" />

      <div
        className="absolute inset-0 flex touch-none items-center justify-center px-4 pt-16 pb-40 select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointer.current = null)}
      >
        <img
          key={item.image}
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={item.alt}
          draggable="false"
          // Sized from the known aspect ratio so the box is final before the image decodes
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            width: `min(100%, calc((100svh - 14rem) * ${(photo.width / photo.height).toFixed(4)}))`,
          }}
          className="lb-photo pointer-events-none h-auto rounded-[2px] object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        />
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Close photo"
        className="lb-close lb-chrome absolute top-[max(1rem,env(safe-area-inset-top))] right-4 grid size-11 cursor-pointer place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
      >
        <CloseIcon className="size-4" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] text-center text-cream">
        <div className="lb-chrome lb-caption" aria-live="polite">
          <p className="text-[0.6875rem] font-semibold tracking-[0.3em] text-ocher uppercase">
            {item.chapter} · {item.note}
          </p>
          <p className="mt-2 font-display text-[1.5rem] leading-tight italic">{item.title}</p>
        </div>
        <div className="lb-chrome pointer-events-auto mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-cream/25 transition-colors hover:bg-cream/10"
          >
            <ArrowIcon direction="left" className="size-4" />
          </button>
          <span className="min-w-12 text-[0.75rem] font-medium tracking-[0.2em] text-cream/75 tabular-nums">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-cream/25 transition-colors hover:bg-cream/10"
          >
            <ArrowIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
