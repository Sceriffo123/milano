import React from "react";

/**
 * Button — pulsante istituzionale URITAXI · FILT CGIL.
 * Varianti: primary (rosso pieno), ghost (contorno chiaro su scuro),
 * dark (nero pieno). Angoli minimi, peso 700, nessun gradiente.
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: ".6em 1.1em", fontSize: "14px" },
    md: { padding: ".8em 1.5em", fontSize: "16px" },
    lg: { padding: ".95em 1.7em", fontSize: "19px" },
  };

  const variants = {
    primary: { background: "var(--rosso)", color: "#fff", border: "2px solid var(--rosso)" },
    dark: { background: "var(--nero)", color: "var(--panna)", border: "2px solid var(--nero)" },
    ghost: { background: "transparent", color: "currentColor", border: "2px solid currentColor" },
  };

  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    letterSpacing: ".02em",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: "var(--radius-card)",
    opacity: disabled ? 0.45 : 1,
    transition: "filter .15s ease, transform .05s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: ".55em",
    lineHeight: 1,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={base}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(.92)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
