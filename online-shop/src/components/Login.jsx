import React from "react";
import "./Login.css";
import Button from "./UI/button/Button";
import Input from "./UI/input/Input";
import { useDispatch } from "react-redux";
import { deactivateModal } from "../actions";

const Login = () => {
  const dispatch = useDispatch();
  const login = () => {
    console.log("login!!");
  };
  return (
    <form className="login-form" onSubmit={login}>
      <div className="login-icon-wrapper">
        <span className="icon_login-logo"></span>
      </div>
      <h2 className="login__title">Sign In</h2>
      <div className="inputs-wrapper">
        <Input classes="login__input" type="text" placeholder="Username" />
        <Input classes="login__input" type="text" placeholder="Password" />
      </div>
      <div className="buttons-wrapper">
        <Button
          classes="login-form__button cancel_button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(deactivateModal());
          }}
        >
          Cancel
        </Button>
        <Button classes="login-form__button">Login</Button>
      </div>
    </form>
  );
};

export default Login;
