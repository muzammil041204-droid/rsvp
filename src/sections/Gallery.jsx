import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { memories } from "../data/wedding";
import { SectionHeading } from "../components/SectionHeading";
import { Photo } from "../components/Photo";
import { Lightbox } from "../components/Lightbox";
import { JasmineBud, LotusMark } from "../components/Ornaments";

const TILTS = [-2.6, 2.2, -1.6, 2.6];
const photos = memories.filter((m) => m.image);

// Gold paper mounts holding each print to the album page
const CORNERS = [
  "-top-1 -left-1 [clip-path:polygon(0_0,100%_0,0_100%)]",
  "-top-1 -right-1 [clip-path:polygon(0_0,100%_0,100%_100%)]",
  "-bottom-1 -left-1 [clip-path:polygon(0_0,0_100%,100%_100%)]",
  "-bottom-1 -right-1 [clip-path:polygon(100%_0,100%_100%,0_100%)]",
];

function NextChapter({ memory }) {
  return (
    <div className="paper flex aspect-[4/5] flex-col items-center justify-center border border-dashed border-gold/55 bg-ivory px-6 text-center">
      <LotusMark className="w-12 text-gold" />
      <p className="mt-6 font-display text-[3.25rem] leading-none font-medium text-wine lining-nums">24 · 04</p>
      <p className="eyebrow mt-3">2027</p>
      <p className="mt-6 font-display text-[1.25rem] text-muted italic">{memory.body}</p>
    </div>
  );
}

export function Gallery() {
  const root = useRef(null);
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".mem-thread",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".mem-list", start: "top 72%", end: "bottom 72%", scrub: 0.8 },
          },
        );

        gsap.utils.toArray(".mem-item").forEach((item) => {
          const frame = item.querySelector(".mem-frame");
          const print = item.querySelector("[data-photo-index] img:not([aria-hidden])");
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 82%", once: true } });

          tl.fromTo(
            frame,
            { autoAlpha: 0, y: 72, rotation: 0 },
            { autoAlpha: 1, y: 0, rotation: Number(frame.dataset.tilt), duration: 1.7, ease: "power3.out" },
          )
            .fromTo(item.querySelector(".mem-pin"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.8 }, 0.2)
            .fromTo(item.querySelector(".mem-caption"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.5);

          // The print "develops" from warm sepia into full colour
          if (print) {
            tl.fromTo(
              print,
              { filter: "sepia(0.75) saturate(0.55) brightness(1.06)" },
              { filter: "sepia(0) saturate(1) brightness(1)", duration: 2.6, ease: "power1.out", clearProps: "filter" },
              0.25,
            );
          }
        });
      });
    },
    { scope: root },
  );

  const getOrigin = (i) => root.current?.querySelector(`[data-photo-index="${i}"]`);

  const handleClose = (i) => {
    setActive(null);
    root.current?.querySelector(`[data-photo-button="${i}"]`)?.focus({ preventScroll: true });
  };

  return (
    <section ref={root} aria-labelledby="gallery-title" className="overflow-x-clip px-5 py-24 md:py-32">
      <SectionHeading
        id="gallery-title"
        eyebrow="Our album"
        title={
          <>
            Moments we <em>keep</em>
          </>
        }
        intro="A few pages from the story so far. Tap a photograph to see it up close."
      />

      <ol className="mem-list relative mx-auto mt-16 max-w-[27rem] pl-9 md:mt-20 md:max-w-4xl md:pl-0">
        <span
          aria-hidden="true"
          className="mem-thread absolute top-0 bottom-0 left-3 w-px origin-top bg-linear-to-b from-gold/0 via-gold/70 to-gold/0 md:left-1/2"
        />

        {memories.map((memory, i) => {
          const tilt = TILTS[i % TILTS.length];
          const even = i % 2 === 0;
          const photoIndex = memory.image ? photos.indexOf(memory) : -1;

          return (
            <li
              key={memory.chapter}
              className={`mem-item relative flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-24 ${even ? "items-start" : "items-end"} ${i ? "mt-16 md:mt-4" : ""}`}
            >
              <JasmineBud className="mem-pin absolute top-10 -left-6 w-3 -translate-x-1/2 text-gold md:top-1/2 md:left-1/2 md:-translate-y-1/2" />

              <div className={`w-[82%] md:w-full ${even ? "" : "md:order-2"}`}>
                <div
                  data-tilt={tilt}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="mem-frame relative bg-[#fffdf8] p-2.5 pb-3.5 shadow-[0_22px_44px_-24px_rgba(70,40,15,0.6),0_2px_6px_-2px_rgba(70,40,15,0.18)]"
                >
                  {CORNERS.map((pos) => (
                    <span key={pos} aria-hidden="true" className={`absolute z-10 size-6 bg-gold/85 ${pos}`} />
                  ))}

                  {memory.image ? (
                    <button
                      type="button"
                      data-photo-button={photoIndex}
                      onClick={() => setActive(photoIndex)}
                      aria-label={`View photo: ${memory.title}`}
                      className="block w-full cursor-zoom-in"
                    >
                      <div data-photo-index={photoIndex} data-tilt={tilt}>
                        <Photo name={memory.image} alt={memory.alt} className="aspect-[4/5]" />
                      </div>
                    </button>
                  ) : (
                    <NextChapter memory={memory} />
                  )}
                </div>
              </div>

              <div
                className={`mem-caption mt-6 w-[82%] md:mt-0 md:w-full ${even ? "text-left" : "text-right md:order-1"}`}
              >
                <p className="eyebrow">
                  {memory.chapter} · {memory.note}
                </p>
                <h3 className="mt-2 font-display text-[1.75rem] leading-[1.1] text-charcoal italic md:text-[2.25rem]">
                  {memory.title}
                </h3>
              </div>
            </li>
          );
        })}
      </ol>

      {active !== null && (
        <Lightbox items={photos} index={active} onIndexChange={setActive} onClose={handleClose} getOrigin={getOrigin} />
      )}
    </section>
  );
}
