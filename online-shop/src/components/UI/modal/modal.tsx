import React from "react";
import { useTypedSelector } from "../../../hooks/storeHooks";
import "./Modal.scss";

type Props = {
  children: JSX.Element;
};

const Modal = ({ children }: Props) => {
  const isModal = useTypedSelector((state) => state.isModal);

  return (
    <div className={isModal ? "modal active" : "modal"}>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;
