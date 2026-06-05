import React from "react";

/**
 * Band — banda rossa piena per affermazioni-chiave e sintesi.
 */
export function Band({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: "var(--rosso)",
        color: "#fff",
        padding: ".8em 1.2em",
        borderRadius: "var(--radius-card)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "var(--fs-body)",
        lineHeight: "var(--leading-body)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
