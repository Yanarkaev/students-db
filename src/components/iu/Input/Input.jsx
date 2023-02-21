import React from "react";
import styles from "./Input.module.scss";

export const Input = ({
  type,
  value,
  placeholder = "",
  variant = "standard",
  className = "",
  name,
  onChange,
  onBlur,
  min,
}) => {
  return (
    <div className={`${styles.InputWrapper} ${className}`}>
      <input
        type={type}
        className={`${styles.Input} ${styles[variant]} `}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        min={min}
      />
      <span className={`${styles.placeholder} ${value ? styles.focused : ""}`}>
        {placeholder}
      </span>
    </div>
  );
};
