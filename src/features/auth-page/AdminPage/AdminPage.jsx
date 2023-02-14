import React, { useState } from "react";
import { Button, Input } from "../../../components/iu";
import { useDispatch } from "react-redux";
import { signUpUser } from "./../userSlice";
import styles from "./AdminPage.module.scss";

export const AdminPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullname: "",
    login: "",
    password: "",
    department: "",
    jobTitle: "",
  });

  //   const fullnameRegex = /^[a-zA-Z'- ]+$/

  const dataChecker = !!Object.values(data).filter((el) => el.trim() === "")
    .length;

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataChecker) {
      dispatch(signUpUser(data));
    }
  };

  return (
    <div className={styles.AdminPage}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h1>Регистрация работника</h1>
        <Input
          className={styles.input}
          onChange={handleData}
          name="fullname"
          value={data.fullname}
          placeholder="ФИО"
        />
        <Input
          className={styles.input}
          onChange={handleData}
          name="login"
          value={data.login}
          placeholder="Логин"
        />
        <Input
          className={styles.input}
          onChange={handleData}
          name="password"
          value={data.password}
          placeholder="Пароль"
        />
        <Input
          className={styles.input}
          onChange={handleData}
          name="department"
          value={data.department}
          placeholder="Организация"
        />
        <Input
          className={styles.input}
          onChange={handleData}
          name="jobTitle"
          value={data.jobTitle}
          placeholder="Должность"
        />

        <Button disabled={dataChecker} variant="enter">
          Зарегистрировать
        </Button>
      </form>
    </div>
  );
};
