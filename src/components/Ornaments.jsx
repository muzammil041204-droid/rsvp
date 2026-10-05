// Hand-drawn ornaments: lotus, lobed temple arch, mandala and jasmine bud.
// All of them draw in currentColor so they can be tinted with text-* classes.

const f = (n) => n.toFixed(2);

export function LotusMark({ className = "", strokeWidth = 1.1 }) {
  return (
    <svg
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 2c3 3.5 3.6 9.6 0 16.5C16.4 11.6 17 5.5 20 2Z" />
      <path d="M20 18.5c-4.8-1-8.7-5.4-9-10.6 4.6.9 7.8 5.5 9 10.6Z" />
      <path d="M20 18.5c4.8-1 8.7-5.4 9-10.6-4.6.9-7.8 5.5-9 10.6Z" />
      <path d="M20 18.5c-6.2 1.2-12-1.3-14.5-5.6 5-.9 10.8 1.3 14.5 5.6Z" />
      <path d="M20 18.5c6.2 1.2 12-1.3 14.5-5.6-5-.9-10.8 1.3-14.5 5.6Z" />
      <path d="M11 22h18" strokeLinecap="round" />
    </svg>
  );
}

/** Two hairlines that taper into a small lotus. */
export function LotusDivider({ className = "" }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-current opacity-70" />
      <span className="size-1 rotate-45 bg-current opacity-70" />
      <LotusMark className="w-9 shrink-0" />
      <span className="size-1 rotate-45 bg-current opacity-70" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-current opacity-70" />
    </div>
  );
}

/* ── Lobed (cusped) temple arch ────────────────────────────────────────── */

const ARCH = { width: 300, springline: 160, lobes: 9 };

function lobedArch(radius) {
  const cx = ARCH.width / 2;
  const cy = ARCH.springline;
  const step = Math.PI / ARCH.lobes;
  const lobe = radius * Math.sin(step / 2) * 1.3;
  let d = `M${f(cx - radius)} ${cy}`;
  for (let i = 1; i <= ARCH.lobes; i++) {
    const a = Math.PI - i * step;
    d += ` A${f(lobe)} ${f(lobe)} 0 0 1 ${f(cx + radius * Math.cos(a))} ${f(cy - radius * Math.sin(a))}`;
  }
  return d;
}

const OUTER_R = 130;
const INNER_R = 121;
const OUTER_ARCH = lobedArch(OUTER_R);
const INNER_ARCH = lobedArch(INNER_R);
const pct = (n) => `${f((n / ARCH.width) * 100)}cqw`;

/**
 * A double-lined temple arch whose legs run to the bottom of the positioned
 * parent. The arch keeps its proportions at any width (container units).
 */
export function ArchFrame({ className = "" }) {
  const outerInset = pct(ARCH.width / 2 - OUTER_R);
  const innerInset = pct(ARCH.width / 2 - INNER_R);
  const legsTop = pct(ARCH.springline);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 @container ${className}`}>
      <svg
        viewBox={`0 0 ${ARCH.width} ${ARCH.springline}`}
        className="absolute inset-x-0 top-0 w-full overflow-visible"
        fill="none"
        stroke="currentColor"
      >
        <path d={OUTER_ARCH} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={INNER_ARCH} strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.5" />
        <g transform="translate(138 7) scale(0.6)" strokeWidth="1.4" opacity="0.9">
          <path d="M20 2c3 3.5 3.6 9.6 0 16.5C16.4 11.6 17 5.5 20 2Z" />
          <path d="M20 18.5c-4.8-1-8.7-5.4-9-10.6 4.6.9 7.8 5.5 9 10.6Z" />
          <path d="M20 18.5c4.8-1 8.7-5.4 9-10.6-4.6.9-7.8 5.5-9 10.6Z" />
        </g>
      </svg>
      <div
        className="absolute bottom-0 border-x border-b border-current"
        style={{ top: legsTop, left: outerInset, right: outerInset }}
      />
      <div
        className="absolute border-x border-b border-current opacity-50"
        style={{ top: legsTop, left: innerInset, right: innerInset, bottom: pct(OUTER_R - INNER_R) }}
      />
    </div>
  );
}

/* ── Mandala ───────────────────────────────────────────────────────────── */

const PETAL = "M0 -30 C7 -41 7 -57 0 -69 C-7 -57 -7 -41 0 -30Z";
const OUTER_PETAL = "M0 -73 C10 -80 10 -90 0 -97 C-10 -90 -10 -80 0 -73Z";
const INNER_PETAL = "M0 -5 C4 -11 4 -17 0 -23 C-4 -17 -4 -11 0 -5Z";

export function Mandala({ className = "" }) {
  return (
    <svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth="0.45" aria-hidden="true" className={className}>
      <circle r="99" />
      <circle r="71" />
      <circle r="27" />
      <circle r="24.5" strokeDasharray="0.6 2" />
      {Array.from({ length: 16 }, (_, i) => (
        <path key={`p${i}`} d={PETAL} transform={`rotate(${i * 22.5})`} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={`o${i}`} d={OUTER_PETAL} transform={`rotate(${i * 22.5 + 11.25})`} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <path key={`i${i}`} d={INNER_PETAL} transform={`rotate(${i * 45})`} />
      ))}
      {Array.from({ length: 32 }, (_, i) => (
        <circle key={`d${i}`} r="0.9" cy="-85" transform={`rotate(${i * 11.25})`} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

export function JasmineBud({ className = "" }) {
  return (
    <svg viewBox="0 0 12 16" aria-hidden="true" className={className}>
      <path d="M6 1c2.6 2.4 3.3 5.6 2 8.4-.5 1-1.2 1.6-2 1.6s-1.5-.6-2-1.6C2.7 6.6 3.4 3.4 6 1Z" fill="#fffaf0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M6 11v4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
