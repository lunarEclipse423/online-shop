export enum CartActionTypes {
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  CHANGE_ITEM_QUANTITY = "CHANGE_ITEM_QUANTITY",
  CLEAR_CART = "CLEAR_CART",
}

export type CartType = {
  [key: string]: number | string;
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  cartImage: string;
  quantityInStock: number;
};

export interface CartAction {
  type: string;
  cartItem: CartType;
}

export interface CartState {
  cartItems: CartType[];
}
