import React from "react";
import "./Textarea.scss";

type TextareaPropsType = {
  classes?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  errorMessage: string | undefined;
};

const Textarea = (props: TextareaPropsType) => {
  return (
    <>
      <textarea
        className={`textarea ${props.classes}`}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        rows={7}
      ></textarea>
      <span className="error">
        {props.errorMessage === undefined ? "" : props.errorMessage}
      </span>
    </>
  );
};

export default Textarea;
