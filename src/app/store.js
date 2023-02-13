import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/auth-page/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
