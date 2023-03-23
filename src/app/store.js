import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import elementReducer from "../features/element/elementSlice";
import elementColorReducer from "../features/elementColor/elementColorSlice";
import sizeReducer from "../features/elementSize/elementSizeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    element: elementReducer,
    color: elementColorReducer,
    size: sizeReducer,
  },
});
