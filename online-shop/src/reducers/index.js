import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import modalReducer from "./isModalActive";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  isModal: modalReducer,
});

export default allReducers;
