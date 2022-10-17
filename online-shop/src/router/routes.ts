import AboutShopPage from "../pages/AboutShopPage";
import CartPage from "../pages/CartPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";

export const routes = [
  { path: "/catalog", element: CatalogPage },
  { path: "/catalog/:id", element: ProductPage },
  { path: "/about", element: AboutShopPage },
  { path: "/cart", element: CartPage },
  { path: "/error", element: ErrorPage },
];
