import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
  },
  reducers: {
    setAccount: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }
      state.account = action.payload;
    },
  },
});

export const { setAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
