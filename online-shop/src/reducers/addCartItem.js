const initState = {
  cartItems: [],
};

const addCartItem = (state = initState, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      return {
        cartItems: [...state.cartItems, action.cartItem],
      };
    case "REMOVE_CART_ITEM":
      return {
        cartItems: [...state.cartItems.filter((item) => item.id !== action.cartItem.id)],
      };
    case "CHANGE_ITEM_QUANTITY":
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
    case "CLEAR_CART":
      return initState;
    default:
      return state;
  }
};

export default addCartItem;
