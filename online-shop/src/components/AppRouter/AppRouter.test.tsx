import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "../../store";

describe("App Router", () => {
  test("Should render about shop page", () => {
    // given
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRouter />
      </MemoryRouter>
    );
    const titleText = screen.getByText(/The nature candle/i);

    // then
    expect(titleText).toBeInTheDocument();
  });

  test("Should render catalog page", () => {
    // given
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const titleText = screen.getByText(/Products/i);

    // then
    expect(titleText).toBeInTheDocument();
  });

  test("Should render cart page", () => {
    // given
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const titleText = screen.getByText(/Your cart items/i);

    // then
    expect(titleText).toBeInTheDocument();
  });

  test("Should render error page", () => {
    // given
    render(
      <MemoryRouter initialEntries={["/cart1234"]}>
        <AppRouter />
      </MemoryRouter>
    );
    const titleText = screen.getByText(/Whoops!/i);

    // then
    expect(titleText).toBeInTheDocument();
  });
});
