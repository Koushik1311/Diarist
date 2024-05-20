import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentMonth = getCurrentMonth();

type InitialState = {
  value: {
    month: string;
  };
};

const initialState: InitialState = {
  value: {
    month: currentMonth,
  },
};

export const month = createSlice({
  name: "month",
  initialState,
  reducers: {
    updateMonth: (state, action: PayloadAction<string>) => {
      state.value.month = action.payload;
    },
  },
});

export const { updateMonth } = month.actions;
export default month.reducer;
