import React from "react";
import CatalogItem from "../components/CatalogItem";
import "./CatalogPage.css";
import productsData from "./../productsData";

const CatalogPage = () => {
  return (
    <div className="catalog">
      <h2 className="catalog__title">Products</h2>
      <p className="catalog__text">Order it for you or for your beloved ones </p>
      <div className="catalog-items">
        {productsData.map((product) => (
          <CatalogItem
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            largeImage={product.largeImage}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
