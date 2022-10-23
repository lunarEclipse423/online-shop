import { CartActionTypes, CartType } from "../../types/cart";
import { calculateTotal } from "../../utils/calculateTotal";

export const addProduct = (newCartItem: CartType) => {
  return {
    type: CartActionTypes.ADD_CART_ITEM,
    cartItem: newCartItem,
  };
};

export const removeProduct = (cartItemToRemove: CartType) => {
  return {
    type: CartActionTypes.REMOVE_CART_ITEM,
    cartItem: cartItemToRemove,
  };
};

export const changeProductQuantity = (cartItem: CartType, newQuantity: number) => {
  cartItem.quantity = newQuantity;
  cartItem.totalPrice = calculateTotal(cartItem.price, cartItem.quantity);
  return {
    type: CartActionTypes.CHANGE_ITEM_QUANTITY,
    cartItem: cartItem,
  };
};

export const clearCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART,
  };
};
