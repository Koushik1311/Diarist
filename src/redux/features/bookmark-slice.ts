import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    bookmarkColor: string;
  };
};

const initialState: InitialState = {
  value: {
    bookmarkColor: "text-gray-600",
  },
};

export const bookmarkColor = createSlice({
  name: "bookmarkColor",
  initialState,
  reducers: {
    updateColor: (state, action: PayloadAction<string>) => {
      state.value.bookmarkColor = action.payload;
    },
  },
});

export const { updateColor } = bookmarkColor.actions;
export default bookmarkColor.reducer;
