import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StudentPage.module.scss";
import { Button, Input } from "./../../../components/iu";
import { useDispatch, useSelector } from "react-redux";
import { changeStudentData, getStudentById } from "../studentsSlice";
import { getStudent } from "./../studentsSlice";

const StudentPage = () => {
  const { studentId } = useParams();
  const [changesOn, setChangesOn] = useState(false);

  const [changesData, setChangesData] = useState({});

  const dispatch = useDispatch();

  const student = useSelector(getStudent);

  useEffect(() => {
    dispatch(getStudentById(studentId));
  }, [dispatch, studentId]);

  useEffect(() => {
    if (student) {
      setChangesData({
        fullname: student.fullname,
        gender: student.gender,
        course: student.course,
        group: student.group,
        faculty: student.faculty,
        educationForm: student.educationForm,
        educationType: student.educationType,
        status: student.status,
        relocation: {
          from: student.relocation?.from,
          to: student.relocation?.to,
        },
        changeDate: student.changeDate,
        details: student.details || "Невыполнение условий договора",
      });
    }
  }, [student]);

  const handleChangeData = (e) => {
    setChangesData({ ...changesData, [e.target.name]: e.target.value });
  };

  const handleChangeRelocation = (e) => {
    setChangesData({
      ...changesData,
      details: "",
      relocation: {
        ...changesData.relocation,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeDetails = (e) => {
    setChangesData({
      ...changesData,
      details: e.target.value,
      relocation: {
        from: "",
        to: "",
      },
    });
  };

  const handleSubmit = (e) => {
    setChangesOn(false);
    dispatch(changeStudentData({ id: student._id, data: changesData }));
  };

  if (student) {
    return (
      <div className={styles.StudentPage}>
        <h1>Данные студента</h1>
        <section className={styles.info}>
          <div className={styles.infoItem}>
            <span>ФИО: </span>
            {changesOn ? (
              <Input
                className={styles.changeInput}
                name="fullname"
                onChange={handleChangeData}
                type="text"
                value={changesData.fullname}
              />
            ) : (
              <b>{student.fullname}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Пол: </span>
            {changesOn ? (
              <select
                name="gender"
                onChange={handleChangeData}
                value={changesData.gender}
              >
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            ) : (
              <b>{student.gender}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Курс: </span>
            {changesOn ? (
              <Input
                className={styles.changeInput}
                type="number"
                name="course"
                onChange={handleChangeData}
                value={changesData.course}
                min="1"
              />
            ) : (
              <b>{student.course}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Группа: </span>
            {changesOn ? (
              <Input
                className={styles.changeInput}
                type="number"
                name="group"
                onChange={handleChangeData}
                value={changesData.group}
                min="1"
              />
            ) : (
              <b>{student.group}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Факультет: </span>
            {changesOn ? (
              <Input
                className={styles.changeInput}
                name="faculty"
                onChange={handleChangeData}
                value={changesData.faculty}
                min="1"
              />
            ) : (
              <b>{student.faculty}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Форма обучения: </span>
            {changesOn ? (
              <select
                name="educationForm"
                onChange={handleChangeData}
                value={changesData.educationForm}
              >
                <option value="Очно">Очно</option>
                <option value="Заочно">Заочно</option>
                <option value="Очно-заочно">Очно-заочно</option>
              </select>
            ) : (
              <b>{student.educationForm}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Тип обучения: </span>
            {changesOn ? (
              <select
                name="educationType"
                onChange={handleChangeData}
                value={changesData.educationType}
              >
                <option value="Бюджет">Бюджет</option>
                <option value="Коммерция">Коммерция</option>
              </select>
            ) : (
              <b>{student.educationType}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Статус: </span>
            {changesOn ? (
              <>
                <select
                  name="status"
                  onChange={(e) => {
                    handleChangeData(e);
                  }}
                  value={changesData.status}
                >
                  <option value="Принят">Принят</option>
                  <option value="Перевод">Перевод</option>
                  <option value="Отчислен">Отчислен</option>
                </select>

                {changesData.status === "Перевод" && (
                  <div className={styles.statusInputs}>
                    <Input
                      className={styles.changeInput}
                      name="from"
                      value={changesData.relocation.from}
                      onChange={handleChangeRelocation}
                      placeholder="Из"
                    />
                    <Input
                      className={styles.changeInput}
                      name="to"
                      value={changesData.relocation.to}
                      onChange={handleChangeRelocation}
                      placeholder="В"
                    />
                  </div>
                )}

                {changesData.status === "Отчислен" && (
                  <div className={styles.statusInputs}>
                    <select
                      name="details"
                      value={changesData.details}
                      onChange={handleChangeDetails}
                    >
                      <option value="Невыполнение условий договора">
                        Невыполнение условий договора
                      </option>
                      <option value="Утеря связи">Утеря связи</option>
                      <option value="Академическая неуспеваемость">
                        Академическая неуспеваемость
                      </option>
                      <option value="Невыход из академки">
                        Невыход из академки
                      </option>
                      <option value="Неудовлетворительная оценка на ГИА">
                        Неудовлетворительная оценка на ГИА
                      </option>
                      <option value="По собственному желанию">
                        По собственному желанию
                      </option>
                      <option value="Перевод в другой ВУЗ">
                        Перевод в другой ВУЗ
                      </option>
                      <option value="По другим причинам">
                        По другим причинам
                      </option>
                    </select>
                  </div>
                )}
              </>
            ) : (
              <b>
                {student.status === "Принят" && student.status}
                {student.status === "Отчислен" &&
                  `${student.status} (${student.details})`}
                {student.status === "Перевод" &&
                  `Переведен из ${student.relocation?.from} в ${student.relocation?.to}`}
              </b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Дата: </span>
            {changesOn ? (
              <input
                type="date"
                value={changesData.changeDate}
                name="changeDate"
                onChange={handleChangeData}
              />
            ) : (
              <b>{student.changeDate}</b>
            )}
          </div>
        </section>

        <div className={styles.buttons}>
          {!changesOn ? (
            <Button variant="enter" onClick={() => setChangesOn(!changesOn)}>
              Редактировать
            </Button>
          ) : (
            <>
              <Button variant="enter" onClick={handleSubmit}>
                Подтвердить
              </Button>
              <Button variant="exit" onClick={() => setChangesOn(!changesOn)}>
                Отменить
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default StudentPage;
