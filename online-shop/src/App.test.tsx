import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

describe("App", () => {
  test("Should render app component", () => {
    // given
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const navbarLogoText = screen.getByText(/Candleaf/i);
    const aboutText = screen.getByText(/About/i);
    const discoverText = screen.getByText(/Discover/i);

    // then
    expect(navbarLogoText).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(discoverText).toBeInTheDocument();
  });
});
