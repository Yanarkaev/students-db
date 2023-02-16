import { useEffect, useState } from "react";
import styles from "./Table.module.scss";
export const Table = ({ columns, rows }) => {
  const [data, setData] = useState(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  if (!rows) {
    return;
  }

  return (
    <table className={styles.Table}>
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
  );
};
