import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import darkThemeReducer from "./darkTheme";
import shoppingCartReducer from "./shoppingCart";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    cartSlice: shoppingCartReducer
  },
});

export default store;
