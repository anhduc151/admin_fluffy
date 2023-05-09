import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feat/userSlice";
import notificationSlice from "./feat/notificationSlice";
import schoolsSlice from "./feat/schoolsSlice";


export const store = configureStore({
  reducer: {
    user: userSlice,
    error: notificationSlice,
    schools: schoolsSlice,
  },
});
