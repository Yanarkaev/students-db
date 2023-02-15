import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../..";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.nav}>
        <NavLink
          to="/addstud"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          добавить студента
        </NavLink>
        <NavLink
          to="/reception"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Прием
        </NavLink>

        <NavLink
          to="/transfer"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Перевод
        </NavLink>
        <NavLink
          to="/expulsion"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Отчисление
        </NavLink>
      </div>

      <div className={styles.auth}>
        <Button variant="enter">Войти</Button>
      </div>
    </div>
  );
};
