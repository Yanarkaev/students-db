import React, { useState } from "react";
import { Button, Input } from "../../components/iu";
import styles from "./Auth.module.scss";

const Auth = () => {
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleAuth = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.Auth}>
      <h1>Вход</h1>

      <form onSubmit={handleAuth}>
        <Input
          name="login"
          value={data.login}
          placeholder="Логин"
          onChange={handleData}
          variant="outlined"
          type="email"
          className={styles.input}
        />
        <Input
          name="password"
          value={data.password}
          placeholder="Пароль"
          onChange={handleData}
          variant="outlined"
          type="password"
          className={styles.input}
        />

        <Button variant="enter" className={styles.button}>Войти</Button>
      </form>
    </div>
  );
};

export default Auth;
