import { useState } from "react";
import { usePageMotion } from "./hooks/usePageMotion";
import { RevealContext } from "./lib/intro";
import { Intro } from "./components/Intro";
import { Hero } from "./sections/Hero";
import { Countdown } from "./sections/Countdown";
import { CoupleMessage } from "./sections/CoupleMessage";
import { Families } from "./sections/Families";
import { Events } from "./sections/Events";
import { Gallery } from "./sections/Gallery";
import { Nearby } from "./sections/Nearby";
import { Rsvp } from "./sections/Rsvp";
import { ThankYou } from "./sections/ThankYou";
import { Footer } from "./sections/Footer";

export default function App() {
  // sealed → revealing (card dissolving, hero animating in) → done (intro removed)
  const [intro, setIntro] = useState("sealed");
  usePageMotion();

  return (
    <RevealContext value={intro !== "sealed"}>
      <div id="smooth-wrapper" inert={intro === "sealed"}>
        <div id="smooth-content">
          <main>
            <Hero />
            <Countdown />
            <CoupleMessage />
            <Families />
            <Events />
            <Gallery />
            <Nearby />
            <Rsvp />
            <ThankYou />
          </main>
          <Footer />
        </div>
      </div>

      {intro !== "done" && <Intro onReveal={() => setIntro("revealing")} onDone={() => setIntro("done")} />}
    </RevealContext>
  );
}
