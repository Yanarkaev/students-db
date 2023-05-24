import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StudentPage.module.scss";
import { Button, Input } from "./../../../components/iu";
import { useDispatch, useSelector } from "react-redux";
import { changeStudentData, getStudentById } from "../studentsSlice";
import { getStudent } from "./../studentsSlice";
import { authToken } from "../../auth-page/userSlice";
import { decodeJwt } from "./../../../shared/helpers/decodeJwt";

const StudentPage = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();

  const student = useSelector(getStudent);
  const token = useSelector(authToken);
  const workerId = decodeJwt(token).id;

  const currentUser = decodeJwt(token);

  const [changesOn, setChangesOn] = useState(false);
  const [changesData, setChangesData] = useState({});

  useEffect(() => {
    dispatch(getStudentById(studentId));
  }, [dispatch, studentId]);

  console.log(changesData);

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
        educationLevel: student.educationLevel,
        status: student.status,
        direction: student.direction,
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
    dispatch(
      changeStudentData({ workerId, studentId: student._id, data: changesData })
    );
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
                type="text"
                name="group"
                onChange={handleChangeData}
                value={changesData.group}
              />
            ) : (
              <b>{student.group}</b>
            )}
          </div>

          <div className={styles.infoItem}>
            <span>Факультет/Институт: </span>
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
            <span>Направление: </span>
            {changesOn ? (
              <Input
                className={styles.changeInput}
                name="direction"
                onChange={handleChangeData}
                value={changesData.direction}
                min="1"
              />
            ) : (
              <b>{student.direction}</b>
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
            <span>Уровень обучения: </span>
            {changesOn ? (
              <select
                value={changesData.educationLevel}
                onChange={handleChangeData}
                id="eductionLevel"
                name="educationLevel"
              >
                <option value="Бакалавриат">Бакалавриат</option>
                <option value="Магистратура">Магистратура</option>
                <option value="Аспирантура">Аспирантура</option>
              </select>
            ) : (
              <b>{student.educationLevel}</b>
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

        {student?.addedBy === currentUser?.id && (
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
        )}
      </div>
    );
  }
};

export default StudentPage;
