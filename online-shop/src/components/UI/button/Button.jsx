import React from "react";
import "./Button.css";

const Button = ({ children, ...props }) => {
  return (
    <button
      className={`button ${props.classes === undefined ? "" : props.classes}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
