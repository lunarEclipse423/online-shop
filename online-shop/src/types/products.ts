export enum ProductsActionTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  EDIT_PRODUCT = "EDIT_PRODUCT",
}

export type ProductType = {
  [key: string]: number | string;
  id: number;
  image: string;
  title: string;
  description: string;
  weight: string;
  composition: string;
  quantity: number;
  price: number;
  largeImage: string;
  cartImage: string;
};

export type EditProductType = {
  [key: string]: number | string;
  title: string;
  description: string;
  weight: string;
  composition: string;
  quantity: number;
};

export type ErrorsProductType = {
  [key: string]: string;
  title: string;
  description: string;
  weight: string;
  composition: string;
  quantity: string;
};

interface FetchProductsAction {
  type: ProductsActionTypes.FETCH_PRODUCTS;
  products: ProductType[];
}

interface EditProductAction {
  type: ProductsActionTypes.EDIT_PRODUCT;
  product: ProductType;
}

export type ProductsAction = FetchProductsAction | EditProductAction;

export interface ProductsState {
  products: ProductType[];
}
