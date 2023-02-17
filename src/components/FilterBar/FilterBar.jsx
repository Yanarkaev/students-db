import React, { useState } from "react";
import { Button, Input } from "../iu";
import styles from "./FilterBar.module.scss";

export const FilterBar = () => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
    fullname: "",
    education: "",
    course: "",
    gender: "",
    educationForm: "",
    educationType: "",
    status: "",
  });

  return (
    <div className={`${styles.FilterBar}`}>
      <div className={styles.dateSelect}>
        <div>
          <span>с:</span>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <span>по:</span>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div className={styles.inputs}>
        <Input
          className={styles.filterInput}
          placeholder="ФИО"
          variant="outlined"
        />
        <Input
          className={styles.filterInput}
          placeholder="Факультет"
          variant="outlined"
        />
      </div>

      <div className={styles.selects}>
        <div>
          <span>Курс</span>
          <select className={styles.selectCourse}>
            <option value="">Все</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
          </select>
        </div>

        <div>
          <span>Пол</span>
          <select name="" className={styles.selectGender}>
            <option value="">Все</option>
            <option value="">Мужской</option>
            <option value="">Женский</option>
          </select>
        </div>

        <div>
          <span>Форма обучения</span>
          <select name="" className={styles.selectForm}>
            <option value="">Все</option>
            <option value="">Очно</option>
            <option value="">Заочно</option>
            <option value="">Очно-заочно</option>
          </select>
        </div>

        <div>
          <span>Тип обучения</span>
          <select name="" className={styles.selectType}>
            <option value="">Все</option>
            <option value="">Бюджет</option>
            <option value="">Контракт</option>
          </select>
        </div>

        <div>
          <span>Статус</span>
          <select name="" className={styles.selectStatus}>
            <option value="">Все</option>
            <option value="">Принят</option>
            <option value="">Переведен</option>
            <option value="">Отчислен</option>
          </select>
        </div>
      </div>
    </div>
  );
};
