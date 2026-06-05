import * as React from "react";

/**
 * Pulsante istituzionale. Usalo per le azioni d'avvio (Relatore / Vetrina) e le CTA.
 * @startingPoint section="Core" subtitle="Pulsante: primary, dark, ghost" viewport="700x150"
 */
export interface ButtonProps {
  /** Stile del pulsante. primary = rosso pieno; dark = nero; ghost = contorno. */
  variant?: "primary" | "dark" | "ghost";
  /** Dimensione. */
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Pulsante istituzionale per azioni d'avvio e CTA.
 */
export function Button(props: ButtonProps): JSX.Element;
