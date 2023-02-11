import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.nav}>
        <button>Отчеты</button>
        <button>Отчеты</button>
        <button>Отчеты</button>
        <button>Отчеты</button>
      </div>

      <div className={styles.auth}>
        <button>Войти</button>
      </div>
    </div>
  );
};
