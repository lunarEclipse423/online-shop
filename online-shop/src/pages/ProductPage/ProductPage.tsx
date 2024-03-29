import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCartActions, useProductsActions } from "../../hooks/useActions";
import { validateProductInfo } from "../../utils/validateProductInfo";
import { calculateTotal } from "../../utils/calculateTotal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductType, ErrorsProductType } from "../../types/products";
import Input from "../../components/UI/input/Input";
import Textarea from "../../components/UI/textarea/Textarea";
import Button from "../../components/UI/button/Button";
import "./ProductPage.scss";
import { baseImageUrl } from "../../constants/urls";

const ProductPage = () => {
  const initialErrorsValue: ErrorsProductType = {
    title: "",
    description: "",
    weight: "",
    composition: "",
    quantity: "",
  };
  const location = useLocation();
  const { changeProductQuantity, addProduct } = useCartActions();
  const { editProduct } = useProductsActions();
  const isLogged = useTypedSelector((state) => state.isLogged);
  const cartItems = useTypedSelector((state) => state.manageCartItems.cartItems);
  const [productItem, setProductItem] = useState<ProductType>(location.state.product);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newProductInfo, setNewProductInfo] = useState<ProductType>(productItem);
  const [errors, setErrors] = useState<ErrorsProductType>(initialErrorsValue);

  const decrement = (): void => {
    setProductQuantity(productQuantity === 1 ? productQuantity : productQuantity - 1);
  };

  const increment = (): void => {
    setProductQuantity(
      productQuantity === productItem.quantity ? productQuantity : productQuantity + 1
    );
  };

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.currentTarget;
    setNewProductInfo({
      ...newProductInfo,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const addToCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const finalProductQuantity = productQuantity;
    const totalPriceCalculated = calculateTotal(productItem.price, finalProductQuantity);
    const cartItem = cartItems.find((item) => item.id === productItem.id);

    if (cartItem !== undefined) {
      const maxAvailableQuantity =
        finalProductQuantity > productItem.quantity - cartItem.quantity
          ? productItem.quantity
          : finalProductQuantity + cartItem.quantity;
      changeProductQuantity(cartItem, maxAvailableQuantity);
    } else {
      addProduct({
        id: productItem.id,
        title: productItem.title,
        price: productItem.price,
        cartImage: productItem.cartImage,
        quantity: finalProductQuantity,
        quantityInStock: productItem.quantity,
        totalPrice: totalPriceCalculated,
      });
    }
    setProductQuantity(1);
  };

  const editProductInfo = (): void => {
    setIsEditing(!isEditing);
    setErrors(initialErrorsValue);
  };

  const cancelChanges = (): void => {
    editProductInfo();
    setNewProductInfo(productItem);
  };

  const saveChanges = (): void => {
    const errors = validateProductInfo(newProductInfo);
    for (let key in errors) {
      if (errors[key] !== "") {
        setErrors(errors);
        return;
      }
    }
    editProduct(newProductInfo);
    setProductItem(newProductInfo);
    editProductInfo();
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img
          width="505"
          height="757"
          className="image_candle"
          src={`${baseImageUrl}${productItem.largeImage}`}
          alt="candle"
        />
        <span className="candleaf-info">
          All hand-made with natural soy wax, Candleaf is made for your pleasure moments.
        </span>
        <span className="text-shipping">🚚 FREE SHIPPING</span>
      </div>

      {isEditing ? (
        <div className="product-info">
          <div className="product-info__short-details">
            <Input
              classes="edit_input"
              name="title"
              type="text"
              placeholder="Enter new product name..."
              value={newProductInfo.title}
              onChange={inputHandler}
              errorMessage={errors.title}
            />
            <span className="product__price">£{newProductInfo.price}</span>

            <span className="product__available">
              Available:{" "}
              <Input
                classes="edit_input quantity_input"
                name="quantity"
                type="number"
                placeholder="Enter new product quantity..."
                value={newProductInfo.quantity}
                onChange={inputHandler}
                errorMessage={errors.quantity}
              />
            </span>
          </div>

          <div className="product__description">
            <Textarea
              name="description"
              placeholder="Enter new product description..."
              value={newProductInfo.description}
              onChange={inputHandler}
              errorMessage={errors.description}
            ></Textarea>
            <p className="weight_input">
              <span className="description_bold">Weight: </span>
              <Input
                classes="edit_input"
                name="weight"
                type="text"
                placeholder="Enter new product weight..."
                value={newProductInfo.weight}
                onChange={inputHandler}
                errorMessage={errors.weight}
              />
            </p>
            <p className="composition_input">
              <span className="description_bold">Composition: </span>
              <Input
                classes="edit_input"
                name="composition"
                type="text"
                placeholder="Enter new product composition..."
                value={newProductInfo.composition}
                onChange={inputHandler}
                errorMessage={errors.composition}
              />
            </p>
          </div>
          <div className="edit-buttons-wrapper">
            <Button classes="edit__button cancel_button" onClick={cancelChanges}>
              Cancel
            </Button>
            <Button classes="edit__button" onClick={saveChanges}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="product-info">
          <div className="product-info__short-details">
            <h2 className="product__title">{productItem.title}®</h2>
            <span className="product__price">£{productItem.price}</span>
            <span className="product__available">Available: {productItem.quantity}</span>
            <div className="product__quantity">
              <span className="quantity__title">Quantity</span>
              <div className="quantity-border">
                <form className="quantity-form">
                  <input
                    data-testid="button-minus"
                    type="button"
                    value="-"
                    className="quantity-form__minus"
                    onClick={decrement}
                  />
                  <span data-testid="quantity" className="quantity-form__number">
                    {productQuantity}
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
          </div>
          {isLogged !== "unauthorized" ? (
            isLogged === "admin" ? (
              <Button classes="product__button" onClick={editProductInfo}>
                Edit
              </Button>
            ) : productItem.quantity === 0 ? (
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
            <p>{productItem.description}</p>
            <p>
              <span className="description_bold">Weight: </span>
              {productItem.weight}
            </p>
            <p>
              <span className="description_bold">Composition: </span>
              {productItem.composition}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
