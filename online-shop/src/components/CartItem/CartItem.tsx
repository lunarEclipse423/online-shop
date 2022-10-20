import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeProduct, changeProductQuantity } from "../../store/actions/cart";
import { useTypedSelector } from "../../hooks/storeHooks";
import { CartType } from "../../types/cart";
import Button from "../UI/button/Button";
import "./CartItem.scss";

const CartItem = ({ ...product }: CartType) => {
  const dispatch = useDispatch();
  const cartItems = useTypedSelector((state) => state.manageCartItems.cartItems);
  const [currProductQuantity, setCurrProductQuantity] = useState(product.quantity);
  const imgBaseUrl =
    "https://raw.githubusercontent.com/lunarEclipse423/online-shop-api/main/img/";

  const decrement = () => {
    if (currProductQuantity === 1) {
      return;
    }
    const newProductQuantity = currProductQuantity - 1;
    setCurrProductQuantity(newProductQuantity);
    dispatch(changeProductQuantity(product, newProductQuantity));
  };

  const increment = () => {
    if (currProductQuantity === product.quantityInStock) {
      return;
    }
    const newProductQuantity = currProductQuantity + 1;
    setCurrProductQuantity(newProductQuantity);
    dispatch(changeProductQuantity(product, newProductQuantity));
  };

  const removeProductFromCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    dispatch(removeProduct(cartItems.find((el) => el.id === product.id)!));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-product">
        <img
          src={`${imgBaseUrl}${product.cartImage}`}
          alt={product.title}
          className="cart-item__image"
        />
        <div className="cart-item__product-info">
          <span className="cart-item__title">{product.title}®</span>
          <span className="cart-item__product-number">P/N: {product.id}</span>
          <Button classes="remove_button" onClick={removeProductFromCart}>
            Remove
          </Button>
        </div>
      </div>
      <span className="cart-item-price">£{product.price}</span>
      <div className="cart-item-quantity-wrapper">
        <div className="cart-item-quantity-border">
          <form className="quantity-form">
            <input
              type="button"
              value="-"
              className="quantity-form__minus"
              onClick={decrement}
            />
            <span className="quantity-form__number">{currProductQuantity}</span>
            <input
              type="button"
              value="+"
              className="quantity-form__plus"
              onClick={increment}
            />
          </form>
        </div>
      </div>

      <span className="cart-item__total">£{product.totalPrice}</span>
    </div>
  );
};

export default CartItem;
