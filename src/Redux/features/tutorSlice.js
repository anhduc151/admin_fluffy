import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTutor: {
    educations: [],
    experiences: [],
    certifications: [],
  },
};

export const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    setCurrentTutor_educations: (state, action) => {
      state.currentTutor.educations = action.payload;
    },
    setCurrentTutor_experiences: (state, action) => {
      state.currentTutor.experiences = action.payload;
    },
    setCurrentTutor_certifications: (state, action) => {
      state.currentTutor.certifications = action.payload;
    },
  },
});

export const {
  setCurrentTutor_educations,
  setCurrentTutor_experiences,
  setCurrentTutor_certifications,
} = tutorSlice.actions;

export default tutorSlice.reducer;
