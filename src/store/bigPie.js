import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import darkThemeReducer from "./darkTheme";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer
  },
});

export default store;
