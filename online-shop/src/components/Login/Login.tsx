import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginAdmin } from "../../store/actions/login";
import { deactivateModal } from "../../store/actions/modal";
import { getAllUsers } from "../../api/ShopService";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import "./Login.scss";

type LoginValuesType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(startValues);
  const [errors, setErrors] = useState<LoginValuesType>(startValues);
  let loggedInRole = "";

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values: LoginValuesType) => {
    const errors = Object.assign({}, startValues);
    for (let key in values) {
      if (!values[key as keyof typeof values]) {
        errors[key as keyof typeof errors] = "Field is empty. Please, fill in";
      }
    }
    return errors.username === "" && errors.password === "" ? {} : errors;
  };

  const auth = async (values: LoginValuesType) => {
    return new Promise((resolve) =>
      setTimeout(async () => {
        const errors = Object.assign({}, startValues);
        const users = await getAllUsers();
        users.forEach((user: any) => {
          if (values.username === user.username && values.password === user.password) {
            loggedInRole = user.role;
          }
        });
        if (!loggedInRole) {
          errors["password"] = "This user doesnt exist";
        }
        resolve(errors.username === "" && errors.password === "" ? {} : errors);
      }, 1000)
    );
  };

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let currentErrors = validate(formValues);
    if (Object.keys(currentErrors).length !== 0) {
      setErrors(currentErrors);
      return;
    }
    auth(formValues).then((res: any) => {
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

  const cancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFormValues(startValues);
    setErrors({});
    dispatch(deactivateModal());
  };

  return (
    <form className="login-form" onSubmit={login}>
      <div className="login-icon-wrapper">
        <span className="icon_login-logo"></span>
      </div>
      <div className="cross-icon-wrapper" onClick={cancel}>
        <span className="icon_cross"></span>
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
