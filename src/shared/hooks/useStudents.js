import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  selectAllstudents,
  getError,
  getLoading,
} from "../../features/students/studentsSlice";

export const useStudents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const students = useSelector(selectAllstudents);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  return [students, loading, error];
};
