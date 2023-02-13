import React, { useState } from "react";
import { Input } from "../iu";
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
  console.log(date);
  return (
    <div className={styles.FilterBar}>
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
          placeholder="Направление"
          variant="outlined"
        />
      </div>

      <div className={styles.selects}>
        <select className={styles.selectCourse}>
          <option value="">курс 1</option>
          <option value="">курс 2</option>
          <option value="">курс 3</option>
          <option value="">курс 4</option>
          <option value="">курс 5</option>
          <option value="">курс 6</option>
        </select>

        <select name="" id="" className={styles.selectGender}>
          <option value="">Мужской</option>
          <option value="">Женский</option>
        </select>

        <select name="" id="" className={styles.selectForm}>
          <option value="">Очно</option>
          <option value="">Заочно</option>
          <option value="">Очно-заочно</option>
        </select>

        <select name="" id="" className={styles.selectType}>
          <option value="">Бюджет</option>
          <option value="">Контракт</option>
        </select>

        <select name="" id="" className={styles.selectStatus}>
          <option value="">Принят</option>
          <option value="">Переведен</option>
          <option value="">Отчислен</option>
        </select>
      </div>
    </div>
  );
};
