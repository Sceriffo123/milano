import * as React from "react";

export interface ChipProps {
  /** solid = rosso pieno (default); outline = contorno rosso su scena scura. */
  variant?: "solid" | "outline";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Etichetta rossa maiuscola: data/luogo, fase, categoria. */
export function Chip(props: ChipProps): JSX.Element;
