import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterBar } from "../components";
import { Table } from "../components/iu/Table/Table";
import { fetchStudents } from "../features/students/studentsSlice";

const TablePage = () => {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const columns = [
    { value: "fullname", displayValue: "ФИО" },
    { value: "gender", displayValue: "Пол" },
    { value: "department", displayValue: "ВУЗ" },
    { value: "faculty", displayValue: "Факультет" },
    { value: "course", displayValue: "Курс" },
    { value: "group", displayValue: "Группа" },
    { value: "educationForm", displayValue: "Форма обучения" },
    { value: "educationType", displayValue: "Тип обучения" },
    { value: "changeDate", displayValue: "Дата" },
  ];
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  return (
    <>
      <FilterBar />
      <Table columns={columns} rows={students} />
    </>
  );
};

export default TablePage;
