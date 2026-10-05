import { families } from "../data/wedding";
import { ArchFrame, LotusDivider, LotusMark, Mandala } from "../components/Ornaments";

function Family({ side, person, relation, father, mother, home }) {
  return (
    <div data-reveal className="text-center">
      <p className="eyebrow">{side}</p>
      <p className="mt-4 font-display text-[2.75rem] leading-none text-wine italic">{person}</p>
      <p className="mt-4 text-[0.6875rem] font-semibold tracking-[0.24em] text-muted uppercase">{relation}</p>
      <p className="mt-3 font-display text-[1.375rem] leading-snug text-charcoal">{father}</p>
      <p className="font-display text-[1.375rem] leading-snug text-charcoal">
        <span className="text-gold-ink italic">&amp;</span> {mother}
      </p>
      <p className="mt-3 text-[0.8125rem] text-muted">{home}</p>
    </div>
  );
}

export function Families() {
  const [groom, bride] = families;

  return (
    <section aria-labelledby="families-title" className="paper relative overflow-hidden bg-sand px-4 py-24 md:py-32">
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 w-[160vw] max-w-[64rem] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.13]" />

      <div className="@container relative mx-auto max-w-[25rem] md:max-w-2xl">
        <ArchFrame className="text-gold/70" />

        <div className="relative px-8 pt-[31cqw] pb-16 md:px-16 md:pb-20">
          <div data-reveal>
            <LotusMark className="mx-auto w-10 text-gold" />
          </div>
          <p data-reveal className="eyebrow mt-4 text-center">
            The families
          </p>
          <h2 id="families-title" data-reveal className="heading mt-3 text-center text-[2.25rem] leading-[1.1] md:text-[2.75rem]">
            With the <em>blessings</em> of our parents
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
            <Family {...groom} />
            <LotusDivider className="mx-auto w-40 text-gold md:hidden" />
            <span aria-hidden="true" className="hidden w-px bg-linear-to-b from-transparent via-gold/60 to-transparent md:block" />
            <Family {...bride} />
          </div>
        </div>
      </div>
    </section>
  );
}
