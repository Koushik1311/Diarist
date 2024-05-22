import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import itemsReducer from "./features/items-slice";
import diariesReducer from "./features/diaries-slice";
import monthResucer from "./features/month-slice";
import yearReducer from "./features/year-slice";
import bookmarkColorReducer from "./features/bookmark-slice";
import diaryIdReducer, { diaryId } from "./features/diaryId-slice";

export const store = configureStore({
  reducer: {
    itemsReducer,
    diariesReducer,
    monthResucer,
    yearReducer,
    bookmarkColorReducer,
    diaryIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
