import React, { useState } from "react";
import styles from "./Input.module.scss";

export const Input = ({
  type,
  value,
  placeholder = "",
  variant = "standard",
  className = '',
  name,
  onChange,
  onBlur,
  min
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`${styles.InputWrapper} ${className}`}>
      <input
        type={type}
        className={`${styles.Input} ${styles[variant]} `}
        // onFocus={() => setFocus(true)}
        // onBlur={() => setFocus(false)}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        min={min}
      />
      <span
        className={`${styles.placeholder} ${
          focus || value ? styles.focused : ""
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
};
