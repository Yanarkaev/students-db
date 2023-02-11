import React, { useState } from "react";
import styles from "./Input.module.scss";

export const Input = ({
  type,
  value,
  placeholder = "",
  variant = "standard",
  className,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={styles.InputWrapper}>
      <input
        type={type}
        className={`${styles.Input} ${styles[variant]} ${className}`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChange={onChange}
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
