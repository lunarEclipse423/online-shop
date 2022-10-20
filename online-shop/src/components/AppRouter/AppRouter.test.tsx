import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "../../store";

describe("Test App Router component", () => {
  test("Should render about shop page", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRouter />
      </MemoryRouter>
    );
    const titleText = screen.getByText(/The nature candle/i);
    expect(titleText).toBeInTheDocument();
  });

  test("Should render catalog page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const titleText = screen.getByText(/Products/i);
    expect(titleText).toBeInTheDocument();
  });

  test("Should render cart page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const titleText = screen.getByText(/Your cart items/i);
    expect(titleText).toBeInTheDocument();
  });

  test("Should render error page", () => {
    render(
      <MemoryRouter initialEntries={["/cart1234"]}>
        <AppRouter />
      </MemoryRouter>
    );
    const titleText = screen.getByText(/Whoops!/i);
    expect(titleText).toBeInTheDocument();
  });
});
