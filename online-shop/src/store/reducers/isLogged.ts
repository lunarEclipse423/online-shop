import { LoggedAction, LoggedActionTypes } from "../../types/login";

const initState = "unauthorized";

const loggedReducer = (state = initState, action: LoggedAction): string => {
  switch (action.type) {
    case LoggedActionTypes.USER:
      return "user";
    case LoggedActionTypes.ADMIN:
      return "admin";
    case LoggedActionTypes.UNAUTHORIZED:
      return "unauthorized";
    default:
      return state;
  }
};

export default loggedReducer;
