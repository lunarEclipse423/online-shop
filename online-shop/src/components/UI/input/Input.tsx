import React from "react";
import "./Input.scss";

type InputPropsType = {
  classes?: string;
  type: string;
  placeholder: string;
  name: string;
  value: string | number;
  onChange:
    | ((event: React.FormEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLInputElement>) => void);
  errorMessage?: string;
};

const Input = (props: InputPropsType) => {
  return (
    <div className="input-wrapper">
      <input
        className={`input ${props.classes}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="error">
        {props.errorMessage === undefined ? "" : props.errorMessage}
      </span>
    </div>
  );
};

export default Input;
