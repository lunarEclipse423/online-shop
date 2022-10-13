import React from "react";
import "./Textarea.css";

const Textarea = (props) => {
  return (
    <>
      <textarea {...props} className={`textarea ${props.classes}`} rows="7"></textarea>
      <span className="error">{props.errorMessage}</span>
    </>
  );
};

export default Textarea;
