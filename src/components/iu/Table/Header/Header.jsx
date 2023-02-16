import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../..";
import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Header}>
      <div className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          главная
        </NavLink>
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
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Прием
        </NavLink>
        <NavLink
          to="/transfer"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Перевод
        </NavLink>
        <NavLink
          to="/expulsion"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Отчисление
        </NavLink>
        <NavLink
          variant="enter"
          to="/admin"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Админка
        </NavLink>
      </div>

      <div className={styles.auth}>
        <Button variant="enter" onClick={() => navigate("/admin")}>
          Войти
        </Button>
      </div>
    </div>
  );
};
