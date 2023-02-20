import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Table.module.scss";

export const Table = ({ columns, rows }) => {
  const [data, setData] = useState(rows);
  const navigate = useNavigate();

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
  );
};
