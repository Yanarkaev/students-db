import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  filterReset,
  filterStudents,
} from "../../features/students/studentsSlice";
import { Button, Input } from "../iu";
import { Select } from "../iu/Select/Select";
import styles from "./FilterBar.module.scss";

export const FilterBar = () => {
  const { title } = useParams();

  const dispatch = useDispatch();
  const filteredStudents = useSelector(
    (state) => state.students.filteredStudents
  );
  const [data, setData] = useState({
    fullname: "",
    department: "",
    faculty: "",
    course: false,
    gender: false,
    educationForm: false,
    educationType: false,
    details: false,
    isActive: false,
  });
  const [timerData, setTimerData] = useState({
    startDate: "",
    endDate: "",
  });

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
        ["Очно-заочно", "Очно-заочно"],
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

  const handleFilterTime = async (e) => {
    setTimerData({
      ...timerData,
      [e.target.name]: e.target.value,
    });
    setData({ ...data, isActive: false });
  };

  const handleFilter = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value, isActive: false });
  };

  const resetFilter = () => {
    dispatch(filterReset());
    filterSelect.forEach((item) => {
      let select = document.getElementById(item.name + 1);
      select.value = false;
    });

    setData({
      fullname: "",
      department: "",
      faculty: "",
      course: false,
      gender: false,
      educationForm: false,
      educationType: false,
      details: false,
      isActive: false,
    });

    setTimerData({
      startDate: "",
      endDate: "",
      isActive: false,
    });
  };

  const useFilter = () => {
    setData({ ...data, isActive: true });
    dispatch(filterStudents({ data, timerData }));
  };

  useEffect(() => {
    dispatch(filterReset());
  }, [title, dispatch]);
  return (
    <div className={`${styles.FilterBar}`}>
      <div className={styles.header}>
        <h2>Фильтр</h2>
      </div>
      <div className={styles.dateSelect}>
        <h3>Дата</h3>

        <div>
          <span>с:</span>
          <input
            type="date"
            onChange={handleFilterTime}
            name="startDate"
            id="startDate"
            value={timerData.startDate}
          />
        </div>
        <div>
          <span>по:</span>
          <input
            type="date"
            onChange={handleFilterTime}
            name="endDate"
            id="endDate"
            value={timerData.endDate}
          />
        </div>
      </div>

      <div className={styles.inputs}>
        {filterInput.map(({ placeholder, name }, index) => (
          <Input
            key={index}
            placeholder={placeholder}
            name={name}
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

      <div className={styles.resetButtons}>
        <div>
          <Button className={styles.resetBtn} onClick={resetFilter} disabled={!data.isActive? 'disabled' : ''}>
            Сбросить
          </Button>
          <Button variant="enter" onClick={useFilter} disabled={data.isActive? 'disabled' : ''}>
            Применить
          </Button>
        </div>
        {data.isActive ? (
          <div>Найдено по фильтру: {filteredStudents.length}</div>
        ) : (
          <div>{!data.isActive && "фильт не применен"}</div>
        )}
      </div>
    </div>
  );
};
