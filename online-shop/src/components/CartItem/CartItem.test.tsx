import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import CartItem from "./CartItem";
import store from "../../store";

describe("Cart Item", () => {
  test("Should render cart item", () => {
    // given
    renderCartItem(8);
    const id = screen.getByText(/P\/N: 1/i);
    const title = screen.getByText(/Lamp/i);
    const price = screen.getByText(/£3.99/i);
    const totalPrice = screen.getByText(/11.97/i);

    // then
    expect(id).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
  });

  describe("Should change quantity by click", () => {
    test("Decrement", () => {
      // given
      renderCartItem(8);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("8");

      // when
      fireEvent.click(buttonMinus);

      // then
      expect(quantity.textContent).toEqual("7");
    });

    test("Dont decrement if current quantity equals to 1", () => {
      // given
      renderCartItem(1);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("1");

      // when
      fireEvent.click(buttonMinus);

      // then
      expect(quantity.textContent).toEqual("1");
    });

    test("Increment", () => {
      // given
      renderCartItem(8);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("8");

      // when
      fireEvent.click(buttonPlus);

      // then
      expect(quantity.textContent).toEqual("9");
    });

    test("Dont increment if current quantity equals to available in stock", () => {
      // given
      renderCartItem(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("10");

      // when
      fireEvent.click(buttonPlus);

      // then
      expect(quantity.textContent).toEqual("10");
    });
  });
});

const renderCartItem = (testQuantity: number) => {
  const testCartItem = {
    id: 1,
    title: "Lamp",
    price: 3.99,
    quantity: testQuantity,
    totalPrice: 11.97,
    cartImage: "img1",
    quantityInStock: 10,
  };
  render(
    <Provider store={store}>
      <CartItem {...testCartItem} />
    </Provider>
  );
};
