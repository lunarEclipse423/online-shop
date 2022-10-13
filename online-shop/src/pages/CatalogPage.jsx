import { React, useState } from "react";
import { useEffect } from "react";
import { getAllProducts } from "../api/ShopService";
import CatalogItem from "../components/CatalogItem";
import "./CatalogPage.css";

const CatalogPage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

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
