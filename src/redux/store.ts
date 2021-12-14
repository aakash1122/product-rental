import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rentalReducer from "./slices/rentalSlice";

export const store = configureStore({
  reducer: {
    rental: rentalReducer,
  },
});

//* type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
