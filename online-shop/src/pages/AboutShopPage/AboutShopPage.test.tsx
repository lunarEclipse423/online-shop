import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AboutShopPage from "./AboutShopPage";

describe("About Shop page", () => {
  test("Should render about shop page", () => {
    // given
    render(
      <Router>
        <AboutShopPage />
      </Router>
    );
    const titleText = screen.getByText(/The nature candle/i);
    const button = screen.getByRole("button");

    // then
    expect(titleText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
