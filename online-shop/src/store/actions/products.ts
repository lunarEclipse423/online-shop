import { ProductsActionTypes, ProductType } from "../../types/products";

export const fetchProducts = (fetchedProducts: ProductType[]) => {
  return {
    type: ProductsActionTypes.FETCH_PRODUCTS,
    products: fetchedProducts,
  };
};

export const editProduct = (product: ProductType) => {
  return {
    type: ProductsActionTypes.EDIT_PRODUCT,
    product: product,
  };
};
