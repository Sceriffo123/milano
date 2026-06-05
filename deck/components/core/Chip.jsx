import React from "react";

/**
 * Chip — etichetta rossa a tutta tinta (data/luogo, fase, categoria).
 * Maiuscolo, tracciatura ampia. Variante "outline" per scene scure.
 */
export function Chip({ variant = "solid", children, style, ...rest }) {
  const variants = {
    solid: { background: "var(--rosso)", color: "#fff", border: "1px solid var(--rosso)" },
    outline: { background: "transparent", color: "var(--rosso)", border: "1px solid var(--rosso)" },
  };
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        fontSize: "var(--fs-chip)",
        padding: ".5em 1em",
        borderRadius: "var(--radius-chip)",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
