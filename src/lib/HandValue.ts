export const max = (arr: number[]): number =>
  arr.reduce((a, b) => Math.max(a, b));
export const min = (arr: number[]): number =>
  arr.reduce((a, b) => Math.min(a, b));
export const sum = (arr: number[]): number => arr.reduce((a, b) => a + b);

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

export const determineCardValues = (cardValue: number): number[] => {
  if (cardValue === 11) {
    return [1, 11];
  } else {
    return [cardValue];
  }
};

export const determineHandValue =
  (strategy: (arr: number[]) => number): Function =>
  (hand: number[]): number =>
    sum(hand.map(determineCardValues).map(strategy));

export const isBust = (handValue: number): boolean => handValue > 21;

export const optimisticF = determineHandValue(max);
export const pessimisticF = determineHandValue(min);

export const determineBestHandValue = (hand: number[]): number => {
  // Aces won't ever be counted as 11 more than once
  // => assign all to 1 apart from first ace
  const replacedHand = hand.map((h) => (h === 11 ? 1 : h));
  const firstAceIdx = replacedHand.indexOf(1);
  const replacedHandUpdated =
    firstAceIdx !== -1
      ? replacedHand.map((h, i) => (i === firstAceIdx ? 11 : h))
      : replacedHand;
  const optimisticValue = optimisticF(replacedHandUpdated);

  return isBust(optimisticValue)
    ? pessimisticF(replacedHandUpdated)
    : optimisticValue;
};
