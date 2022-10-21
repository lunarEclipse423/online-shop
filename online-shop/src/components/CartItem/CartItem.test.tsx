import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import CartItem from "./CartItem";
import store from "../../store";

describe("Test Cart Item component", () => {
  const setup = (testQuantity: number) => {
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

  test("Should render cart item", () => {
    setup(8);
    const id = screen.getByText(/P\/N: 1/i);
    const title = screen.getByText(/Lamp/i);
    const price = screen.getByText(/£3.99/i);
    const totalPrice = screen.getByText(/11.97/i);

    expect(id).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
  });

  describe("Test quantity changes by click", () => {
    test("Decrement", () => {
      setup(8);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("8");
      fireEvent.click(buttonMinus);
      expect(quantity.textContent).toEqual("7");
    });

    test("Decrement if current quantity equals to 1", () => {
      setup(1);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonMinus);
      expect(quantity.textContent).toEqual("1");
    });

    test("Increment", () => {
      setup(8);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("8");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("9");
    });

    test("Increment if current quantity equals to available in stock", () => {
      setup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("10");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("10");
    });
  });

  //   test("Remove cart item after click", () => {
  //     setup(8);
  //     const id = screen.getByText(/P\/N: 1/i);
  //     const title = screen.getByText(/Lamp/i);
  //     const price = screen.getByText(/£3.99/i);
  //     const totalPrice = screen.getByText(/11.97/i);
  //     const buttonRemove = screen.getByRole("button", { name: /Remove/i });

  //     expect(id).toBeInTheDocument();
  //     expect(title).toBeInTheDocument();
  //     expect(price).toBeInTheDocument();
  //     expect(totalPrice).toBeInTheDocument();
  //     fireEvent.click(buttonRemove);
  //     expect(screen.getByText(/P\/N: 1/i)).not.toBeInTheDocument();
  //     expect(title).not.toBeInTheDocument();
  //     expect(price).not.toBeInTheDocument();
  //     expect(totalPrice).not.toBeInTheDocument();
  //   });
});
