import { LoginType } from "../types/login";

const EMPTY_FIELD_ERROR = "Field is empty. Please, fill in";

export const validateLoginInput = (values: LoginType): LoginType => {
  const errors: LoginType = {
    username: "",
    password: "",
  };
  for (let key in values) {
    if (!values[key]) {
      errors[key] = EMPTY_FIELD_ERROR;
    }
  }
  return errors;
};
