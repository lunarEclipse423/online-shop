import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../App";
import Login from "./Login";
import Modal from "../UI/modal/Modal";
import store from "../../store";

describe("Login", () => {
  test("Should render login component", () => {
    // given
    renderLogin();

    const titleText = screen.getByText(/Sign In/i);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonCancel = screen.getByRole("button", {
      name: /Cancel/i,
    });
    const buttonLogin = screen.getByRole("button", {
      name: /Login/i,
    });

    // then
    expect(titleText).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  describe("Should handle user input", () => {
    test("Username input", () => {
      // given
      renderLogin();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");

      // when
      fireEvent.change(usernameInput, { target: { value: "arthur" } });

      // then
      expect(usernameInput.value).toBe("arthur");
    });

    test("Password input", () => {
      // given
      renderLogin();
      const passwordInput: HTMLInputElement = screen.getByPlaceholderText("Password");

      // when
      fireEvent.change(passwordInput, { target: { value: "1234" } });

      // then
      expect(passwordInput.value).toBe("1234");
    });
  });

  describe("Should fail with error on empty field", () => {
    test("Empty password input", () => {
      // given
      renderLogin();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });

      // when
      fireEvent.change(usernameInput, { target: { value: "arthur" } });
      fireEvent.click(buttonLogin);
      const error = screen.getByText("Field is empty. Please, fill in");

      // then
      expect(error).toBeInTheDocument();
    });

    test("Empty username input", () => {
      // given
      renderLogin();
      const passwordInput: HTMLInputElement = screen.getByPlaceholderText("Password");
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });

      // when
      fireEvent.change(passwordInput, { target: { value: "1234" } });
      fireEvent.click(buttonLogin);
      const error = screen.getByText("Field is empty. Please, fill in");

      // then
      expect(error).toBeInTheDocument();
    });

    test("Empty username and password inputs", () => {
      // given
      renderLogin();
      const buttonLogin = screen.getByRole("button", {
        name: /Login/i,
      });

      // when
      fireEvent.click(buttonLogin);
      const error = screen.getAllByText("Field is empty. Please, fill in");

      // then
      expect(error.length).toBe(2);
    });
  });

  describe("Should close pop-up on cancel button click", () => {
    test("Should clear inputs on cancel button click", () => {
      // given
      renderLogin();
      const usernameInput: HTMLInputElement = screen.getByPlaceholderText("Username");
      const buttonCancel = screen.getByRole("button", {
        name: /Cancel/i,
      });

      // when
      fireEvent.change(usernameInput, { target: { value: "arthur" } });
      fireEvent.click(buttonCancel);

      // then
      expect(usernameInput.value).toBe("");
    });

    test("Should deactivate modal on cancel button click", () => {
      // given
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

      // when
      fireEvent.click(buttonCancel);

      // then
      expect(screen.getByTestId("modal-elem")).not.toHaveClass("active");
    });
  });
});

const renderLogin = () => {
  render(
    <Provider store={store}>
      <Router>
        <Modal>
          <Login />
        </Modal>
      </Router>
    </Provider>
  );
};
