import { calculateTotal } from "./calculateTotal";

describe("Value validation", () => {
  test("Simple multiplication (5 times 2)", () => {
    expect(calculateTotal(5, 2)).toEqual(10);
  });
  test("Zero multiplication (5 times 0)", () => {
    expect(calculateTotal(5, 0)).toEqual(0);
  });
  test("Non-integer multiplication with rounding (5 times 3.99)", () => {
    expect(calculateTotal(5, 3.99)).toEqual(19.95);
  });
});
