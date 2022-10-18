import React from "react";
import "./Button.scss";

type ButtonPropsType = {
  classes?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Button = ({
  children,
  classes,
  onClick,
}: React.PropsWithChildren<ButtonPropsType>) => {
  return (
    <button
      className={`button ${classes === undefined ? "" : classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
