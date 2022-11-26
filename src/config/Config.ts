export const REVEAL_CARD_DELAY_MS = 1000;
export const REVEAL_HAND_VALUE_DELAY_MS = 750;

export function sum(a: number, b: number): number {
  return a + b;
}



export const parseCardValue = (cardValue: string): number => {
  if (cardValue === "A") {
    return 11;
  } else if (cardValue === "J" || cardValue === "Q" || cardValue === "K") {
    return 10;
  } else if (cardValue === "00") {
    return 0;
  } else {
    return parseInt(cardValue);
  }
};