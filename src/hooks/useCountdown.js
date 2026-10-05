import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime();
  const [now, setNow] = useState(() => Date.now());
  const remaining = Math.max(0, target - now);
  const done = remaining === 0;

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setNow(Date.now()), SECOND);
    return () => clearInterval(id);
  }, [done]);

  return {
    done,
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
  };
}
