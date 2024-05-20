import { getCurrentYear } from "@/utils/getCurrentYear";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentYear = getCurrentYear();

type InitialState = {
  value: {
    year: number;
  };
};

const initialState: InitialState = {
  value: {
    year: currentYear,
  },
};

export const year = createSlice({
  name: "year",
  initialState,
  reducers: {
    updateYear: (state, action: PayloadAction<number>) => {
      state.value.year = action.payload;
    },
  },
});

export const { updateYear } = year.actions;
export default year.reducer;
