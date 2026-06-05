import * as React from "react";

export interface KickerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Occhiello rosso maiuscolo che precede i titoli di scena. */
export function Kicker(props: KickerProps): JSX.Element;
