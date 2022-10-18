import React from "react";
import { useNavigate } from "react-router-dom";
import "./CatalogItem.css";

const CatalogItem = ({ ...product }) => {
  const navigate = useNavigate();
  const imgBaseUrl =
    "https://raw.githubusercontent.com/lunarEclipse423/online-shop-api/main/img/";
  return (
    <div
      className="catalog-item"
      onClick={() => navigate(`/catalog/${product.id}`, { state: { product } })}
    >
      <div className="image-wrapper">
        <img
          width="300"
          height="450"
          src={`${imgBaseUrl}${product.image}`}
          alt="catalog item"
        />
      </div>
      <div className="item-text">
        <span className="item-title">{product.title}</span>
        <span className="item-price">{product.price}£</span>
      </div>
    </div>
  );
};

export default CatalogItem;
