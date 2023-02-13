import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/students/studentsSlice";
import userSlice from "../features/auth-page/userSlice";

export default configureStore({
  reducer: {
    students: studentsReducer,
    user: userSlice,
  },
});
