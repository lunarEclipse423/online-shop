import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/actions/cart";
import { calculateCartSum } from "../../utils/calculateCartSum";
import { useTypedSelector } from "../../hooks/storeHooks";
import Button from "../../components/UI/button/Button";
import CartItem from "../../components/CartItem/CartItem";
import "./CartPage.scss";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useTypedSelector((state) => state.manageCartItems.cartItems);
  const [totalPrice, setTotalPrice] = useState(calculateCartSum(cartItems));

  useMemo(() => setTotalPrice(calculateCartSum(cartItems)), [cartItems]);

  const removeAllFromCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    dispatch(clearCart());
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Your cart items</h2>
      <div className="cart-item-titles">
        <span className="cart-item-title">Product</span>
        <span className="cart-item-price">Price</span>
        <span className="cart-item-quantity">Quantity</span>
        <span className="cart-item-total">Total</span>
      </div>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem
              id={item.id}
              cartImage={item.cartImage}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              quantityInStock={item.quantityInStock}
            />
          ))
        ) : (
          <div className="cart-empty-message">Cart is currently empty!</div>
        )}
      </div>
      <div className={cartItems.length ? "cart-bottom" : "hidden"}>
        <div className="cart__price-info">
          <div className="cart-total">
            <span className="cart__subtotal-title">Sub-total</span>
            <span className="cart___total-price">£{totalPrice}</span>
          </div>
          <span className="cart__tax">
            Tax and shipping cost will be calculated later
          </span>
        </div>
        <div className="cart-buttons">
          <Button onClick={removeAllFromCart}>Clear cart</Button>
          <Button classes="cart__button">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
