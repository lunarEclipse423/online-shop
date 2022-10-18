import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct, changeProductQuantity } from "../../store/actions/cart";
import { editProduct } from "../../store/actions/products";
import { calculateTotal } from "../../utils/calculateTotal";
import { useTypedSelector } from "../../hooks/storeHooks";
import Input from "../../components/UI/input/Input";
import Textarea from "../../components/UI/textarea/Textarea";
import Button from "../../components/UI/button/Button";
import "./ProductPage.scss";

type ErrorValuesType = {
  title?: string;
  description?: string;
  weight?: string;
  composition?: string;
  quantity?: string;
};

const ProductPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useTypedSelector((state) => state.isLogged);
  const cartItems = useTypedSelector((state) => state.manageCartItems.cartItems);
  const productItem = useTypedSelector((state) =>
    state.manageProducts.products.find((el) => el.id === location.state.product.id)
  );
  const [productQuantity, setProductQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [newProductInfo, setNewProductInfo] = useState(productItem);
  const [errors, setErrors] = useState<ErrorValuesType>({
    title: "",
    description: "",
    weight: "",
    composition: "",
    quantity: "",
  });
  const imgBaseUrl =
    "https://raw.githubusercontent.com/lunarEclipse423/online-shop-api/main/img/";

  const decrement = () => {
    setProductQuantity(productQuantity === 1 ? productQuantity : productQuantity - 1);
  };

  const increment = () => {
    setProductQuantity(
      productQuantity === productItem.quantity ? productQuantity : productQuantity + 1
    );
  };

  const inputHandler = (e: any) => {
    const { name, value } = e.target;
    setNewProductInfo({
      ...newProductInfo,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const addToCart = (e: any) => {
    e.preventDefault();
    const finalProductQuantity = productQuantity;
    const totalPriceCalculated = calculateTotal(productItem.price, finalProductQuantity);
    const cartItem = cartItems.find((item) => item.id === productItem.id);

    if (cartItem !== undefined) {
      const maxAvailableQuantity =
        finalProductQuantity > productItem.quantity - cartItem.quantity
          ? productItem.quantity
          : finalProductQuantity + cartItem.quantity;
      dispatch(changeProductQuantity(cartItem, maxAvailableQuantity));
    } else {
      dispatch(
        addProduct({
          id: productItem.id,
          name: productItem.title,
          price: productItem.price,
          quantity: finalProductQuantity,
          totalPrice: totalPriceCalculated,
          cartImage: productItem.cartImage,
          quantityInStock: productItem.quantity,
        })
      );
    }

    setProductQuantity(1);
  };

  const validate = (values: any) => {
    const errors = {
      title: "",
      description: "",
      weight: "",
      composition: "",
      quantity: "",
    };

    for (let key in values) {
      if (!values[key]) {
        errors[key as keyof typeof errors] = "Field is empty. Please, fill in";
      }
    }

    if (values.quantity) {
      if (values.quantity < 0) {
        errors.quantity = "Product quantity cannot be negative";
      }
    }

    const shortInputs = ["title", "weight", "quantity"];
    shortInputs.forEach((key) => {
      if (values[key]) {
        if (values[key].length > 30) {
          errors[key as keyof typeof errors] =
            "Entry must be no longer than 30 characters";
        }
      }
    });

    if (values.composition) {
      if (values.composition.length > 100) {
        errors.composition = "Entry must be no longer than 100 characters";
      }
    }

    if (values.description) {
      if (values.description.length > 600) {
        errors.description = "Entry must be no longer than 600 characters";
      }
    }

    for (let key in errors) {
      if (errors[key as keyof typeof errors] !== "") {
        return errors;
      }
    }

    return {};
  };

  const cancelChanges = () => {
    editProductInfo();
    setNewProductInfo(productItem);
  };

  const editProductInfo = () => {
    setIsEditing(!isEditing);
    setErrors({});
  };

  const saveChanges = () => {
    const currErrors = validate(newProductInfo);
    if (Object.keys(currErrors).length !== 0) {
      setErrors(currErrors);
      return;
    }
    dispatch(editProduct(newProductInfo));
    editProductInfo();
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img
          width="505"
          height="757"
          className="image_candle"
          src={`${imgBaseUrl}${productItem.largeImage}`}
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
                    type="button"
                    value="-"
                    className="quantity-form__minus"
                    // field="quantity"
                    onClick={decrement}
                  />
                  <span className="quantity-form__number">{productQuantity}</span>
                  <input
                    type="button"
                    value="+"
                    className="quantity-form__plus"
                    // field="quantity"
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
