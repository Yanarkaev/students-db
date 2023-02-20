import React from "react";
import s from "./Select.module.scss";

export const Select = ({ header, list, name, onChange }) => {
  return (
    <div className={s.main}>
      <span className={s.header}>{header}</span>
      <select
        className={s.select}
        onChange={onChange}
        name={name}
        id={name + 1}
      >
        {list.map(([value, item], index) => {
          if (index === 0) {
            return (
              <option value={value} key={index} defaultValue>
                {item}
              </option>
            );
          }
          return (
            <option value={value} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
