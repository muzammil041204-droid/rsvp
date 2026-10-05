import { createContext, useContext } from "react";

/**
 * True once the guest has opened the invitation intro and the site is being
 * revealed. Sections hold their entrance animations until then.
 */
export const RevealContext = createContext(true);

export const useSiteRevealed = () => useContext(RevealContext);
