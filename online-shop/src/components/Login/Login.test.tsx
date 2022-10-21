import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { loginUser } from "../../store/actions/login";
import App from "../../App";
import Login from "./Login";
import Modal from "../UI/modal/Modal";
import store from "../../store";

describe("Test Login component", () => {
  const setup = () => {
    render(
      <Provider store={store}>
        <Router>
          <Modal>
            <Login />
          </Modal>
        </Router>
      </Provider>
    );
    // screen.debug();
  };

  test("Renders login component", () => {
    setup();

    const titleText = screen.getByText(/Sign In/i);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonCancel = screen.getByRole("button", {
      name: /Cancel/i,
    });
    const buttonLogin = screen.getByRole("button", {
      name: /Login/i,
    });

    expect(titleText).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  describe("Input handler handles user typing", () => {
    test("Input handler handles username input", () => {
      setup();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");
      fireEvent.change(usernameInput, { target: { value: "arthur" } });
      expect(usernameInput.value).toBe("arthur");
    });

    test("Input handler handles password input", () => {
      setup();
      const passwordInput: HTMLInputElement = screen.getByPlaceholderText("Password");
      fireEvent.change(passwordInput, { target: { value: "1234" } });
      expect(passwordInput.value).toBe("1234");
    });
  });

  describe("Fails with error on empty fields", () => {
    test("Error on empty password input", () => {
      setup();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });
      fireEvent.change(usernameInput, { target: { value: "arthur" } });
      fireEvent.click(buttonLogin);
      const error = screen.getByText("Field is empty. Please, fill in");
      expect(error).toBeInTheDocument();
    });

    test("Error on empty username input", () => {
      setup();
      const passwordInput: HTMLInputElement = screen.getByPlaceholderText("Password");
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });
      fireEvent.change(passwordInput, { target: { value: "1234" } });
      fireEvent.click(buttonLogin);
      const error = screen.getByText("Field is empty. Please, fill in");
      expect(error).toBeInTheDocument();
    });

    test("Error on empty username and passwords inputs", () => {
      setup();
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });
      fireEvent.click(buttonLogin);
      const error = screen.getAllByText("Field is empty. Please, fill in");
      expect(error.length).toBe(2);
    });
  });

  describe("Cancel button works", () => {
    test("Cancel button clears inputs", () => {
      setup();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");
      const buttonCancel = screen.getByRole("button", {
        name: /Cancel/i,
      });
      fireEvent.change(usernameInput, { target: { value: "arthur" } });
      fireEvent.click(buttonCancel);
      expect(usernameInput.value).toBe("");
    });

    test("Cancel button deactivates modal", () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      const buttonSignIn = screen.getByTestId("button-sign-in");
      fireEvent.click(buttonSignIn);
      const buttonCancel = screen.getByRole("button", {
        name: /Cancel/i,
      });
      expect(screen.getByTestId("modal-elem")).toHaveClass("active");
      fireEvent.click(buttonCancel);
      expect(screen.getByTestId("modal-elem")).not.toHaveClass("active");
    });
  });
});
