import React from "react";

/**
 * Kicker — occhiello rosso maiuscolo, spaziato. Precede i titoli di scena.
 */
export function Kicker({ children, style, ...rest }) {
  return (
    <div
      style={{
        color: "var(--rosso)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        fontSize: "var(--fs-kicker)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
