import { describe, expect, test, it } from "@jest/globals";
import { parseCardValue } from "../src/config/Config";

describe("Parse card values", () => {
  it("Ace has value 11", () => {
    const ace = parseCardValue("A");
    expect(ace).toBe(11);
  });
  it("King has value 10", () => {
    const king = parseCardValue("K");
    expect(king).toBe(10);
  });
  it("Queen has value 10", () => {
    const queen = parseCardValue("Q");
    expect(queen).toBe(10);
  });
  it("Jack has value 10", () => {
    const ten = parseCardValue("10");
    expect(ten).toBe(10);
  });
});
