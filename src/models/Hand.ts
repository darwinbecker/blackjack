import type { Card } from "./Card";

export interface Hand {
  cards: Card[];
  isRevealed: boolean;
}
