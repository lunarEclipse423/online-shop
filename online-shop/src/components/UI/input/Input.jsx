import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <>
      <input
        className={`input ${props.classes}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.inputHandler}
      />
      <span className="error">{}</span>
    </>
  );
};

export default Input;
