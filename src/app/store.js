import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/students/studentsSlice";

export default configureStore({
  reducer: {
    students: studentsReducer,
  },
});
