import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  coupon: "",
};
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      console.log(action.payload)
      const value = action.payload.value;
      state[value] = action.payload.newValue;
    },
  },
});

export const { changeValue } = userDataSlice.actions;
export default userDataSlice.reducer;
