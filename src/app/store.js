import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import elementReducer from "../features/element/elementSlice";
import valueReducer from "../features/elementValue/elementValueSlice";
import warehouseReducer from "../features/warehouse/warehouseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    element: elementReducer,
    value: valueReducer,
    warehouse: warehouseReducer,
  },
});
