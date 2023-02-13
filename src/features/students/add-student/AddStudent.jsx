import React, { useState } from "react";
import styles from "./AddStudent.module.scss";
import { Button, Input } from "../../../components/iu";
import { useDispatch } from "react-redux";
import { addStudents } from "../studentsSlice";
function AddStudent() {
  const [data, setData] = useState({
    fullname: "",
    gender: "Мужской",
    faculty: "",
    course: "",
    group: "",
    educationForm: "",
    educationType: "",
  });

  const dataChecker = !!Object.values(data).filter((el) => el.trim() === "")
    .length;

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

  return (
    <div className={styles.container}>
      <h1>Добавить студента</h1>
      <div className={styles.fullnameContainer}>
        <Input
          value={data.fullname}
          onChange={handleData}
          className={styles.fullname}
          name="fullname"
          placeholder="ФИО"
        />
        <select
          value={data.gener}
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
          value={data.course}
          name="course"
          onChange={handleData}
          placeholder="КУРС"
        />
      </div>
      <div className={styles.inputGroups}>
        <Input
          value={data.group}
          name="group"
          onChange={handleData}
          placeholder="ГРУППА"
        />
      </div>
      <div className={styles.inputGroups}>
        <Input
          value={data.educationForm}
          name="educationForm"
          onChange={handleData}
          placeholder="ФОРМА ОБУЧЕНИЯ"
        />
      </div>
      <div className={styles.inputGroups}>
        <Input
          value={data.educationType}
          name="educationType"
          onChange={handleData}
          placeholder="ТИП ОБУЧЕНИЯ"
        />
      </div>
      <Button disabled={dataChecker} onClick={handleClick} variant="categories">
        Добавить
      </Button>
    </div>
  );
}

export default AddStudent;
