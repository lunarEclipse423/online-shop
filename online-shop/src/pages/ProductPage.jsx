import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, changeProductQuantity } from "../actions";
import { calculateTotal } from "../utils/calculateTotal";
import Button from "../components/UI/button/Button";
import "./ProductPage.css";

const ProductPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const cartItems = useSelector((state) => state.addCartItem.cartItems);
  const [productQuantity, setProductQuantity] = useState(1);
  const imgBaseUrl =
    "https://raw.githubusercontent.com/lunarEclipse423/online-shop-api/main/img/";

  const decrement = () => {
    setProductQuantity(productQuantity === 1 ? productQuantity : productQuantity - 1);
  };

  const increment = () => {
    setProductQuantity(
      productQuantity === location.state.product.quantity
        ? productQuantity
        : productQuantity + 1
    );
  };

  const addToCart = (e) => {
    e.preventDefault();
    const finalProductQuantity = productQuantity;
    const totalPriceCalculated = calculateTotal(
      location.state.product.price,
      finalProductQuantity
    );
    const cartItem = cartItems.find((item) => item.id === location.state.product.id);

    if (cartItem !== undefined) {
      const maxAvailableQuantity =
        finalProductQuantity > location.state.product.quantity - cartItem.quantity
          ? location.state.product.quantity
          : finalProductQuantity + cartItem.quantity;
      dispatch(changeProductQuantity(cartItem, maxAvailableQuantity));
    } else {
      dispatch(
        addProduct({
          id: location.state.product.id,
          name: location.state.product.title,
          price: location.state.product.price,
          quantity: finalProductQuantity,
          totalPrice: totalPriceCalculated,
          cartImage: location.state.product.cartImage,
          quantityInStock: location.state.product.quantity,
        })
      );
    }

    setProductQuantity(1);
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img
          width="505"
          height="757"
          className="image_candle"
          src={`${imgBaseUrl}${location.state.product.largeImage}`}
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
          <span className="product__available">
            Available: {location.state.product.quantity}
          </span>
          <div className="product__quantity">
            <span className="quantity__title">Quantity</span>
            <div className="quantity-border">
              <form className="quantity-form">
                <input
                  type="button"
                  value="-"
                  className="quantity-form__minus"
                  field="quantity"
                  onClick={decrement}
                />
                <span className="quantity-form__number">{productQuantity}</span>
                <input
                  type="button"
                  value="+"
                  className="quantity-form__plus"
                  field="quantity"
                  onClick={increment}
                />
              </form>
            </div>
          </div>
        </div>
        {isLogged !== "unauthorized" ? (
          location.state.product.quantity === 0 ? (
            <p className="unauth__text">Out of stock</p>
          ) : (
            <Button classes="product__button" onClick={addToCart}>
              <span className="icon_cart_white product__icon"></span> + Add to cart
            </Button>
          )
        ) : (
          <p className="unauth__text">Sign in to buy</p>
        )}

        <div className="product__description">
          <p>{location.state.product.description}</p>
          <p>
            <span className="description_bold">Weight: </span>
            {location.state.product.weight}
          </p>
          <p>
            <span className="description_bold">Composition: </span>
            {location.state.product.composition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
