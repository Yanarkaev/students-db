import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../..";
import {
  fetchStudents,
  fetchStudentsByStatus,
} from "../../../../features/students/studentsSlice";
import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (type) => {
    dispatch(fetchStudentsByStatus(type));
  };
  const handleReset = () => {
    dispatch(fetchStudents());
  };
  return (
    <div className={styles.Header}>
      <div className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => handleReset()}
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
        <Button
          variant="categories"
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => handleClick("Принят")}
        >
          Прием
        </Button>

        <Button
          variant="categories"
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => handleClick("Перевод")}
        >
          Перевод
        </Button>
        <Button
          variant="categories"
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          onClick={() => handleClick("Отчислен")}
        >
          Отчисление
        </Button>
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
