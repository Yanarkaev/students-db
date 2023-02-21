import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authToken, userLogout } from "../../features/auth-page/userSlice";
import { decodeJwt } from "./../../shared/helpers/decodeJwt";
import { Button } from "../iu";

export const Header = () => {
  const token = useSelector(authToken);
  const dispatch = useDispatch()

  // const [currentUser, setCurrentUser] = useState(token);
  const currentUser = decodeJwt(localStorage.getItem("token"));
  console.log(currentUser);
  console.log(token);

  const handleSignOut = (e) => {
     dispatch(userLogout())
  }

  // useEffect(() => {
  //   if (token) {
  //     setCurrentUser(decoded);
  //   }
  // }, [token]);

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
        {token ? (
          <Button variant="exit" onClick={handleSignOut}>ВЫЙТИ</Button>
        ) : (
          <NavLink
            to="/signin"
            // className={({ isActive }) =>
            //   `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            // }
          >
            Войти
          </NavLink>
        )}
      </div>
    </div>
  );
};
