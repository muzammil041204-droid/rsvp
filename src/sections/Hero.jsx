import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, within } from "../lib/gsap";
import { useSiteRevealed } from "../lib/intro";
import { image } from "../lib/images";
import { couple, invocation, wedding } from "../data/wedding";
import { LotusDivider } from "../components/Ornaments";

const art = image("invitation-arch");

// Text sizes use container-query units (cqw) so the wording stays locked inside
// the painted arch of the invitation at every screen width.
export function Hero() {
  const root = useRef(null);
  const revealed = useSiteRevealed();

  // Hidden from the first paint, so nothing shows behind the intro card
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.set(".hero-art", { autoAlpha: 0, scale: 1.045 });
        gsap.set(".hero-ambient", { autoAlpha: 0 });
        gsap.set(".hero-line", { autoAlpha: 0, y: 18 });
        gsap.set(".hero-rule", { autoAlpha: 0, scaleX: 0.2 });
      });
    },
    { scope: root },
  );

  // Plays as the intro card dissolves
  useGSAP(
    () => {
      if (!revealed) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        const img = root.current.querySelector(".hero-art");
        within(img.decode(), 2500).then(() => {
          gsap.to(".hero-art", { autoAlpha: 1, scale: 1, duration: 2.4, ease: "power2.out" });
          gsap.to(".hero-ambient", { autoAlpha: 1, duration: 2.4, ease: "power1.out" });
        });

        within(document.fonts.ready, 1500).then(() => {
          gsap
            .timeline({ delay: 0.4 })
            .to(".hero-line", { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.16, ease: "power2.out" })
            .to(".hero-rule", { autoAlpha: 1, scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.55);
        });
      });
    },
    { scope: root, dependencies: [revealed] },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#f1e7d6] md:flex md:min-h-svh md:items-center md:justify-center md:py-[4svh]"
    >
      {/* Desktop only: the invitation's own colours, blurred, fill the space around the card */}
      <div aria-hidden="true" className="hero-ambient absolute inset-0 hidden md:block">
        <img src={art.src} alt="" className="size-full scale-125 object-cover opacity-55 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(241,231,214,0.85)_100%)]" />
      </div>

      <div className="@container relative mx-auto aspect-[736/1104] w-full md:h-[min(92svh,1104px)] md:w-auto md:shadow-[0_40px_90px_-40px_rgba(80,48,20,0.55)]">
        <img
          src={art.src}
          width={art.width}
          height={art.height}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-art absolute inset-0 size-full object-cover"
        />

        <div className="absolute inset-x-[18%] top-[15.4%] flex flex-col items-center text-center">
          <p lang="sa" className="hero-line font-deva text-[length:3.1cqw] leading-[1.5] tracking-[0.04em] text-gold-ink">
            {invocation}
          </p>

          <h1 id="hero-title" className="mt-[4cqw] font-display leading-[0.9] font-medium text-wine italic">
            <span className="hero-line block text-[length:12.6cqw]">{couple.groom}</span>
            <span className="hero-line my-[0.8cqw] block text-[length:7cqw] text-gold-ink">&amp;</span>
            <span className="hero-line block text-[length:12.6cqw]">{couple.bride}</span>
          </h1>

          <LotusDivider className="hero-rule mt-[4.4cqw] w-[46cqw] text-gold" />

          <p className="hero-line mt-[3.6cqw] font-display text-[length:4.1cqw] leading-[1.35] text-balance text-charcoal/85 italic">
            Together with their families
            <br />
            invite you to celebrate their wedding
          </p>

          <p className="hero-line mt-[4.4cqw] flex items-center justify-center gap-[2.6cqw] text-charcoal">
            <span className="w-[18cqw] border-y border-gold/60 py-[1.1cqw] text-[length:2.4cqw] font-semibold tracking-[0.22em] uppercase">
              {wedding.weekday}
            </span>
            <span className="flex flex-col items-center">
              <span className="text-[length:2.4cqw] font-semibold tracking-[0.3em] text-gold-ink uppercase">{wedding.month}</span>
              <span className="font-display text-[length:10.5cqw] leading-[0.95] font-medium text-wine lining-nums">
                {wedding.day}
              </span>
            </span>
            <span className="w-[18cqw] border-y border-gold/60 py-[1.1cqw] text-[length:2.4cqw] font-semibold tracking-[0.22em] uppercase">
              {wedding.year}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
