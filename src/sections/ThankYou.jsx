import { image } from "../lib/images";
import { couple } from "../data/wedding";
import { LotusDivider } from "../components/Ornaments";

const art = image("invitation-arch");

export function ThankYou() {
  return (
    <section aria-labelledby="thanks-title" className="pb-24 text-center md:pb-32">
      {/* The jasmine garlands from the invitation return to close the story */}
      <div
        aria-hidden="true"
        className="mx-auto aspect-[736/300] w-full max-w-xl bg-size-[100%_auto] bg-top bg-no-repeat [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
        style={{ backgroundImage: `url(${art.src})` }}
      />

      <div className="-mt-6 px-6">
        <div data-reveal="fade">
          <LotusDivider className="mx-auto w-48 text-gold" />
        </div>
        <h2 id="thanks-title" data-reveal="fade" className="heading mx-auto mt-8 max-w-sm text-[2.125rem] leading-[1.15] md:max-w-md md:text-[2.75rem]">
          Thank you for being part of <em>our story</em>.
        </h2>
        <p data-reveal="fade" className="mx-auto mt-5 max-w-xs text-[0.9375rem] leading-[1.75] text-muted md:max-w-sm">
          Your presence makes this celebration even more meaningful.
        </p>
        <p data-reveal="fade" className="mt-10 font-display text-[1.75rem] text-wine italic">
          {couple.groom} &amp; {couple.bride}
        </p>
        <p data-reveal="fade" className="eyebrow mt-3 tracking-[0.2em] normal-case">
          {couple.hashtag}
        </p>
      </div>
    </section>
  );
}
