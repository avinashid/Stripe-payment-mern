import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./state/userData";

export const store = configureStore({
  reducer: { userDataSlice },
});
