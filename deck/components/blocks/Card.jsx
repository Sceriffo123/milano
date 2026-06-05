import React from "react";

/**
 * Card — scheda con barra verticale rossa a sinistra (motivo cardine).
 * tone "light" su scene chiare, "dark" (#232323) su scene scure.
 * "strong" usa il bordo rosso scuro per l'accento finale.
 */
export function Card({ tone = "light", strong = false, children, style, ...rest }) {
  const tones = {
    light: { background: "var(--bianco)", color: "var(--nero)" },
    dark: { background: "var(--carta-scura)", color: "var(--panna)" },
  };
  return (
    <div
      style={{
        borderLeft: `var(--bar-width) solid ${strong ? "var(--rosso-scuro)" : "var(--rosso)"}`,
        padding: "1.1em 1.3em",
        boxShadow: "var(--shadow-card)",
        borderRadius: "var(--radius-card)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-body)",
        lineHeight: "var(--leading-body)",
        maxWidth: "60ch",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
