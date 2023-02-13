import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
  className = "",
  variant = "categories",
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.Button} ${styles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
