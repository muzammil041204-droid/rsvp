// Set VITE_RSVP_ENDPOINT (Formspree, a Google Apps Script web app, your own API…)
// to receive replies as JSON. Without it the site runs in demo mode and keeps
// replies in this browser so the flow can be tried end to end.
const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT;
const STORAGE_KEY = "wedding-rsvp-replies";

export async function submitRsvp(reply) {
  const payload = { ...reply, submittedAt: new Date().toISOString() };

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`RSVP request failed with ${res.status}`);
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 900));
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...saved]));
  } catch {
    // Storage can be unavailable (private mode); the demo reply still succeeds.
  }
}
