import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginAdmin } from "../../store/actions/login";
import { deactivateModal } from "../../store/actions/modal";
import { getAllUsers } from "../../api/ShopService";
import { UserType } from "../../types/user";
import { LoginType } from "../../types/login";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import "./Login.scss";

const Login = () => {
  const startValues = {
    username: "",
    password: "",
  };
  let loggedInRole = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<LoginType>(startValues);
  const [errors, setErrors] = useState<LoginType>(startValues);

  const inputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values: LoginType): LoginType => {
    const errors: LoginType = Object.assign({}, startValues);
    for (let key in values) {
      if (!values[key]) {
        errors[key] = "Field is empty. Please, fill in";
      }
    }
    return errors;
  };

  const auth = async (values: LoginType): Promise<LoginType> => {
    return new Promise((resolve) =>
      setTimeout(async () => {
        const errors: LoginType = Object.assign({}, startValues);
        const users = await getAllUsers<UserType[]>();
        users!.forEach((user: UserType) => {
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

  const login = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let currentErrors = validate(formValues);
    for (let key in currentErrors) {
      if (currentErrors[key] !== "") {
        setErrors(currentErrors);
        return;
      }
    }
    auth(formValues).then((res: LoginType) => {
      currentErrors = res;
      for (let key in currentErrors) {
        if (currentErrors[key] !== "") {
          setErrors(currentErrors);
          return;
        }
      }
      setFormValues(startValues);
      setErrors(startValues);
      dispatch(deactivateModal());
      dispatch(loggedInRole === "user" ? loginUser() : loginAdmin());
      navigate("/catalog");
    });
  };

  const cancel = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setFormValues(startValues);
    setErrors(startValues);
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
          classes="password__input"
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
