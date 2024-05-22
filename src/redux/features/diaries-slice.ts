import { DiaryTypes } from "@/types/diary-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: DiaryTypes[];
};

const initialState: InitialState = {
  value: [],
};

export const diaries = createSlice({
  name: "diaries",
  initialState,
  reducers: {
    updateDiaries: (state, action: PayloadAction<DiaryTypes[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateDiaries } = diaries.actions;
export default diaries.reducer;
