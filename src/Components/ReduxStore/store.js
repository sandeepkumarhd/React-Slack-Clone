import { configureStore } from "@reduxjs/toolkit";
import chainalReducer from "./chainal";

export const store = configureStore({
  reducer: {
    addChainal: chainalReducer,
  },
});
