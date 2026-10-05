import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { Photo } from "../components/Photo";
import { Gatefold } from "../components/Gatefold";

export function CoupleMessage() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const trigger = { trigger: ".cm-photo", start: "top 82%", once: true };
        gsap.fromTo(".cm-photo", { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.5, scrollTrigger: trigger });
        gsap.fromTo(
          ".cm-photo img",
          { scale: 1.16 },
          { scale: 1, duration: 2.4, ease: "power2.out", scrollTrigger: trigger },
        );
        gsap.fromTo(
          ".cm-frame",
          { autoAlpha: 0, scale: 0.97 },
          { autoAlpha: 1, scale: 1, duration: 1.8, delay: 0.35, scrollTrigger: trigger },
        );
        gsap.fromTo(
          ".cm-card",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.4, scrollTrigger: { trigger: ".cm-card", start: "top 90%", once: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="A message from the couple" className="overflow-x-clip px-5 pb-24 md:pb-32">
      <figure className="cm-photo relative mx-auto w-full max-w-[24rem] md:max-w-[28rem]">
        <span
          aria-hidden="true"
          className="cm-frame pointer-events-none absolute -inset-[10px] rounded-t-full border border-gold/50"
        />
        <Photo
          name="couple-embrace"
          alt="Arjun holding Meenakshi from behind, kissing her forehead as she smiles with her eyes closed"
          className="aspect-[4/5] rounded-t-full"
          imgStyle={{ objectPosition: "50% 22%" }}
        />
      </figure>

      <div className="cm-card relative z-10 mx-auto -mt-24 w-[92%] max-w-[23rem]">
        <Gatefold />
      </div>
    </section>
  );
}
