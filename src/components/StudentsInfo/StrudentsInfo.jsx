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
  ] = useStudentsCounting(students);

  return (
    <div className={styles.container}>
      <div className={styles.countGroup}>
        <span className={styles.groupName}>Общее количество</span>
        <span>{`${studentsCount} `}</span>
      </div>
      <div className={styles.countGroup}>
        <span className={styles.groupName}>Форма обучения</span>
        <span>{`Очное обучение:  ${fullTime} `}</span>
        <span>{`Заочное обучение:  ${inAbsentia} `}</span>
      </div>
      <div className={styles.countGroup}>
        <span className={styles.groupName}>Тип Обучения</span>
        <span>{`Бюджет: ${budget} `}</span>
        <span>{`Коммерция: ${commerce} `}</span>
      </div>
      <div className={styles.countGroup}>
        <span className={styles.groupName}>Статус</span>
        <span>{`Принятых: ${accepted} `}</span>
        <span>{`Отчисленых: ${deducted} `}</span>
        <span>{`Переведеных: ${transferred} `}</span>
      </div>
    </div>
  );
}

export default StrudentsInfo;
