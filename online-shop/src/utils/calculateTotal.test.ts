import { calculateTotal } from "./calculateTotal";

describe("Calculate total function", () => {
  test("Should calculate simple multiplication", () => {
    expect(calculateTotal(5, 2)).toEqual(10);
  });

  test("Should calculate zero multiplication", () => {
    expect(calculateTotal(5, 0)).toEqual(0);
  });
  
  test("Should calculate non-integer multiplication with rounding", () => {
    expect(calculateTotal(5, 3.99)).toEqual(19.95);
  });
});
