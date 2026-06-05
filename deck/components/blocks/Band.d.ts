import * as React from "react";

export interface BandProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Banda rossa piena per l'affermazione-chiave o la sintesi di una scena. */
export function Band(props: BandProps): JSX.Element;
