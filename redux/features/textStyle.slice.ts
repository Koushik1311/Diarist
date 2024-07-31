import { getFromLocalStorage } from "@/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TextStyleState = {
  text_size: number;
  text_font: string;
};

const getInitialState = (): TextStyleState => {
  const textSize = getFromLocalStorage("text_size");
  const textFont = getFromLocalStorage("text_font");

  return {
    text_size: textSize !== null ? textSize : 20,
    text_font: textFont !== null ? textFont : "gloriaHallelujah",
  };
};

const initialState: TextStyleState = getInitialState();

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
