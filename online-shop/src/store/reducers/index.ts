import { combineReducers } from "redux";
import firstEnteredReducer from "./firstEntered";
import loggedReducer from "./isLogged";
import modalReducer from "./isModalActive";
import cartItemsReducer from "./manageCartItems";
import catalogProductsReducer from "./manageCatalogProducts";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  isModal: modalReducer,
  manageCartItems: cartItemsReducer,
  manageProducts: catalogProductsReducer,
  firtEntry: firstEnteredReducer,
});

export default allReducers;
