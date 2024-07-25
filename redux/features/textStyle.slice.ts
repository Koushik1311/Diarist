import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TextStyleState = {
  text_size: number;
  text_font: string;
};

const initialState: TextStyleState = {
  text_size: 16,
  text_font: "GeistSans",
};

export const textSlice = createSlice({
  name: "textStyle",
  initialState,
  reducers: {
    setTextStyle: (state, action: PayloadAction<Partial<TextStyleState>>) => {
      if (action.payload.text_size !== undefined) {
        state.text_size = action.payload.text_size;
      }
      if (action.payload.text_font !== undefined) {
        state.text_font = action.payload.text_font;
      }
    },
  },
});

export const { setTextStyle } = textSlice.actions;
export default textSlice.reducer;
