import React, { useState } from "react";
import styles from "./AddStudent.module.scss";
import { Button, Input } from "../../../components/iu";
import { useDispatch } from "react-redux";
import { addStudents } from "../studentsSlice";
function AddStudent() {
  const [data, setData] = useState({
    fullname: "",
    gender: "Мужской",
    department: "",
    faculty: "",
    course: "",
    group: "",
    educationForm: "Очно",
    educationType: "Бюджет",
    changeDate: "",
  });
  const [dataStatus, setDataStatus] = useState({
    title: "Принят",
    from: "",
    to: "",
  });

  // const dataChecker = !!Object.values(data).filter((el) => el.trim() === "")
  //   .length;

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addStudents({ data: data, status: dataStatus }));
  };

  const handleSelect = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const hadleStatus = (e, type) => {
    setDataStatus({ ...dataStatus, [e.target.name]: e.target.value });
  };
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
        />
        <select
          value={data.gender}
          onChange={handleSelect}
          className={styles.select}
          name="gender"
        >
          <option selected value="Мужской">
            Мужской
          </option>
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
            value={dataStatus.title}
            onChange={hadleStatus}
            id="title"
            name="title"
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
        {dataStatus.title === "Перевод" && (
          <>
            <Input
              value={dataStatus.from}
              name="from"
              onChange={hadleStatus}
              placeholder="Из"
            />
            <Input
              value={dataStatus.to}
              name="to"
              onChange={hadleStatus}
              placeholder="В"
            />
          </>
        )}
      </div>
      <Button onClick={handleClick} variant="categories">
        Добавить
      </Button>
    </div>
  );
}

export default AddStudent;
