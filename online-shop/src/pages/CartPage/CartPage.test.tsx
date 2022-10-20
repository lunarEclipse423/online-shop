import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import CartPage from "./CartPage";
import store from "../../store";

describe("Test Cart Page component", () => {
  test("Renders cart page", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartPage />
        </Router>
      </Provider>
    );
    
    const titleText = screen.getByText(/Your cart items/i);
    const productSubtitle = screen.getByText(/Product/i);
    const priceSubtitle = screen.getByText(/Price/i);
    const quantitySubtitle = screen.getByText(/Quantity/i);
    const totalSubtitle = screen.getByText(/^Total$/i);
    const subtotalSubtitle = screen.getByText(/^Sub-total$/i);

    const buttonClear = screen.getByRole("button", {
      name: /Clear cart/i,
    });
    const buttonCheckout = screen.getByRole("button", {
      name: /Checkout/i,
    });

    expect(titleText).toBeInTheDocument();
    expect(productSubtitle).toBeInTheDocument();
    expect(priceSubtitle).toBeInTheDocument();
    expect(quantitySubtitle).toBeInTheDocument();
    expect(totalSubtitle).toBeInTheDocument();
    expect(subtotalSubtitle).toBeInTheDocument();

    expect(buttonClear).toBeInTheDocument();
    expect(buttonCheckout).toBeInTheDocument();
    // screen.debug();
  });
});
