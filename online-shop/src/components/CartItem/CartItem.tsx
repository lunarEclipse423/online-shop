import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCartActions } from "../../hooks/useActions";
import { CartType } from "../../types/cart";
import Button from "../UI/button/Button";
import "./CartItem.scss";
import { baseImageUrl } from "../../constants/urls";

const CartItem = ({ ...product }: CartType) => {
  const cartItems = useTypedSelector((state) => state.manageCartItems.cartItems);
  const { changeProductQuantity, removeProduct } = useCartActions();
  const [currProductQuantity, setCurrProductQuantity] = useState<number>(
    product.quantity
  );

  const decrement = (): void => {
    if (currProductQuantity === 1) {
      return;
    }
    const newProductQuantity = currProductQuantity - 1;
    setCurrProductQuantity(newProductQuantity);
    changeProductQuantity(product, newProductQuantity);
  };

  const increment = (): void => {
    if (currProductQuantity === product.quantityInStock) {
      return;
    }
    const newProductQuantity = currProductQuantity + 1;
    setCurrProductQuantity(newProductQuantity);
    changeProductQuantity(product, newProductQuantity);
  };

  const removeProductFromCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    removeProduct(cartItems.find((el) => el.id === product.id)!);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-product">
        <img
          src={`${baseImageUrl}${product.cartImage}`}
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
              data-testid="button-minus"
              type="button"
              value="-"
              className="quantity-form__minus"
              onClick={decrement}
            />
            <span data-testid="quantity" className="quantity-form__number">
              {currProductQuantity}
            </span>
            <input
              data-testid="button-plus"
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
