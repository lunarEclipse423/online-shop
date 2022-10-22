import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/ShopService";
import { useEntryActions, useProductsActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductType } from "../../types/products";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import "./CatalogPage.scss";

const CatalogPage = () => {
  const { firstEntry } = useEntryActions();
  const { fetchProducts } = useProductsActions();
  const productItems = useTypedSelector((state) => state.manageProducts.products);
  const entry = useTypedSelector((state) => state.firtEntry);
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    if (entry) {
      firstEntry();
      getAllProducts().then((data) => {
        fetchProducts(data);
        setProducts(productItems);
      });
    } else {
      setProducts(productItems);
    }
  });

  return (
    <div className="catalog">
      <h2 className="catalog__title">Products</h2>
      <p className="catalog__text">Order it for you or for your beloved ones </p>
      <div className="catalog-items">
        {products &&
          products.map((product) => (
            <CatalogItem
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              description={product.description}
              weight={product.weight}
              composition={product.composition}
              largeImage={product.largeImage}
              cartImage={product.cartImage}
            />
          ))}
      </div>
    </div>
  );
};

export default CatalogPage;
