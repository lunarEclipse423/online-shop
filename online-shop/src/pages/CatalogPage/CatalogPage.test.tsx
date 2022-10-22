import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import CatalogPage from "./CatalogPage";
import store from "../../store";

describe("Catalog page", () => {
  test("Should render catalog page", () => {
    // given
    render(
      <Provider store={store}>
        <Router>
          <CatalogPage />
        </Router>
      </Provider>
    );

    const titleText = screen.getByText(/Products/i);
    const orderText = screen.getByText(/Order it for you or for your beloved ones/i);

    // then
    expect(titleText).toBeInTheDocument();
    expect(orderText).toBeInTheDocument();
  });
});
