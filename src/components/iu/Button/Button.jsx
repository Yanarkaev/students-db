import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
  className = "",
  variant = "categories",
  children,
}) => {
  return (
    <button className={`${styles.Button} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};
