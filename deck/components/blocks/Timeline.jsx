import React from "react";

/**
 * Timeline — cronologia verticale con linea rossa e nodi.
 * items: [{ year, children }]. La data (year) è evidenziata in rosso.
 */
export function Timeline({ items = [], style, ...rest }) {
  return (
    <ul
      style={{
        listStyle: "none",
        position: "relative",
        paddingLeft: "1.6em",
        margin: 0,
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-body)",
        lineHeight: "var(--leading-body)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: "absolute",
          left: ".45em",
          top: ".4em",
          bottom: ".4em",
          width: "3px",
          background: "var(--rosso)",
        }}
      />
      {items.map((it, i) => (
        <li key={i} style={{ position: "relative", margin: ".9em 0" }}>
          <span
            style={{
              position: "absolute",
              left: "-1.32em",
              top: ".35em",
              width: ".7em",
              height: ".7em",
              borderRadius: "50%",
              background: "var(--rosso)",
            }}
          />
          {it.year != null && (
            <b style={{ color: "var(--rosso)" }}>{it.year}</b>
          )}
          {it.year != null ? " — " : null}
          {it.children}
        </li>
      ))}
    </ul>
  );
}
