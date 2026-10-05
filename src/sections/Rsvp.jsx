import { useId, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { submitRsvp } from "../lib/rsvp";
import { couple, wedding } from "../data/wedding";
import { SectionHeading } from "../components/SectionHeading";
import { LotusMark } from "../components/Ornaments";
import { MinusIcon, PlusIcon } from "../components/Icons";

const MAX_GUESTS = 8;
const EMPTY = { name: "", attending: "", guests: 1, note: "" };

const CHOICES = [
  { value: "yes", label: "Joyfully accepts", selected: "peer-checked:border-wine peer-checked:bg-wine peer-checked:text-cream" },
  { value: "no", label: "Regretfully declines", selected: "peer-checked:border-charcoal peer-checked:bg-charcoal peer-checked:text-cream" },
];

function Confirmation({ reply, onEdit }) {
  const firstName = reply.name.trim().split(/\s+/)[0];
  const attending = reply.attending === "yes";

  return (
    <div role="status" tabIndex={-1} className="rsvp-done text-center outline-none">
      <LotusMark className="mx-auto w-12 text-gold" />
      <p className="heading mt-6 text-[2.25rem] leading-tight">
        Thank you, <em>{firstName}</em>
      </p>
      <p className="mx-auto mt-4 max-w-xs text-[0.9375rem] leading-[1.75] text-muted">
        {attending
          ? `Your reply for ${reply.guests} ${reply.guests === 1 ? "guest" : "guests"} has reached ${couple.groom} & ${couple.bride}. We can’t wait to celebrate with you in ${wedding.town}.`
          : "We’ll miss you, and we’re grateful you let us know. Your blessings will reach us all the same."}
      </p>
      <button
        type="button"
        onClick={onEdit}
        className="mt-7 cursor-pointer text-[0.8125rem] font-semibold text-wine underline decoration-wine/40 underline-offset-4 hover:decoration-wine"
      >
        Change my reply
      </button>
    </div>
  );
}

export function Rsvp() {
  const root = useRef(null);
  const nameRef = useRef(null);
  const choiceRef = useRef(null);
  const ids = useId();

  const [reply, setReply] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [showNote, setShowNote] = useState(false);

  const update = (field, value) => {
    setReply((r) => ({ ...r, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  // Cross-fade between the form and the confirmation
  useGSAP(
    () => {
      if (status !== "sent") return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".rsvp-done > *", { autoAlpha: 0, y: 14, duration: 1, stagger: 0.1, ease: "power2.out" });
      });
      root.current.querySelector(".rsvp-done")?.focus({ preventScroll: true });
    },
    { scope: root, dependencies: [status] },
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (reply.name.trim().length < 2) next.name = "Please add your name.";
    if (!reply.attending) next.attending = "Please let us know if you can make it.";
    setErrors(next);
    if (next.name) return nameRef.current.focus();
    if (next.attending) return choiceRef.current.focus();

    setStatus("sending");
    try {
      await submitRsvp({
        name: reply.name.trim(),
        attending: reply.attending === "yes",
        guests: reply.attending === "yes" ? reply.guests : 0,
        note: reply.note.trim(),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const accepting = reply.attending === "yes";
  const sending = status === "sending";

  return (
    <section ref={root} aria-labelledby="rsvp-title" className="px-5 py-24 md:py-32">
      <SectionHeading
        id="rsvp-title"
        eyebrow="RSVP"
        title={
          <>
            Will you <em>join</em> us?
          </>
        }
        intro={`Kindly reply by ${wedding.rsvpBy}. It takes less than a minute.`}
      />

      <div data-reveal className="paper relative mx-auto mt-12 max-w-[26rem] rounded-[3px] bg-cream px-6 pt-10 pb-9 shadow-[0_30px_60px_-36px_rgba(84,48,18,0.45)] md:px-10">
        <span aria-hidden="true" className="pointer-events-none absolute inset-[8px] border border-gold/35" />

        {status === "sent" ? (
          <Confirmation
            reply={reply}
            onEdit={() => {
              setStatus("idle");
            }}
          />
        ) : (
          <form noValidate onSubmit={handleSubmit} className="relative space-y-8">
            {/* Name */}
            <div>
              <label htmlFor={`${ids}-name`} className="eyebrow block">
                Your name
              </label>
              <input
                ref={nameRef}
                id={`${ids}-name`}
                type="text"
                autoComplete="name"
                enterKeyHint="done"
                value={reply.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${ids}-name-error` : undefined}
                placeholder="As it should appear on your place card"
                className="mt-2 block min-h-13 w-full border-0 border-b border-gold/60 bg-transparent px-0.5 font-display text-[1.375rem] text-charcoal transition-colors placeholder:font-sans placeholder:text-[0.875rem] placeholder:text-muted focus:border-wine focus:shadow-[0_1px_0_0_var(--color-wine)] focus:outline-none"
              />
              {errors.name && (
                <p id={`${ids}-name-error`} className="mt-2 text-[0.8125rem] font-medium text-wine">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Attending */}
            <fieldset aria-describedby={errors.attending ? `${ids}-attending-error` : undefined}>
              <legend className="eyebrow">Will you attend?</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {CHOICES.map((choice, i) => (
                  <label key={choice.value} className="relative block cursor-pointer">
                    <input
                      ref={i === 0 ? choiceRef : undefined}
                      type="radio"
                      name="attending"
                      value={choice.value}
                      checked={reply.attending === choice.value}
                      onChange={() => update("attending", choice.value)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-14 items-center justify-center rounded-[2px] border border-gold/55 px-2 text-center font-display text-[1.1875rem] leading-tight italic text-charcoal transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-wine hover:border-gold-ink ${choice.selected}`}
                    >
                      {choice.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.attending && (
                <p id={`${ids}-attending-error`} className="mt-2 text-[0.8125rem] font-medium text-wine">
                  {errors.attending}
                </p>
              )}
            </fieldset>

            {/* Guests */}
            {accepting && (
              <div className="flex items-center justify-between gap-4" role="group" aria-labelledby={`${ids}-guests`}>
                <div>
                  <p id={`${ids}-guests`} className="eyebrow">
                    Number of guests
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-muted">Including you</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => update("guests", Math.max(1, reply.guests - 1))}
                    disabled={reply.guests <= 1}
                    aria-label="One guest fewer"
                    className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/55 text-charcoal transition-colors hover:border-wine hover:text-wine disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gold/55 disabled:hover:text-charcoal"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                  <output aria-live="polite" className="w-11 text-center font-display text-[2rem] leading-none text-charcoal tabular-nums lining-nums">
                    {reply.guests}
                  </output>
                  <button
                    type="button"
                    onClick={() => update("guests", Math.min(MAX_GUESTS, reply.guests + 1))}
                    disabled={reply.guests >= MAX_GUESTS}
                    aria-label="One guest more"
                    className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/55 text-charcoal transition-colors hover:border-wine hover:text-wine disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gold/55 disabled:hover:text-charcoal"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Optional note */}
            {showNote ? (
              <div>
                <label htmlFor={`${ids}-note`} className="eyebrow block">
                  A note for the couple <span className="tracking-normal normal-case">(optional)</span>
                </label>
                <textarea
                  id={`${ids}-note`}
                  rows={3}
                  autoFocus
                  value={reply.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder="A wish, a memory, a song request…"
                  className="mt-3 block w-full resize-none rounded-[2px] border border-gold/45 bg-ivory/60 px-3.5 py-3 text-[1rem] leading-relaxed text-charcoal placeholder:text-muted focus:border-wine focus:outline-none"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowNote(true)}
                className="-my-2 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.8125rem] font-semibold text-gold-ink transition-colors hover:text-wine"
              >
                <PlusIcon className="size-3.5" />
                Add a note for the couple
              </button>
            )}

            <div>
              <button
                type="submit"
                disabled={sending}
                className="flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-[2px] bg-wine px-6 text-[0.75rem] font-bold tracking-[0.24em] text-cream uppercase transition-colors hover:bg-wine-deep disabled:cursor-wait disabled:opacity-80"
              >
                {sending && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />}
                {sending ? "Sending" : "Send my reply"}
              </button>
              {status === "error" && (
                <p role="alert" className="mt-3 text-center text-[0.8125rem] font-medium text-wine">
                  That didn’t go through. Please check your connection and try again.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
