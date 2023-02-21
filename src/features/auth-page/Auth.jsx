import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../components/iu";
import styles from "./Auth.module.scss";
import { signInUser } from "./userSlice";

const Auth = () => {
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const authError = useSelector((state) => state.user.error);

  const [error, setError] = useState(authError);
  const dispatch = useDispatch();

  useEffect(() => {
    setError(authError);
  }, [authError]);

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleAuth = (e) => {
    dispatch(signInUser(data));
    e.preventDefault();
  };
  return (
    <div className={styles.Auth}>
      <h1>Вход</h1>
      {{error} && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleAuth}>
        <Input
          name="login"
          value={data.login}
          placeholder="Логин"
          onChange={handleData}
          variant="outlined"
          type="text"
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

        <Button variant="enter" className={styles.button}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Auth;
