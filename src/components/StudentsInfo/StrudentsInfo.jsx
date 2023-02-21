import React from "react";
import { useStudentsCounting } from "../../shared/hooks/useStudentsCounting";
import styles from "./StudentsInfo.module.scss";

function StrudentsInfo({ students }) {
  const [
    studentsCount,
    fullTime,
    inAbsentia,
    budget,
    commerce,
    accepted,
    deducted,
    transferred,
    men,
    woman,
  ] = useStudentsCounting(students);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.countGroup}>
          <span className={styles.groupName}>Общее количество</span>
          <div>
            <span> Все: {studentsCount} </span>
            <span>Муж: {men}</span>
            <span>Жен: {woman}</span>
          </div>
        </div>
        <div className={styles.countGroup}>
          <span className={styles.groupName}>Форма обучения</span>
          <div>
            <span>{`Очное обучение:  ${fullTime} `}</span>
            <span>{`Заочное обучение:  ${inAbsentia} `}</span>
          </div>
        </div>
        <div className={styles.countGroup}>
          <span className={styles.groupName}>Тип Обучения</span>
          <div>
            <span>{`Бюджет: ${budget} `}</span>
            <span>{`Коммерция: ${commerce} `}</span>
          </div>
        </div>
        <div className={styles.countGroup}>
          <span className={styles.groupName}>Статус</span>
          <div>
            <span>{`Принято: ${accepted} `}</span>
            <span>{`Отчислено: ${deducted} `}</span>
            <span>{`Переведено: ${transferred} `}</span>
          </div>
        </div>
        {/* <div className={styles.countGroup}>
          <span className={styles.groupName}>Пол</span>
          <div>
            <span>{`Мужской: ${men} `}</span>
            <span>{`Женский: ${woman} `}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default StrudentsInfo;
