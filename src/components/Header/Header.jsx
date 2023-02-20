import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../iu";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { authToken } from "../../features/auth-page/userSlice";
import { decodeJwt } from "./../../shared/helpers/decodeJwt";

export const Header = () => {
  const navigate = useNavigate();

  const token = useSelector(authToken);

  const currentUser = decodeJwt(token);

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
        {currentUser.role === "admin" ? (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Админка
          </NavLink>
        ) : (
          <NavLink
            to="/addstud"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            }
          >
            добавить студента
          </NavLink>
        )}
      </div>

      <div className={styles.auth}>
        <NavLink
          to="/signin"
          // className={({ isActive }) =>
          //   `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          // }
        >
          Войти
        </NavLink>
      </div>
    </div>
  );
};
