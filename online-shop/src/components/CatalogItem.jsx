import React from "react";
import { useNavigate } from "react-router-dom";
import "./CatalogItem.css";

const CatalogItem = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <div
      className="catalog-item"
      onClick={() => navigate(`/catalog/${props.id}`, { state: { props } })}
    >
      <div className="image-wrapper">
        <img width="300" height="450" src={props.image} alt="catalog item" />
      </div>
      <div className="item-text">
        <span className="item-title">{props.title}</span>
        <span className="item-price">{props.price}£</span>
      </div>
    </div>
  );
};

export default CatalogItem;
