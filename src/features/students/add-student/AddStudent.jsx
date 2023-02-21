import React, { useEffect, useState } from "react";
import styles from "./AddStudent.module.scss";
import { Button, Input } from "../../../components/iu";
import { useDispatch, useSelector } from "react-redux";
import { addStudents, resetIsAdded } from "../studentsSlice";
function AddStudent() {
  const [data, setData] = useState({
    fullname: "",
    gender: "Мужской",
    faculty: "",
    course: "",
    group: "",
    educationForm: "Очно",
    educationType: "Бюджет",
    changeDate: "",
    details: "По другим причинам",
  });
  const [dataStatus, setDataStatus] = useState({
    status: "Принят",
    from: "",
    to: "",
    details: "",
  });

  console.log(data)

  const isAdded = useSelector((state) => state.students.isAdded);

  useEffect(() => {
    if (isAdded) {
      setData({
        ...data,
        fullname: "",
        gender: "Мужской",
        faculty: "",
        course: "",
        group: "",
        from: "",
        to: "",
        details: "",
      });
    }
  }, [isAdded]);
  // const dataChecker = !!Object.values(data).filter((el) => el.trim() === "")
  //   .length;

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addStudents(data));
  };

  const handleSelect = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const hadleStatus = (e, type) => {
    setDataStatus({ ...dataStatus, [e.target.name]: e.target.value });
  };
  const reasons = [
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
  ];

  return (
    <div className={styles.container}>
      <h1>Добавление студента</h1>
      <div className={styles.fullnameContainer}>
        <Input
          value={data.fullname}
          onChange={handleData}
          className={styles.fullname}
          name="fullname"
          placeholder="ФИО"
          onBlur={() => dispatch(resetIsAdded())}
        />
        <select
          value={data.gender}
          onChange={handleSelect}
          className={styles.select}
          name="gender"
        >
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>

      <div className={styles.inputGroups}>
        <Input
          value={data.faculty}
          name="faculty"
          onChange={handleData}
          placeholder="Факультет"
        />
      </div>
      <div className={styles.inputGroups}>
        <Input
          type="number"
          value={data.course}
          name="course"
          onChange={handleData}
          placeholder="КУРС"
          min="1"
        />
      </div>
      <div className={styles.inputGroups}>
        <Input
          type="number"
          value={data.group}
          name="group"
          onChange={handleData}
          placeholder="ГРУППА"
        />
      </div>
      <div className={styles.selectGroups}>
        <label className={styles.label} htmlFor="eductionForm">
          <span>Форма обучения</span>
          <select
            value={data.educationForm}
            onChange={handleSelect}
            id="eductionForm"
            name="educationForm"
          >
            <option value="Очно">Очно</option>
            <option value="Заочно">Заочно</option>
          </select>
        </label>
        <label className={styles.label} htmlFor="eduction">
          <span>Тип обучения</span>
          <select
            value={data.educationType}
            onChange={handleSelect}
            id="educationType"
            name="educationType"
          >
            <option value="Бюджет">Бюджет</option>
            <option value="Коммерция">Коммерция</option>
          </select>
        </label>
        <label className={styles.label} htmlFor="eduction">
          <span>Статус студента</span>
          <select
            value={dataStatus.status}
            onChange={hadleStatus}
            id="status"
            name="status"
          >
            <option value="Принят">Принят</option>
            <option value="Перевод">Перевод</option>
            <option value="Отчислен">Отчислен</option>
          </select>
        </label>
      </div>
      <Input
        value={data.changeDate}
        name="changeDate"
        onChange={handleData}
        type="date"
      />
      <div className={styles.inputGroups}>
        {dataStatus.status === "Перевод" && (
          <>
            <Input
              value={data.from}
              name="from"
              onChange={handleSelect}
              placeholder="Из"
            />
            <Input
              value={data.to}
              name="to"
              onChange={handleSelect}
              placeholder="В"
            />
          </>
        )}

        {dataStatus.status === "Отчислен" && (
          <select value={data.details} name="details" onChange={hadleStatus}>
            {reasons.map(([value, item], index) => (
              <option key={index} value={value}>
                {item}
              </option>
            ))}
          </select>
        )}
      </div>
      <Button onClick={handleClick} variant="categories">
        Добавить
      </Button>
      {isAdded && <div color="green">Студент добавлен</div>}
    </div>
  );
}

export default AddStudent;
