import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  is_locked: boolean;
};

const initialState = {
  is_locked: false,
} as InitialState;

export const titleSlice = createSlice({
  name: "lockedPage",
  initialState,
  reducers: {
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.is_locked = action.payload;
    },
  },
});

export const { setIsLocked } = titleSlice.actions;
export default titleSlice.reducer;
