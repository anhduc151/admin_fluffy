import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import verifySlice from "./features/verifySlice";
import schoolsSlice from "./features/schoolsSlice";
import tutorSlice from "./features/tutorSlice";
import notificationSlice from "./features/notificationSlice";
import categoriesSlice from "./features/categoriesSlice";

export const store = configureStore({
  reducer: {
    verify: verifySlice,
    user: userSlice,
    schools: schoolsSlice,
    tutor: tutorSlice,
    error: notificationSlice,
    categories: categoriesSlice,
  },
});
