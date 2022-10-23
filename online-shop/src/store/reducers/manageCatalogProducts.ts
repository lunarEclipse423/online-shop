import {
  ProductsState,
  ProductsAction,
  ProductsActionTypes,
  ProductType,
} from "../../types/products";

const initState: ProductsState = {
  products: [],
};

const catalogProductsReducer = (
  state = initState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCTS:
      return {
        products: action.products,
      };
    case ProductsActionTypes.EDIT_PRODUCT:
      return {
        products: [
          ...state.products.map((product: ProductType) => {
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
