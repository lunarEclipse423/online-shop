import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import CatalogItem from "./CatalogItem";
import store from "../../store";

describe("Catalog Item", () => {
  test("Should render catalog item", () => {
    // given
    renderCatalogItem();
    const title = screen.getByText(/Lamp/i);
    const price = screen.getByText(/3.99£/i);

    // then
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});

const renderCatalogItem = () => {
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
