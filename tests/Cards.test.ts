import { describe, expect, it } from "@jest/globals";
import {
  determineBestHandValue,
  determineHandValue,
  isBust,
  max,
  min,
  parseCardValue,
  sum,
} from "../src/lib/HandValue";

const two = parseCardValue("2");
const three = parseCardValue("3");
const four = parseCardValue("4");
const five = parseCardValue("5");
const six = parseCardValue("6");
const seven = parseCardValue("7");
const eight = parseCardValue("8");
const nine = parseCardValue("9");
const ten = parseCardValue("10");
const jack = parseCardValue("J");
const queen = parseCardValue("Q");
const king = parseCardValue("K");
const ace = parseCardValue("A");

describe("Parse card values", () => {
  it("Ace has value 11", () => {
    expect(ace).toBe(11);
  });
  it("King has value 10", () => {
    expect(king).toBe(10);
  });
  it("Queen has value 10", () => {
    expect(queen).toBe(10);
  });
  it("Jack has value 10", () => {
    expect(jack).toBe(10);
  });
  it("10 has value 10", () => {
    expect(ten).toBe(10);
  });
  it("9 has value 9", () => {
    expect(nine).toBe(9);
  });
});

describe("Sum card values", () => {
  it("sum of Ace & Jack is 21", () => {
    const sumOfAceAndJack = sum([ace, jack]);
    expect(sumOfAceAndJack).toBe(21);
  });

  it("sum of Ace & 9 is 20", () => {
    const sumOfAceAndNine = sum([ace, nine]);
    expect(sumOfAceAndNine).toBe(20);
  });

  it("sum of Queen & 6 is 16", () => {
    const sumOfQueenAndSix = sum([queen, six]);
    expect(sumOfQueenAndSix).toBe(16);
  });
});

describe("determine hand value", () => {
  it("determine optimistic & pessimistic hand value with hand = Ace & Jack", () => {
    const optimisticF = determineHandValue(max);
    const pessimisticF = determineHandValue(min);
    const hand = ["A", "J"];

    const optimisticHandValue = optimisticF(hand.map(parseCardValue));
    expect(optimisticHandValue).toBe(21);
    const pessimisticHandValue = pessimisticF(hand.map(parseCardValue));
    expect(pessimisticHandValue).toBe(11);
  });

  it("determine best hand value with hand [Ace, Jack] = 21", () => {
    const hand = [ace, jack];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(21);
  });

  it("determine best hand value with hand [Ace, Ace] = 12", () => {
    const hand = [ace, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(12);
  });

  it("determine best hand value with hand [2, 4, 2, Ace] = 19", () => {
    const hand = [two, four, two, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(19);
  });

  it("determine best hand value with hand [5, Queen, Ace] = 16", () => {
    const hand = [five, queen, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(16);
  });

  it("determine best hand value with hand [5, 8, 3, Ace] = 17", () => {
    const hand = [five, eight, three, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(17);
  });

  it("determine best hand value with hand [Jack, 6, 10] = 26", () => {
    const hand = [jack, six, ten];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(26);
  });

  it("determine best hand value with hand [7, 9, Ace, Ace] = 18", () => {
    const hand = [seven, nine, ace, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(18);
  });

  it("determine best hand value with hand [Ace, Ace, Ace, Ace, Ace, Ace, Ace]  = 17", () => {
    const hand = [ace, ace, ace, ace, ace, ace, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(bestHandValue).toBe(17);
  });
});

describe("check if hand is bust", () => {
  it("hand [Jack, 6, 10] is bust", () => {
    const hand = [jack, six, ten];
    const bestHandValue = determineBestHandValue(hand);
    expect(isBust(bestHandValue)).toBe(true);
  });

  it("hand [7, 9, Ace, Ace] is not bust", () => {
    const hand = [seven, nine, ace, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(isBust(bestHandValue)).toBe(false);
  });

  it("hand [Ace, Ace, Ace, Ace, Ace, Ace, Ace] is not bust", () => {
    const hand = [ace, ace, ace, ace, ace, ace, ace];
    const bestHandValue = determineBestHandValue(hand);
    expect(isBust(bestHandValue)).toBe(false);
  });
});
