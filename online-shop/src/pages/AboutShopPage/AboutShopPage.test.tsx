import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AboutShopPage from "./AboutShopPage";

describe("Test About Shop Page component", () => {
  test("Renders about shop page", () => {
    render(
      <Router>
        <AboutShopPage />
      </Router>
    );
    const titleText = screen.getByText(/The nature candle/i);
    const button = screen.getByRole("button");
    expect(titleText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    // screen.debug();
  });
});
