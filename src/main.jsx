import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource-variable/manrope";
import "./styles.css";

import App from "./App.jsx";

// The invitation intro always opens onto the top of the page
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
