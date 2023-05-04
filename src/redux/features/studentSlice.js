import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
  },
  reducers: {
    setStudent: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }
      state.student = action.payload;
    },
  },
});

export const { setStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
