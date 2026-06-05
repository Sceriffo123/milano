import * as React from "react";

export interface TimelineItem {
  /** Anno o data, evidenziato in rosso. */
  year?: React.ReactNode;
  /** Testo della voce. */
  children?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  style?: React.CSSProperties;
}

/** Cronologia verticale con linea rossa e nodi: la continuità del metodo. */
export function Timeline(props: TimelineProps): JSX.Element;
