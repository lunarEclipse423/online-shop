import { CartState, CartAction, CartActionTypes } from "../../types/cart";

const initState: CartState = {
  cartItems: [],
};

const cartItemsReducer = (state = initState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_CART_ITEM:
      return {
        cartItems: [...state.cartItems, action.cartItem],
      };
    case CartActionTypes.REMOVE_CART_ITEM:
      return {
        cartItems: [...state.cartItems.filter((item) => item.id !== action.cartItem.id)],
      };
    case CartActionTypes.CHANGE_ITEM_QUANTITY:
      return {
        cartItems: [
          ...state.cartItems.map((item) => {
            if (item.id === action.cartItem.id) {
              item.quantity = action.cartItem.quantity;
              item.totalPrice = action.cartItem.totalPrice;
            }
            return item;
          }),
        ],
      };
    case CartActionTypes.CLEAR_CART:
      return initState;
    default:
      return state;
  }
};

export default cartItemsReducer;
