import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FilterBar } from "../components";

import { Table } from "../components/iu/Table/Table";
import StrudentsInfo from "../components/StudentsInfo/StrudentsInfo";
import { fetchStudents } from "../features/students/studentsSlice";

const TablePage = () => {
  const students = useSelector((state) => state.students.students);
  const afterFilter = useSelector((state) => state.students.filteredStudents);
  const tableRef = useRef("table_main");
  const dispatch = useDispatch();
  const columns = [
    { value: "fullname", displayValue: "ФИО" },
    { value: "gender", displayValue: "Пол" },
    { value: "department", displayValue: "ВУЗ" },
    { value: "status", displayValue: "Статус" },
    { value: "faculty", displayValue: "Факультет" },
    { value: "direction", displayValue: "Направление" },
    { value: "course", displayValue: "Курс" },
    { value: "group", displayValue: "Группа" },
    { value: "educationForm", displayValue: "Форма обучения" },
    { value: "educationType", displayValue: "Тип обучения" },
    { value: "changeDate", displayValue: "Дата" },
  ];
  const { title } = useParams();

  useEffect(() => {
    switch (title) {
      case "reception":
        dispatch(fetchStudents("Принят"));
        break;
      case "transfer":
        dispatch(fetchStudents("Перевод"));
        break;
      case "expulsion":
        dispatch(fetchStudents("Отчислен"));
        break;
      default:
        dispatch(fetchStudents("Все"));
        break;
    }
  }, [dispatch, title, afterFilter]);
  return (
    <>
      <FilterBar tableRef={tableRef} />
      <StrudentsInfo students={!!afterFilter.length ? afterFilter : students} />
      <Table
        students={!!afterFilter.length ? afterFilter : students}
        columns={columns}
        rows={!!afterFilter.length ? afterFilter : students}
      />
    </>
  );
};

export default TablePage;
