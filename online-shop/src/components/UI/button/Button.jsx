import React from "react";
import "./Button.css";

const Button = ({ children, ...props }) => {
  return props.buttonType === "product__button" ? (
    <button {...props} className="button product__button">
      {children}
    </button>
  ) : (
    <button {...props} className="button">
      {children}
    </button>
  );
};

export default Button;
