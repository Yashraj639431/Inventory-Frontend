import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import elementColorReducer from "../features/elementColor/elementColorSlice";
import sizeReducer from "../features/size/sizeSlice";
import elementReducer from "../features/element/elementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    color: elementColorReducer,
    size: sizeReducer,
    element: elementReducer,
  },
});
