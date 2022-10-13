import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deactivateModal, loginUser, loginAdmin } from "../actions";
import { getAllUsers } from "../api/ShopService";
import Button from "./UI/button/Button";
import Input from "./UI/input/Input";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(startValues);
  const [errors, setErrors] = useState(startValues);
  let loggedInRole = "";

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    for (let key in values) {
      if (!values[key]) {
        errors[key] = "Field is empty. Please, fill in";
      }
    }
    return errors;
  };

  const auth = async (values) => {
    return new Promise((resolve) =>
      setTimeout(async () => {
        const errors = {};
        const users = await getAllUsers();
        users.forEach((user) => {
          if (values.username === user.username && values.password === user.password) {
            loggedInRole = user.role;
          }
        });
        if (!loggedInRole) {
          errors["password"] = "This user doesnt exist";
        }
        resolve(errors);
      }, 1000)
    );
  };

  const login = (e) => {
    e.preventDefault();
    let currentErrors = validate(formValues);
    if (Object.keys(currentErrors).length !== 0) {
      setErrors(currentErrors);
      return;
    }
    auth(formValues).then((res) => {
      currentErrors = res;
      setErrors(res);
      if (Object.keys(currentErrors).length === 0) {
        dispatch(deactivateModal());
        dispatch(loggedInRole === "user" ? loginUser() : loginAdmin());
        setFormValues(startValues);
        navigate("/catalog");
      }
    });
  };

  const cancel = (e) => {
    e.preventDefault();
    setFormValues(startValues);
    setErrors({});
    dispatch(deactivateModal());
  };

  return (
    <form className="login-form" onSubmit={login}>
      <div className="login-icon-wrapper">
        <span className="icon_login-logo"></span>
      </div>
      <h2 className="login__title">Sign In</h2>
      <div className="inputs-wrapper">
        <Input
          classes="login__input"
          name="username"
          type="text"
          placeholder="Username"
          value={formValues.username}
          onChange={inputHandler}
          errorMessage={errors.username}
        />
        <Input
          classes="login__input"
          name="password"
          type="password"
          placeholder="Password"
          value={formValues.password}
          onChange={inputHandler}
          errorMessage={errors.password}
        />
      </div>
      <div className="buttons-wrapper">
        <Button classes="login-form__button cancel_button" onClick={cancel}>
          Cancel
        </Button>
        <Button classes="login-form__button">Login</Button>
      </div>
    </form>
  );
};

export default Login;
