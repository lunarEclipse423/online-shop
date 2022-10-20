import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("Test Catalog Page component", () => {
  test("Renders catalog page", () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    const titleText = screen.getByText(/Whoops!/i);
    const errorText = screen.getByText(/We can't seem the page you are looking for/i);

    const returnButton = screen.getByRole("button", { name: /Return Home/i });

    expect(titleText).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
    // screen.debug();
  });
});
