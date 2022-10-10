import React from "react";
import "./Button.css";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={`button ${props.buttonType} ${props.classes}`}>
      {children}
    </button>
  );
};

export default Button;
