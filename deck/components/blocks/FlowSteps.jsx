import React from "react";

/**
 * FlowSteps — "la macchina": sequenza di blocchi con barra rossa superiore.
 * L'ultimo blocco è pieno di rosso (esito). steps: [{ n, title, note }].
 */
export function FlowSteps({ steps = [], style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".5em",
        alignItems: "stretch",
        flexWrap: "wrap",
        width: "100%",
        fontFamily: "var(--font-body)",
        ...style,
      }}
      {...rest}
    >
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              minWidth: 120,
              background: last ? "var(--rosso)" : "var(--bianco)",
              color: last ? "#fff" : "var(--nero)",
              borderTop: `var(--bar-top-width) solid ${last ? "var(--rosso-scuro)" : "var(--rosso)"}`,
              padding: "1em .8em",
              boxShadow: "var(--shadow-card)",
              borderRadius: "var(--radius-card)",
            }}
          >
            <b style={{ display: "block", fontFamily: "var(--font-heavy)", fontSize: "1.6em", color: last ? "#fff" : "var(--rosso)" }}>
              {s.n != null ? s.n : i + 1}
            </b>
            <div style={{ fontWeight: 700, letterSpacing: ".04em", marginTop: ".25em" }}>{s.title}</div>
            {s.note && <small style={{ opacity: .85 }}>{s.note}</small>}
          </div>
        );
      })}
    </div>
  );
}
