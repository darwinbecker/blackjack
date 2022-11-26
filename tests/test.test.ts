import { sum } from "../src/config/Config";

describe("test", () => {
  it("1+2", () => {
    const three = 1 + 2;
    expect(three).toBe(3);
  });

  it("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
