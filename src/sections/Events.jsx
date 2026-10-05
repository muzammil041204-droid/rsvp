import { events } from "../data/wedding";
import { SectionHeading } from "../components/SectionHeading";
import { ArrowUpRightIcon, LampIcon, MoonGarlandIcon, PinIcon } from "../components/Icons";

const ICONS = { lamp: LampIcon, moon: MoonGarlandIcon };

const mapsUrl = ({ lat, lng }) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

function EventPanel({ event }) {
  const Icon = ICONS[event.icon];

  return (
    <article
      data-reveal="scale"
      aria-labelledby={`${event.id}-title`}
      className="paper relative rounded-t-full border border-gold/55 bg-cream px-7 pt-16 pb-10 text-center"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-[6px] rounded-t-full border border-gold/25" />

      <Icon className="relative mx-auto size-12 text-gold" />
      <p className="eyebrow mt-5">{event.label}</p>
      <h3 id={`${event.id}-title`} className="heading mt-2 text-[2.25rem] leading-tight">
        {event.title}
      </h3>

      <div className="mt-5 space-y-1">
        <p className="text-[0.9375rem] font-semibold text-charcoal">
          <time dateTime={event.dateTime}>{event.date}</time>
        </p>
        <p className="font-display text-[1.375rem] text-charcoal lining-nums">{event.time}</p>
        <p className="text-[0.8125rem] text-muted">{event.note}</p>
      </div>

      <span aria-hidden="true" className="mx-auto my-6 block h-px w-12 bg-gold/60" />

      <p className="font-display text-[1.375rem] leading-snug text-balance text-charcoal">{event.venue}</p>
      <address className="mt-1.5 text-[0.875rem] text-muted not-italic">{event.address}</address>

      <a
        href={mapsUrl(event.coords)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-line group mt-7"
        aria-label={`View location of ${event.venue} on Google Maps (opens in a new tab)`}
      >
        <PinIcon className="size-4 text-olympic-ink transition-colors group-hover:text-cream" />
        View location
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </article>
  );
}

export function Events() {
  return (
    <section aria-labelledby="events-title" className="px-5 py-24 md:py-32">
      <SectionHeading
        id="events-title"
        eyebrow="When & where"
        title={
          <>
            The <em>auspicious</em> hours
          </>
        }
        intro="Both celebrations are in Munnar, a short drive apart. Bring a light shawl for the evening. The hills cool down quickly after sunset."
      />

      <div className="mx-auto mt-14 grid max-w-[24rem] gap-10 md:max-w-4xl md:grid-cols-2 md:gap-8">
        {events.map((event) => (
          <EventPanel key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
