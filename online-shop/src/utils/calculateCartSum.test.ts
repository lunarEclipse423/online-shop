import { calculateCartSum } from "./calculateCartSum";

describe("Calculate cart sum function", () => {
  test("Should calculate cart sum (integer values)", () => {
    // given
    const cart = [
      {
        id: 1,
        title: "Lamp",
        price: 30,
        quantity: 1,
        totalPrice: 30,
        cartImage: "img1",
        quantityInStock: 10,
      },
      {
        id: 2,
        title: "Socks",
        price: 12,
        quantity: 1,
        totalPrice: 12,
        cartImage: "img2",
        quantityInStock: 10,
      },
      {
        id: 3,
        title: "Toy",
        price: 10,
        quantity: 1,
        totalPrice: 10,
        cartImage: "img3",
        quantityInStock: 10,
      },
    ];

    // then
    expect(calculateCartSum(cart)).toEqual(52);
  });

  test("Should calculate sum of empty cart", () => {
    expect(calculateCartSum([])).toEqual(0);
  });

  test("Should calculate cart sum (non-integer values)", () => {
    // given
    const cart = [
      {
        id: 1,
        title: "Lamp",
        price: 3.99,
        quantity: 3,
        totalPrice: 11.97,
        cartImage: "img1",
        quantityInStock: 10,
      },
      {
        id: 2,
        title: "Socks",
        price: 4.99,
        quantity: 2,
        totalPrice: 9.98,
        cartImage: "img2",
        quantityInStock: 10,
      },
    ];

    // then
    expect(calculateCartSum(cart)).toEqual(21.95);
  });
});
