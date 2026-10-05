export function SectionHeading({ id, eyebrow, title, intro, className = "" }) {
  return (
    <header className={`mx-auto max-w-xl text-center ${className}`}>
      <p data-reveal className="eyebrow flex items-center justify-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
        {eyebrow}
        <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
      </p>
      <h2 id={id} data-reveal className="heading mt-4 text-[2.5rem] leading-[1.05] md:text-[3.5rem]">
        {title}
      </h2>
      {intro && (
        <p data-reveal className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-[1.75] text-pretty text-muted">
          {intro}
        </p>
      )}
    </header>
  );
}
