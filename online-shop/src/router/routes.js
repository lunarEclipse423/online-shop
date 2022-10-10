import AboutShopPage from "../pages/AboutShopPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";

export const routes = [
  { path: "/catalog", element: CatalogPage, exact: true },
  { path: "/catalog/:id", element: ProductPage, exact: true },
  { path: "/about", element: AboutShopPage, exact: true },
  { path: "/error", element: ErrorPage, exact: true },
];
