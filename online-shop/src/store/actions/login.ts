import { LoggedActionTypes } from "../../types/login";

export const loginUser = () => {
  return {
    type: LoggedActionTypes.USER,
  };
};

export const loginAdmin = () => {
  return {
    type: LoggedActionTypes.ADMIN,
  };
};

export const logout = () => {
  return {
    type: LoggedActionTypes.UNAUTHORIZED,
  };
};
