import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    diaryId: number | null;
  };
};

const initialState: InitialState = {
  value: {
    diaryId: null,
  },
};

export const diaryId = createSlice({
  name: "diaryId",
  initialState,
  reducers: {
    updateDiaryId: (state, action: PayloadAction<number>) => {
      state.value.diaryId = action.payload;
    },
  },
});

export const { updateDiaryId } = diaryId.actions;
export default diaryId.reducer;
