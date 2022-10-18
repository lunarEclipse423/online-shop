const initState = {
  products: [],
};

const catalogProductsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        products: action.products,
      };
    case "EDIT_PRODUCT":
      return {
        products: [
          ...state.products.map((product) => {
            if (product.id === action.product.id) {
              for (let key in product) {
                product[key] = action.product[key];
              }
            }
            return product;
          }),
        ],
      };
    default:
      return state;
  }
};

export default catalogProductsReducer;
