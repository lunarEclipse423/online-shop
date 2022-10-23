import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { loginUser } from "../../../store/actions/login";
import Navbar from "./Navbar";
import store from "../../../store";

describe("Navbar", () => {
  test("Should logout", () => {
    // given
    store.dispatch(loginUser());
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: "/catalog" }]}>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
    const buttonLogout = screen.getByTestId("button-logout");
    expect(buttonLogout).not.toHaveClass("tools__item hidden");

    // when
    fireEvent.click(buttonLogout);

    // then
    expect(buttonLogout).toHaveClass("tools__item hidden");
  });
});
