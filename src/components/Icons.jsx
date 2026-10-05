const line = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

/** Kerala nilavilakku (brass lamp) for the ceremony */
export function LampIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" strokeWidth="1.2" className={className} {...line}>
      <path d="M24 3.8c1.7 1.7 2.3 3.2 1.7 4.6-.4.9-1 1.3-1.7 1.3s-1.3-.4-1.7-1.3c-.6-1.4 0-2.9 1.7-4.6Z" />
      <path d="M24 9.7v4.8" />
      <path d="M13.5 9c1.4 1.8 1.4 3.4 0 4.6-1.4-1.2-1.4-2.8 0-4.6Z" />
      <path d="M34.5 9c1.4 1.8 1.4 3.4 0 4.6-1.4-1.2-1.4-2.8 0-4.6Z" />
      <path d="M11 14.5h26" />
      <path d="M11.6 14.5c1.6 3.7 6.6 5.6 12.4 5.6s10.8-1.9 12.4-5.6" />
      <path d="M24 20.1v4.6" />
      <ellipse cx="24" cy="26.3" rx="3.2" ry="1.6" />
      <path d="M24 27.9v4.6" />
      <ellipse cx="24" cy="33.9" rx="2.3" ry="1.2" />
      <path d="M24 35.1v2.6" />
      <path d="M15.5 43.5c1.2-3.5 4.6-5.8 8.5-5.8s7.3 2.3 8.5 5.8Z" />
      <path d="M13 43.5h22" />
    </svg>
  );
}

/** Crescent moon over a flower garland for the evening reception */
export function MoonGarlandIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" strokeWidth="1.2" className={className} {...line}>
      <path d="M31.2 5.5a9.5 9.5 0 1 0 8.4 13.9 7.6 7.6 0 1 1-8.4-13.9Z" />
      <path d="M14 7.5v5M11.5 10h5" />
      <path d="M19.5 3.5v2.6M18.2 4.8h2.6" />
      <path d="M5 26.5c5.5 7 12.6 10.6 19 10.6s13.5-3.6 19-10.6" />
      <circle cx="9.6" cy="31.2" r="1.6" />
      <circle cx="16.3" cy="35.2" r="1.6" />
      <circle cx="24" cy="37.1" r="1.6" />
      <circle cx="31.7" cy="35.2" r="1.6" />
      <circle cx="38.4" cy="31.2" r="1.6" />
      <path d="M24 38.7v2.4" />
      <path d="M24 41.1c1.1 1 1.1 2.3 0 3.3-1.1-1-1.1-2.3 0-3.3Z" />
    </svg>
  );
}

export function PinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.3" className={className} {...line}>
      <path d="M8 14.5s4.5-4.2 4.5-7.8A4.5 4.5 0 0 0 3.5 6.7c0 3.6 4.5 7.8 4.5 7.8Z" />
      <circle cx="8" cy="6.7" r="1.6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.3" className={className} {...line}>
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

export function ArrowIcon({ className = "", direction = "right" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.3" className={`${direction === "left" ? "rotate-180" : ""} ${className}`} {...line}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function CloseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.3" className={className} {...line}>
      <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

export function PlusIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.4" className={className} {...line}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function MinusIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth="1.4" className={className} {...line}>
      <path d="M3 8h10" />
    </svg>
  );
}

export function HeartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M8 13.6S1.8 10 1.8 5.9A3.1 3.1 0 0 1 8 4.4a3.1 3.1 0 0 1 6.2 1.5C14.2 10 8 13.6 8 13.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
