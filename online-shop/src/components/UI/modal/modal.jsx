import React from "react";
import "./modal.css";
import { useSelector } from "react-redux";

const Modal = ({ children }) => {
  const isModal = useSelector((state) => state.isModal);
  return (
    <div className={isModal ? "modal active" : "modal"}>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;
