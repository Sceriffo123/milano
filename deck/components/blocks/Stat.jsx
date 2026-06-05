import React from "react";

/**
 * Stat — contatore gigante rosso con etichetta. Il dato come immagine.
 * Se "animate", anima da 0 al valore numerico (cubica in uscita).
 */
export function Stat({ value, label, suffix = "", animate = false, style, ...rest }) {
  const numeric = typeof value === "number" ? value : parseInt(String(value).replace(/\D/g, ""), 10);
  const isNumeric = !Number.isNaN(numeric) && /^\d/.test(String(value));
  const [shown, setShown] = React.useState(animate && isNumeric ? 0 : value);

  React.useEffect(() => {
    if (!animate || !isNumeric) return;
    let raf;
    const dur = 1100, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setShown(Math.round(numeric * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, isNumeric, numeric]);

  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div
        style={{
          fontFamily: "var(--font-heavy)",
          fontWeight: 900,
          color: "var(--rosso)",
          fontSize: "var(--fs-counter)",
          lineHeight: 0.9,
          letterSpacing: "var(--track-heavy)",
        }}
      >
        {shown}{suffix}
      </div>
      <div style={{ fontSize: "var(--fs-body)", color: "var(--grigio)", maxWidth: "18ch", marginTop: ".35em" }}>
        {label}
      </div>
    </div>
  );
}
