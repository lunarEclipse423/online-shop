import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import modalReducer from "./isModalActive";
import addCartItem from "./addCartItem";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  isModal: modalReducer,
  addCartItem: addCartItem,
});

export default allReducers;
