import * as React from "react";

/**
 * Contatore gigante rosso con etichetta — il dato verificabile come immagine.
 * @startingPoint section="Blocks" subtitle="Statistica con contatore" viewport="700x220"
 */
export interface StatProps {
  /** Valore mostrato. Numero o stringa (es. "200"). */
  value: number | string;
  /** Etichetta sotto la cifra. */
  label?: React.ReactNode;
  /** Suffisso (es. "+"). */
  suffix?: string;
  /** Anima da 0 al valore (solo valori numerici). */
  animate?: boolean;
  style?: React.CSSProperties;
}

/** Contatore gigante rosso con etichetta — il dato verificabile come immagine. */
export function Stat(props: StatProps): JSX.Element;
