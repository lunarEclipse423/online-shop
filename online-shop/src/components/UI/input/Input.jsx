import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <>
      <input
        className={`input ${props.classes}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="error">{props.errorMessage}</span>
    </>
  );
};

export default Input;
