import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { nearby, wedding } from "../data/wedding";
import { SectionHeading } from "../components/SectionHeading";
import { ArrowIcon, PinIcon } from "../components/Icons";

function PlaceCard({ place }) {
  const { image, credit } = place;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand">
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-[scale] duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-[2px] bg-cream/92 px-2.5 py-1.5 text-[0.625rem] font-bold tracking-[0.22em] text-olympic-ink uppercase">
          {place.kind}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.75rem] leading-[1.1] text-charcoal">{place.name}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-olympic-ink">
        <PinIcon className="size-4 shrink-0" />
        {place.distance}
        <span aria-hidden="true" className="text-olympic/60">·</span>
        <span className="font-medium">{place.travel}</span>
      </p>
      <p className="mt-3 text-[0.875rem] leading-[1.7] text-muted">{place.description}</p>
      <p className="mt-3 text-[0.6875rem] text-muted">
        Photo:{" "}
        <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 hover:text-charcoal">
          {credit.author}
        </a>
        , {credit.license}
      </p>
    </article>
  );
}

export function Nearby() {
  const root = useRef(null);
  const rail = useRef(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".place",
          { autoAlpha: 0, x: 56 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.3,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: rail.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  const scrollRail = (direction) => {
    const card = rail.current.querySelector(".place");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    rail.current.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section ref={root} aria-labelledby="nearby-title" className="overflow-x-clip py-24 md:py-32">
      <div className="px-5">
        <SectionHeading
          id="nearby-title"
          eyebrow="Explore nearby"
          title={
            <>
              While you’re in <em>{wedding.town}</em>
            </>
          }
          intro="Our favourite corners of the hills, all within an easy drive of the venue. If you can, stay an extra day."
        />
      </div>

      <div className="mx-auto mt-12 max-w-6xl md:mt-16">
        <div className="mb-6 hidden justify-end gap-2 px-8 md:flex">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label="Previous places"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/50 text-charcoal transition-colors hover:border-wine hover:bg-wine hover:text-cream"
          >
            <ArrowIcon direction="left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label="More places"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/50 text-charcoal transition-colors hover:border-wine hover:bg-wine hover:text-cream"
          >
            <ArrowIcon className="size-4" />
          </button>
        </div>

        <ul
          ref={rail}
          aria-label="Places near the venue"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto overscroll-x-contain px-5 pb-2 md:scroll-px-8 md:gap-6 md:px-8"
        >
          {nearby.map((place) => (
            <li key={place.name} className="place w-[78%] max-w-[19rem] shrink-0 snap-start md:w-[19rem]">
              <PlaceCard place={place} />
            </li>
          ))}
          <li aria-hidden="true" className="w-px shrink-0" />
        </ul>
      </div>
    </section>
  );
}
