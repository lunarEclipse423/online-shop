import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import CatalogItem from "./CatalogItem";
import store from "../../store";

describe("Test Catalog Item component", () => {
  const setup = () => {
    const testCatalogItem = {
      id: 1,
      image: "img1",
      title: "Lamp",
      price: 3.99,
      quantity: 10,
      description: "Description",
      weight: "1,3 kg",
      composition: "Was 80%",
      largeImage: "largeImg1",
      cartImage: "cartImg1",
    };
    render(
      <Provider store={store}>
        <Router>
          <CatalogItem {...testCatalogItem} />
        </Router>
      </Provider>
    );
  };

  test("Should render catalog item", () => {
    setup();
    const title = screen.getByText(/Lamp/i);
    const price = screen.getByText(/3.99£/i);
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

//   test("Shoud navigate to product page after click", () => {
//     setup();
//     const catalogItem = screen.getByTestId("catalog-item-elem");
//     fireEvent.click(catalogItem);
//     const allProductsText = screen.getByText(
//       /All hand-made with natural soy wax, Candleaf is made for your pleasure moments./i
//     );
//     const shippingText = screen.getByText(/🚚 FREE SHIPPING/i);
//     const toBuyText = screen.getByText(/Sign in to buy/i);
//     expect(allProductsText).toBeInTheDocument();
//     expect(shippingText).toBeInTheDocument();
//     expect(toBuyText).toBeInTheDocument();
//   });
});
