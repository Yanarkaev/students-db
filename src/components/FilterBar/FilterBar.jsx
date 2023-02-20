
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  filterReset,
  filterStudents,
} from "../../features/students/studentsSlice";
import { Button, Input } from "../iu";
import { Select } from "../iu/Select/Select";
import styles from "./FilterBar.module.scss";

export const FilterBar = () => {
  const [data, setData] = useState({
    fullname: "",
    department: "",
    faculty: "",
    course: "",
    gender: "",
    educationForm: "",
    educationType: "",
    details: "",
    isActive: false,
  });
  const [timerData, setTimerData] = useState({
    startDate: "",
    endDate: "",
    isActive: false,
  });
  const { title } = useParams();
  const dispatch = useDispatch();

  const filterSelect = [
    {
      header: "Пол",
      name: "gender",
      list: [
        [false, "все"],
        ["Мужской", "Мужской"],
        ["Женский", "Женский"],
      ],
    },
    {
      header: "Тип обучения",
      name: "educationType",
      list: [
        [false, "все"],
        ["Бюджет", "Бюджет"],
        ["Коммерция", "Коммерция"],
      ],
    },
    {
      header: "Форма обучения",
      name: "educationForm",
      list: [
        [false, "все"],
        ["Очно", "Очно"],
        ["Заочно", "Заочно"],
      ],
    },
    {
      header: "курс",
      name: "course",
      list: [
        [false, "все"],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
      ],
    },
  ];
  const filterInput = [
    {
      placeholder: "ФИО",
      name: "fullname",
    },
    {
      placeholder: "ВУЗ",
      name: "department",
    },
    {
      placeholder: "Факультет",
      name: "faculty",
    },
  ];
  const { headerDetail, reasons } = {
    headerDetail: "Причина",
    reasons: [
      [false, "Все"],
      ["По другим причинам", "По другим причинам"],
      ["Невыполнение условий договора", "Невыполнение условий договора"],
      ["Утеря связи", "Утеря связи"],
      ["Академическая неуспеваемость", "Академическая неуспеваемость"],
      ["Невыход из академки", "Невыход из академки"],
      [
        "Неудовлетворительная оценка на ГИА",
        "Неудовлетворительная оценка на ГИА",
      ],
      ["По собственному желанию", "По собственному желанию"],
      ["Перевод в другой ВУЗ", "Перевод в другой ВУЗ"],
    ],
  };

  const handleFilter = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFilterTime = (e) => {
    setTimerData({ ...timerData, [e.target.name]: e.target.value });
  };
  const handleFilterTimeActive = (e) => {
    setTimerData({ ...timerData, isActive: !timerData.isActive });
  };
  const useFilter = () => {
    dispatch(filterStudents({ data, timerData }));
  };
  const resetFilter = () => {
    setData({
      fullname: "",
      department: "",
      faculty: "",
      course: "",
      gender: "",
      educationForm: "",
      educationType: "",
      details: "",
    });
    setTimerData({ startDate: "", endDate: "", isActive: false });
    dispatch(filterReset());
  };

  useEffect(() => {
    resetFilter();
  }, [title]);

  return (
    <div className={`${styles.FilterBar}`}>
      <div className={styles.dateSelect}>
        <div>
          <span>с:</span>
          <input
            type="date"
            onChange={handleFilterTime}
            name="startDate"
            value={data.startDate}
          />
        </div>
        <div>
          <span>по:</span>
          <input
            type="date"
            onChange={handleFilterTime}
            name="endDate"
            value={data.endDate}
          />
        </div>
        <div>
          <Button onClick={handleFilterTimeActive}>
            {timerData.isActive ? "Вкл" : "Выкл"}
          </Button>
        </div>
      </div>

      <div className={styles.inputs}>

        {filterInput.map(({ placeholder, name }, index) => (
          <Input
            key={index}
            placeholder={placeholder}
            name={name}
            variant="outlined"
            onChange={handleFilter}
            value={data[name]}
          />
        ))}
      </div>
      <div className={styles.filterInput}>
        {filterSelect.map(({ header, name, list }, index) => (
          <Select
            key={index}
            header={header}
            name={name}
            list={list}
            onChange={handleFilter}
          ></Select>
        ))}
        {title === "expulsion" && (
          <Select
            header={headerDetail}
            name="details"
            list={reasons}
            onChange={handleFilter}
          ></Select>
        )}
      </div>
      <div className={styles.filterInput}>
        <Button children="Применить" onClick={useFilter} />
        <Button children="Сбросить" onClick={resetFilter} />

      </div>
    </div>
  );
};
