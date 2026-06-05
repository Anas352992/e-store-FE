import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./slice";
export const store = configureStore({
  reducer: {
    AuthManager: Authreducer,
  },
});
