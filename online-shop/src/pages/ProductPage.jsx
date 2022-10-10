import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/UI/button/Button";
import "./ProductPage.css";

const ProductPage = () => {
  const location = useLocation();
  return (
    <div className="product-page">
      <div className="product-image">
        <img
          width="505"
          height="757"
          className="image_candle"
          src={location.state.product.largeImage}
          alt="candle"
        />
        <span className="candleaf-info">
          All hand-made with natural soy wax, Candleaf is made for your pleasure moments.
        </span>
        <span className="text-shipping">🚚 FREE SHIPPING</span>
      </div>
      <div className="product-info">
        <div className="product-info__short-details">
          <h2 className="product__title">{location.state.product.title}®</h2>
          <span className="product__price">£{location.state.product.price}</span>
          <span className="product__available">Available:</span>
          <div className="product__quantity">
            <span className="quantity__title">Quantity</span>
            <input type="text" className="quantity__input" />
          </div>
        </div>
        <Button buttonType="product__button">
          {" "}
          <span className="icon_cart_white product__icon"></span> + Add to cart
        </Button>
        <div className="product__description">
          <p>
            Scented candle in a patterned glass holder. Diameter 8 cm, height 11 cm. Burn
            time 60 hours.
          </p>
          <p>
            <span className="description_bold">Weight: </span>614 g
          </p>
          <p>
            <span className="description_bold">Composition: </span>Paraffin 80%, Plant wax
            20%Container: Glass 100%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
