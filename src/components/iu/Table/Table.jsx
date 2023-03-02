import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useNavigate } from "react-router";
import { useStudentsCounting } from "../../../shared/hooks/useStudentsCounting";

import { Button } from "../Button/Button";
import styles from "./Table.module.scss";
export const Table = ({ columns, rows, students }) => {
  const [data, setData] = useState(rows);
  const [counter, setCounter] = useState(false);
  const tableRef = useRef("table_main");
  const navigate = useNavigate();
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
  useEffect(() => {
    setData(rows);
  }, [rows]);

  if (!rows) {
    return;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.exporter}>
        <Button
          variant="enter"
          className={styles.exelBtn}
          onClick={() => setCounter(!counter)}
        >
          Cчетчик для экспорта: <strong>{counter ? "вкл" : "выкл"}</strong>
        </Button>
        <DownloadTableExcel
          filename="students_table"
          sheet="students"
          currentTableRef={tableRef.current}
        >
          <Button variant="enter" className={styles.exelBtn}>
            Скачать в Excel
          </Button>
        </DownloadTableExcel>
      </div>

      <table className={styles.Table} ref={tableRef}>
        <thead>
          {counter && (
            <>
              <tr>
                <th>Всего</th>
                <th>Муж</th>
                <th>Жен</th>
                <th>Принято</th>
                <th>Отчислено</th>
                <th>Переведено</th>
                <th>Очно</th>
                <th>Заочно</th>
                <th>Бюджет</th>
                <th>Коммерция</th>
                <th>Дата выгрузки</th>
              </tr>
              <tr>
                <td>{studentsCount}</td>
                <td>{men}</td>
                <td>{woman}</td>
                <td>{accepted}</td>
                <td>{deducted}</td>
                <td>{transferred}</td>
                <td>{fullTime}</td>
                <td>{inAbsentia}</td>
                <td>{budget}</td>
                <td>{commerce}</td>
                <td>{moment().format("YYYY-MM-DD")}</td>
              </tr>
            </>
          )}
          <tr>
            {columns.map(({ value, displayValue }) => {
              return (
                <th key={value} role="columnheader" tabIndex={0}>
                  {displayValue}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              role="row"
              tabIndex={0}
              onClick={() => navigate("/student/" + item._id)}
            >
              {columns.map(({ value }) => (
                <td key={value} role="cell" tabIndex={-1}>
                  {item[value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
