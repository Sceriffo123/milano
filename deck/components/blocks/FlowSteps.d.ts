import * as React from "react";

export interface FlowStep {
  /** Numero del passo (default: indice + 1). */
  n?: React.ReactNode;
  /** Titolo del passo, in maiuscolo. */
  title: React.ReactNode;
  /** Nota breve sotto il titolo. */
  note?: React.ReactNode;
}

/**
 * "La macchina": sequenza di passi protocollati; l'ultimo è pieno di rosso (esito).
 * @startingPoint section="Blocks" subtitle="Sequenza di processo" viewport="900x220"
 */
export interface FlowStepsProps {
  steps: FlowStep[];
  style?: React.CSSProperties;
}

/** "La macchina": sequenza di passi protocollati; l'ultimo è pieno di rosso (esito). */
export function FlowSteps(props: FlowStepsProps): JSX.Element;
