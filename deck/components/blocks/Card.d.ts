import * as React from "react";

/**
 * Scheda con barra verticale rossa a sinistra — il contenitore-base del sistema.
 * @startingPoint section="Blocks" subtitle="Card con barra rossa" viewport="700x220"
 */
export interface CardProps {
  /** Sfondo: light (bianco) o dark (#232323). */
  tone?: "light" | "dark";
  /** Barra rosso scuro invece del rosso pieno (accento conclusivo). */
  strong?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Scheda con barra verticale rossa a sinistra — il contenitore-base del sistema. */
export function Card(props: CardProps): JSX.Element;
