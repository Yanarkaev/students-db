import React, { useEffect, useState } from "react";
import { useStudents } from "./../../../shared/hooks/useStudents";
import { useParams } from "react-router-dom";
import styles from "./StudentPage.module.scss";
import { Button, Input } from "./../../../components/iu";
import { useDispatch } from "react-redux";
import { changeStudentData } from "../studentsSlice";

const StudentPage = () => {
  const { studentId } = useParams();
  const [changesOn, setChangesOn] = useState(false);
  const [student, setStudent] = useState();
  const [changesData, setChangesData] = useState({});

  const dispatch = useDispatch();

  const [students] = useStudents();
  const currentStudent = students.find((el) => el?._id === studentId);

  useEffect(() => {
    setStudent(currentStudent);
  }, [currentStudent]);

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
          from: "",
          to: "",
        },
        changeDate: student.changeDate,
        details: "",
      });
    }
  }, [student]);

  const handleChangeData = (e) => {
    setChangesData({ ...changesData, [e.target.name]: e.target.value });
  };

  const handleChangeRelocation = (e) => {
    setChangesData({
      ...changesData,
      relocation: {
        ...changesData.relocation,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    setChangesData({
      ...changesData,
      relocation: { from: "", to: "" },
      details: "",
    });
  }, [changesData?.status]);

  const handleSubmit = (e) => {
    setChangesOn(false);
    setStudent(changesData);
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
                    <Input
                      name="details"
                      onChange={handleChangeData}
                      type="text"
                      value={changesData.details}
                    />
                  </div>
                )}
              </>
            ) : (
              <b>
                {student.status === "Принят" || student.status === "Отчислен"
                  ? student.status
                  : `Переведен из ${student.relocation.from} в ${student.relocation.to}`}
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
