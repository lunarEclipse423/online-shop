import { calculateTotal } from "../utils/calculateTotal";

export const activateModal = () => {
  return {
    type: "ACTIVE",
  };
};

export const deactivateModal = () => {
  return {
    type: "DISABLED",
  };
};

export const loginUser = () => {
  return {
    type: "USER",
  };
};

export const loginAdmin = () => {
  return {
    type: "ADMIN",
  };
};

export const logout = () => {
  return {
    type: "UNAUTHORIZED",
  };
};

export const addProduct = (newCartItem) => {
  return {
    type: "ADD_CART_ITEM",
    cartItem: newCartItem,
  };
};

export const removeProduct = (cartItemToRemove) => {
  return {
    type: "REMOVE_CART_ITEM",
    cartItem: cartItemToRemove,
  };
};

export const changeProductQuantity = (cartItem, newQuantity) => {
  cartItem.quantity = newQuantity;
  cartItem.totalPrice = calculateTotal(cartItem.price, cartItem.quantity);
  return {
    type: "CHANGE_ITEM_QUANTITY",
    cartItem: cartItem,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
