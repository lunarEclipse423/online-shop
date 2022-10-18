import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import { getAllProducts } from "../../api/ShopService";
import { firstEntry } from "../../store/actions/entry";
import { fetchProducts } from "../../store/actions/products";
import { useTypedSelector } from "../../hooks/storeHooks";
import "./CatalogPage.scss";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const productItems = useTypedSelector((state) => state.manageProducts.products);
  const entry = useTypedSelector((state) => state.firtEntry);
  const [products, setProducts] = useState<any[] | null>(null);

  useEffect(() => {
    if (entry) {
      dispatch(firstEntry());
      getAllProducts().then((data) => {
        dispatch(fetchProducts(data));
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
