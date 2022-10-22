import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("Catalog page", () => {
  test("Should render catalog page", () => {
    // given 
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    const titleText = screen.getByText(/Whoops!/i);
    const errorText = screen.getByText(/We can't seem the page you are looking for/i);
    const returnButton = screen.getByRole("button", { name: /Return Home/i });

    // then
    expect(titleText).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
  });
});
