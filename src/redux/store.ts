import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import salesReducer from "./slices/salesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    sales: salesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
