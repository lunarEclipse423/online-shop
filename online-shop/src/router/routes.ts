import AboutShopPage from "../pages/AboutShopPage/AboutShopPage";
import CartPage from "../pages/CartPage/CartPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const routes = [
  { path: "/catalog", element: CatalogPage },
  { path: "/catalog/:id", element: ProductPage },
  { path: "/about", element: AboutShopPage },
  { path: "/cart", element: CartPage },
  { path: "/error", element: ErrorPage },
];
