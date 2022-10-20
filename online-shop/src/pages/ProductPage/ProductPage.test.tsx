import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ProductPage from "./ProductPage";
import store from "../../store";

describe("Test Product Page component", () => {
  test("Renders specific product page", () => {
    const testProduct = {
      id: 987278001,
      image: "item_1.jpg",
      title: "Large cork-lid scented candle",
      description:
        "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
      weight: "1,4 kg",
      composition:
        "Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%",
      quantity: 10,
      price: 12.99,
      largeImage: "item_1_large.jpg",
      cartImage: "item_1_cart.jpg",
    };
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: `/catalog/${testProduct.id}`, state: { product: testProduct } },
          ]}
        >
          <ProductPage />
        </MemoryRouter>
      </Provider>
    );
    const allProductsText = screen.getByText(
      /All hand-made with natural soy wax, Candleaf is made for your pleasure moments./i
    );
    const shippingText = screen.getByText(/🚚 FREE SHIPPING/i);
    const toBuyText = screen.getByText(/Sign in to buy/i);

    expect(allProductsText).toBeInTheDocument();
    expect(shippingText).toBeInTheDocument();
    expect(toBuyText).toBeInTheDocument();
  });
});
