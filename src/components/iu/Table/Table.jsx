import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Button } from "../Button/Button";
import styles from "./Table.module.scss";
export const Table = ({ columns, rows, ref }) => {
  const [data, setData] = useState(rows);
  const tableRef = useRef("table_main");
  useEffect(() => {
    setData(rows);
  }, [rows]);

  if (!rows) {
    return;
  }

  return (
    <>
      <div className={styles.exporter}>
        <DownloadTableExcel
          filename="students_table"
          sheet="students"
          currentTableRef={tableRef.current}
        >
          <Button> Export excel </Button>
        </DownloadTableExcel>
      </div>
      <table className={styles.Table} ref={tableRef}>
        <thead>
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
            <tr key={index} role="row" tabIndex={0}>
              {columns.map(({ value }) => (
                <td key={value} role="cell" tabIndex={-1}>
                  {item[value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
