import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: {
    type: null,
    message: null,
  },
};

export const notificationSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setError } = notificationSlice.actions;

export default notificationSlice.reducer;
